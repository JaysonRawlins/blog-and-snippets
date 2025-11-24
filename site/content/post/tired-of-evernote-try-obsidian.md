---
title: "Tired of Evernote? Try Obsidian!"
date: Mon, 06 Nov 2023 02:56:13 +0000
description: "Introduction:


Back in my college days, Evernote was my go-to digital notebook for both academic and professional use. Its robust features and seamless browser integration significantly boosted my productivity. Despite its premium price tag, the value it delivered made it a justifiable expense. The convenience and efficiency it brought to my daily workflow were undeniable, turning the routine task of note-taking into a dynamic and integral part of my success.

The tactile tradition of pen and paper soon gave way to the digital convenience of Evernote’s Plugin. This modern method became a staple of my daily routine, faithfully serving me throughout the extended journey of earning my second Bachelor’s degree at the University of Central Florida. Over those years, my reliance on the Evernote Plugin transformed the way I captured information and organized my academic life.
After getting that shiny diploma from UCF, my wallet was like, ‘No more fancy stuff!’ So, I gave it a break and hopped onto the freebie train with OneNote!   ”
Using OneNote was fine for a while. I already had Office 365. However, in the world of note-taking, Obsidian’s integration of markdown makes it an optimal choice for those handling code. Markdown offers consistent and easy-to-add code assertions, streamlining the note-taking process. While OneNote might require external plugins like NoteHighlight2016 to achieve similar functionality, Evernote, though plugin-free, can sometimes present challenges with buggy code formatting. In contrast, Obsidian provides a seamless and reliable experience straight from the outset. Dive into the Obsidian platform and witness the precision and efficiency markdown can bring to your notes.
So, there are two complaints that I have with Obsidian.
Videos. It is not practical or easy to embed YouTube videos. 
Sometimes they work great but other times, its kinda annoying in that you end up with blank videos. Here is an example:
<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/mPaGi1Phc5A?si=M9x50CP3zk5oKi0O\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>

<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/giroZqjTJqE?si=pOjMZtf4S6rerAYW\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>


This what it should look like:
The reason, as I understand it, is that embedded YouTube videos sometimes have settings that make them not work locally. Obsidian uses a local file system rather than a hosted website like OneNote, Evernote, or Google Keep.
However, I recommend using the ‘thumbnails’ community plugin.

This isn’t quite as nice as embedding, but it works well. So, for the above two videos, I can use the following markdown:


vid
https://www.youtube.com/watch?v=mPaGi1Phc5A
https://www.youtube.com/watch?v=giroZqjTJqE


File-explorer. 
By default, only markdown files are displayed. To add files like animated GIFs or, in my case, I wanted to link to PDFs stored within my notes. However, you can turn this feature on:

If you are OK with keeping your notes on your cloud, it can be pretty much limitless. If you need your notes on the go, remember you will pay an extra premium. At the time of writing, it was $8.00 US/month billed yearly and $10.00 US/month billed monthly. It’s slightly less expensive than Evernote but definitely a premium compared to OneNote or Google Keep, which are both free.

While Obsidian may come with its share of quirks, its speed and practicality cannot be overstated when it comes to organizing notes. Opting for the cloud sync service proved to be a wise decision, especially during my vacation. The ability to access my notes on my phone, effortlessly embed PDFs, and manage my itinerary was nothing short of remarkable. Even in moments when internet connectivity was a distant dream, Obsidian stood out as an indispensable travel companion, keeping my plans well-ordered and within reach. It’s clear that despite any minor inconveniences, Obsidian offers a seamless, user-friendly experience for anyone looking to keep their thoughts and plans neatly aligned.
The post Tired of Evernote? Try Obsidian! appeared first on Jayson Rawlins."
tags: ["uncategorized","obsidian","productivity"]
canonical: "https://dev.to/jjrawlins/tired-of-evernote-try-obsidian-ghj"
---

### Introduction:

Back in my college days, Evernote was my go-to digital notebook for both academic and professional use. Its robust features and seamless browser integration significantly boosted my productivity. Despite its premium price tag, the value it delivered made it a justifiable expense. The convenience and efficiency it brought to my daily workflow were undeniable, turning the routine task of note-taking into a dynamic and integral part of my success.

[![](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fjaysonrawlins.com%2Fwp-content%2Fuploads%2F2023%2F11%2Fe268bf96-e48e-4aba-8e7b-af44c5b3e200.webp)](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fjaysonrawlins.com%2Fwp-content%2Fuploads%2F2023%2F11%2Fe268bf96-e48e-4aba-8e7b-af44c5b3e200.webp)

The tactile tradition of pen and paper soon gave way to the digital convenience of Evernote’s Plugin. This modern method became a staple of my daily routine, faithfully serving me throughout the extended journey of earning my second Bachelor’s degree at the University of Central Florida. Over those years, my reliance on the Evernote Plugin transformed the way I captured information and organized my academic life.

### Cutting Costs

