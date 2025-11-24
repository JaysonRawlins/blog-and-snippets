const Parser = require("rss-parser");
const fs = require("fs");
const TurndownService = require("turndown");

const parser = new Parser();
const turndown = new TurndownService();

async function fetchDevToPosts() {
  const feed = await parser.parseURL("https://dev.to/feed/jjrawlins");

  feed.items.forEach((item) => {
    const escapeYaml = (str) => str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');

    const frontmatter = `---
title: "${escapeYaml(item.title)}"
date: ${item.pubDate}
description: "${escapeYaml(item.contentSnippet)}"
tags: ${JSON.stringify(item.categories || [])}
canonical: "${item.link}"
---

`;

    const markdown = turndown.turndown(item["content:encoded"] || item.content);
    const content = frontmatter + markdown;

    // Create filename from title
    const filename = item.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    fs.writeFileSync(
      `site/content/post/${filename}.md`,
      content
    );
  });
}

fetchDevToPosts();
