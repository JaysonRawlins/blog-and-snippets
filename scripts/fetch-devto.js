const Parser = require("rss-parser");
const fs = require("fs");
const https = require("https");
const path = require("path");
const TurndownService = require("turndown");
const crypto = require("crypto");
require("dotenv").config();
const {S3Client, PutObjectCommand, HeadObjectCommand} = require("@aws-sdk/client-s3");

const parser = new Parser();
const turndown = new TurndownService();

// Create AWS SDK v3 S3 client (credentials automatically resolved from environment if present)
const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-2",
});
const BUCKET = process.env.BUCKET;
const CLOUDFRONT = (process.env.CLOUDFRONT || "").replace(/\/$/, "");

function isDevToImageUrl(url) {
  try {
    const u = new URL(url);
    if (/^media\d*\.dev\.to$/.test(u.hostname) && u.pathname.startsWith("/dynamic/image/")) return true;
    if (u.hostname === "dev-to-uploads.s3.amazonaws.com") return true;
    if (u.hostname === "res.cloudinary.com" && u.pathname.includes("/practicaldev/")) return true;
  } catch (e) {
    return false;
  }
  return false;
}

// Try to resolve the canonical source image from a dev.to dynamic URL
function resolveOriginalDevToUrl(url) {
  try {
    const u = new URL(url);
    if (/^media\d*\.dev\.to$/.test(u.hostname)) {
      // The original encoded URL is after the last '/'
      const parts = u.pathname.split("/");
      const last = parts[parts.length - 1];
      try {
        const decoded = decodeURIComponent(last);
        if (/^https?:\/\//.test(decoded)) return decoded;
      } catch (_) {}
    }
  } catch (e) {}
  return url;
}

function getFilenameFromUrl(url) {
  try {
    const u = new URL(url);
    const base = path.basename(u.pathname) || "image";
    return base.split("?")[0];
  } catch {
    return "image";
  }
}

function guessContentType(filename, fallback = "application/octet-stream") {
  const ext = path.extname(filename).toLowerCase();
  switch (ext) {
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".png":
      return "image/png";
    case ".gif":
      return "image/gif";
    case ".webp":
      return "image/webp";
    case ".svg":
      return "image/svg+xml";
    case ".avif":
      return "image/avif";
    default:
      return fallback;
  }
}

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    try {
      https
        .get(url, (res) => {
          if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
            // redirect
            return resolve(downloadImage(res.headers.location));
          }
          if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
            return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
          }
          const chunks = [];
          res.on("data", (d) => chunks.push(d));
          res.on("end", () => {
            const buffer = Buffer.concat(chunks);
            const contentType = res.headers["content-type"] || undefined;
            resolve({buffer, contentType});
          });
        })
        .on("error", reject);
    } catch (e) {
      reject(e);
    }
  });
}

async function uploadToS3({buffer, key, contentType}) {
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );
  return `${CLOUDFRONT}/${key}`;
}

async function s3ObjectExists(key) {
  try {
    await s3.send(
      new HeadObjectCommand({
        Bucket: BUCKET,
        Key: key,
      })
    );
    return true;
  } catch (err) {
    // When the object is not found or access is forbidden, treat as non-existent
    const status = err && (err.$metadata && err.$metadata.httpStatusCode);
    if (err && (err.name === "NotFound" || status === 404)) return false;
    if (err && (err.name === "Forbidden" || status === 403)) return false;
    return false;
  }
}

function stableKeyForUrl(sourceUrl, filename) {
  // Deterministic key so re-runs don't create duplicates
  const hash = crypto.createHash("sha1").update(sourceUrl).digest("hex").slice(0, 16);
  const safeName = filename || "image";
  return `images/devto/${hash}-${safeName}`;
}

function findAllImageUrls(markdown) {
  const urls = new Set();
  // Markdown image syntax
  const mdImgRe = /!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  let m;
  while ((m = mdImgRe.exec(markdown)) !== null) {
    const u = m[1];
    if (u) urls.add(u);
  }
  // HTML <img>
  const htmlImgRe = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
  while ((m = htmlImgRe.exec(markdown)) !== null) {
    const u = m[1];
    if (u) urls.add(u);
  }
  return Array.from(urls);
}

function replaceAllOccurrences(content, from, to) {
  return content.split(from).join(to);
}

function fetchArticleFromApi(link) {
  return new Promise((resolve) => {
    try {
      const url = new URL(link);
      const parts = url.pathname.split("/").filter(Boolean); // [username, slug]
      if (url.hostname !== "dev.to" || parts.length < 2) return resolve(null);
      const apiUrl = `https://dev.to/api/articles/${parts[0]}/${parts.slice(1).join("/")}`;

      https
        .get(apiUrl, (res) => {
          let data = "";
          res.on("data", (chunk) => (data += chunk));
          res.on("end", () => {
            if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
              try {
                const json = JSON.parse(data);
                resolve(json);
              } catch (e) {
                resolve(null);
              }
            } else {
              resolve(null);
            }
          });
        })
        .on("error", () => resolve(null));
    } catch (e) {
      resolve(null);
    }
  });
}

async function fetchDevToPosts() {
  const feed = await parser.parseURL("https://dev.to/feed/jjrawlins");

  for (const item of feed.items) {
    const escapeYaml = (str) => str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

    // Prefer exact markdown from dev.to API when available for best fidelity
    const apiArticle = await fetchArticleFromApi(item.link);

    const frontmatter = `---
title: "${escapeYaml(item.title)}"
date: ${item.pubDate}
description: ""
tags: ${JSON.stringify(item.categories || [])}
canonical: "${item.link}"
---

`;

    const markdownFromApi = apiArticle && apiArticle.body_markdown ? apiArticle.body_markdown : null;
    const markdownFromRss = turndown.turndown(item["content:encoded"] || item.content || "");
    let markdown = markdownFromApi || markdownFromRss;

    // Process and replace dev.to hosted images with our own CloudFront links
    if (BUCKET && CLOUDFRONT) {
      const urls = findAllImageUrls(markdown).filter(isDevToImageUrl);
      for (const originalUrl of urls) {
        try {
          const sourceUrl = resolveOriginalDevToUrl(originalUrl);
          const filename = getFilenameFromUrl(sourceUrl);
          const key = stableKeyForUrl(sourceUrl, filename);
          // If the file already exists in S3, skip downloading/uploading
          const exists = await s3ObjectExists(key);
          let newUrl;
          if (exists) {
            newUrl = `${CLOUDFRONT}/${key}`;
          } else {
            const {buffer, contentType} = await downloadImage(sourceUrl);
            const ct = contentType || guessContentType(filename);
            newUrl = await uploadToS3({buffer, key, contentType: ct});
          }
          markdown = replaceAllOccurrences(markdown, originalUrl, newUrl);
        } catch (e) {
          // If any image fails, skip replacement for that image
          // console.warn(`Image processing failed for ${originalUrl}:`, e.message);
        }
      }
    }

    // Add a visible canonical link in the body
    const canonicalNote = `> Original post on dev.to: ${item.link}\n\n`;

    const content = frontmatter + canonicalNote + markdown;

    // Create filename from title
    const filename = item.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    fs.writeFileSync(
      `site/content/post/${filename}.md`,
      content
    );
  }
}

fetchDevToPosts();
