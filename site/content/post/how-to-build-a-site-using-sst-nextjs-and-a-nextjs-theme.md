---
title: "How to build a site using SST, NextJS and a NextJS theme"
date: Fri, 27 Oct 2023 17:38:02 +0000
description: ""
tags: ["nextjs","react","sst","tailwindcss"]
canonical: "https://dev.to/jjrawlins/how-to-build-a-site-using-sst-nextjs-and-a-nextjs-theme-48kp"
---

> Original post on dev.to: https://dev.to/jjrawlins/how-to-build-a-site-using-sst-nextjs-and-a-nextjs-theme-48kp

Introduction
------------

### What is SST?

SST is a framework for building serverless. With SST you can build modern full-stack applications on AWS.

1.  Deploy Next.js, Svelte, or Astro to AWS.
2.  Add any backend feature.
3.  Go from idea to IPO!

### What is NextJS?

Next.js is a React framework that enables several features such as server-side rendering and generating static websites.

### What is TailwindCSS?

A NextJS theme is a way to share functionality across multiple NextJS applications. Themes are a great way to share components, pages, and styles across multiple applications.

I got this theme from [https://themefisher.com/best-nextjs-templates](https://themefisher.com/best-nextjs-templates)

Getting Started
---------------

#### Step 1: Download the theme

Go to a theme site like [https://themefisher.com/best-nextjs-templates](https://themefisher.com/best-nextjs-templates)

#### Step 2: Unzip the theme

Place the zipped them into a folder.

In my case I downloaded it to ~/Dev/bookwork-light-nextjs

#### Step 3: Compile the theme and see how it works.

    cd ~/Dev/bookwork-light-nextjs
    yarn install
    

[![](https://d2qchn8kvos5rv.cloudfront.net/images/devto/05cf9fb4df6c5fb6-esjsmow6xncnvtjxelqt.gif)](https://d2qchn8kvos5rv.cloudfront.net/images/devto/05cf9fb4df6c5fb6-esjsmow6xncnvtjxelqt.gif)

#### Step 4: Create a new SST project

    npx create-sst@latest
    

[![](https://d2qchn8kvos5rv.cloudfront.net/images/devto/aba951369d868fbc-7apy982ntbcm3wlosm37.gif)](https://d2qchn8kvos5rv.cloudfront.net/images/devto/aba951369d868fbc-7apy982ntbcm3wlosm37.gif)

#### Step 5: Deploy the application

    npx sst deploy --stage prod