After getting that shiny diploma from UCF, my wallet was like, ‘No more fancy stuff!’ So, I gave it a break and hopped onto the freebie train with OneNote! [![🎓](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fszrhl617fwlhfwlrikzj.png)](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fszrhl617fwlhfwlrikzj.png) [![🚂](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ftnub89eu2ktvfz3aotut.png)](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ftnub89eu2ktvfz3aotut.png) [![💡](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F39tqfvmiek8m3xjmsge5.png)](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F39tqfvmiek8m3xjmsge5.png)”

Using OneNote was fine for a while. I already had Office 365. However, in the world of note-taking, Obsidian’s integration of markdown makes it an optimal choice for those handling code. Markdown offers consistent and easy-to-add code assertions, streamlining the note-taking process. While OneNote might require external plugins like [NoteHighlight2016](https://github.com/elvirbrk/NoteHighlight2016) to achieve similar functionality, Evernote, though plugin-free, can sometimes present challenges with buggy code formatting. In contrast, Obsidian provides a seamless and reliable experience straight from the outset. Dive into the [Obsidian platform](https://obsidian.md) and witness the precision and efficiency markdown can bring to your notes.

### Getting Started

So, there are two complaints that I have with Obsidian.

*   **Videos**. It is not practical or easy to embed YouTube videos.

Sometimes they work great but other times, its kinda annoying in that you end up with blank videos. Here is an example:

    <iframe width="560" height="315" src="https://www.youtube.com/embed/mPaGi1Phc5A?si=M9x50CP3zk5oKi0O" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    

    <iframe width="560" height="315" src="https://www.youtube.com/embed/giroZqjTJqE?si=pOjMZtf4S6rerAYW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
    

[![](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fjaysonrawlins.com%2Fwp-content%2Fuploads%2F2023%2F11%2Fimage-1.png)](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fjaysonrawlins.com%2Fwp-content%2Fuploads%2F2023%2F11%2Fimage-1.png)

This what it should look like:

The reason, as I understand it, is that embedded YouTube videos sometimes have settings that make them not work locally. Obsidian uses a local file system rather than a hosted website like OneNote, Evernote, or Google Keep.

However, I recommend using the **‘thumbnails’** community plugin.

[![](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fjaysonrawlins.com%2Fwp-content%2Fuploads%2F2023%2F11%2Fimage-3.png)](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fjaysonrawlins.com%2Fwp-content%2Fuploads%2F2023%2F11%2Fimage-3.png)

This isn’t quite as nice as embedding, but it works well. So, for the above two videos, I can use the following markdown:

  
vid  
[https://www.youtube.com/watch?v=mPaGi1Phc5A](https://www.youtube.com/watch?v=mPaGi1Phc5A)  
vid  
[https://www.youtube.com/watch?v=giroZqjTJqE](https://www.youtube.com/watch?v=giroZqjTJqE)  

[![](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fjaysonrawlins.com%2Fwp-content%2Fuploads%2F2023%2F11%2Fimage-4.png)](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fjaysonrawlins.com%2Fwp-content%2Fuploads%2F2023%2F11%2Fimage-4.png)

*   **File-explorer**.

By default, only markdown files are displayed. To add files like animated GIFs or, in my case, I wanted to link to PDFs stored within my notes. However, you can turn this feature on:

[![](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fjaysonrawlins.com%2Fwp-content%2Fuploads%2F2023%2F11%2Fimage-2-1024x841.png)](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fjaysonrawlins.com%2Fwp-content%2Fuploads%2F2023%2F11%2Fimage-2-1024x841.png)

### Storage Options:

If you are OK with keeping your notes on your cloud, it can be pretty much limitless. If you need your notes on the go, remember you will pay an extra premium. At the time of writing, it was $8.00 US/month billed yearly and $10.00 US/month billed monthly. It’s slightly less expensive than Evernote but definitely a premium compared to OneNote or Google Keep, which are both free.

[![](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fjaysonrawlins.com%2Fwp-content%2Fuploads%2F2023%2F11%2Fimage-6.png)](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fjaysonrawlins.com%2Fwp-content%2Fuploads%2F2023%2F11%2Fimage-6.png)

### Conclusion:

While Obsidian may come with its share of quirks, its speed and practicality cannot be overstated when it comes to organizing notes. Opting for the cloud sync service proved to be a wise decision, especially during my vacation. The ability to access my notes on my phone, effortlessly embed PDFs, and manage my itinerary was nothing short of remarkable. Even in moments when internet connectivity was a distant dream, Obsidian stood out as an indispensable travel companion, keeping my plans well-ordered and within reach. It’s clear that despite any minor inconveniences, Obsidian offers a seamless, user-friendly experience for anyone looking to keep their thoughts and plans neatly aligned.

The post [Tired of Evernote? Try Obsidian!](https://jaysonrawlins.com/tired-of-evernote-try-obsidian/) appeared first on [Jayson Rawlins](https://jaysonrawlins.com).