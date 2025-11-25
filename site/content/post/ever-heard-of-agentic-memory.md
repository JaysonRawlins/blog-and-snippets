---
title: "Ever Heard of Agentic Memory?"
date: Mon, 23 Jun 2025 12:05:49 +0000
description: ""
tags: ["ai"]
canonical: "https://dev.to/jjrawlins/ever-heard-of-agentic-memory-2jnl"
---

> Original post on dev.to: https://dev.to/jjrawlins/ever-heard-of-agentic-memory-2jnl

Agentic memory is an interesting concept designed to address a specific challenge: the cumbersome ways we currently save preferences, whether through cursor files, Windsurf files, Claude.MD, or other IDEs and AI agents.

[![](https://d2qchn8kvos5rv.cloudfront.net/images/devto/40329a3578839668-qqyhzvjr8t7akw0yqf15.png)](https://d2qchn8kvos5rv.cloudfront.net/images/devto/40329a3578839668-qqyhzvjr8t7akw0yqf15.png)

Over time, this becomes unwieldy, as you constantly track preferences and re-teach your agent problems it has already solved in different contexts.

While a flat file could repeatedly instruct the agent on how to solve problems, you would then need to meticulously track the location of these solutions, much like managing a scattered collection of notes across various Git repositories.

How about keeping these preferences in a database?

Thus, agentic memory is the idea of remembering your preferences in a graph database.

[![](https://d2qchn8kvos5rv.cloudfront.net/images/devto/1f2ac05dc42960f9-ks5qpn2cta2cf3mn0no6.gif)](https://d2qchn8kvos5rv.cloudfront.net/images/devto/1f2ac05dc42960f9-ks5qpn2cta2cf3mn0no6.gif)

With each request, your agent will call an MCP server (model context protocol) and look up your preferences already saved in your database. If they don’t exist, then you can have the agent save it from the current projects results.

This greatly speeds up the life cycle when you are vibe coding or asking for help with projects but now you don’t have to keep reminding the agent of your preferences.

My guess is that over time, use of agentic memory will be standard practice. Just google ‘agentic memory’ and you will find copious amounts of resources and products.

Here are some examples that I shamelessly took from [https://www.graphlit.com/blog/survey-of-ai-agent-memory-frameworks](https://www.graphlit.com/blog/survey-of-ai-agent-memory-frameworks)

Letta: [https://docs.letta.com/](https://docs.letta.com/)  
  
Mem0: [https://docs.mem0.ai/](https://docs.mem0.ai/)  
  
CrewAI: [https://docs.crewai.com/concepts/memory](https://docs.crewai.com/concepts/memory)  
  
Zep: [https://help.getzep.com/](https://help.getzep.com/)  
  
Memary: [https://kingjulio8238.github.io/memarydocs/concepts/](https://kingjulio8238.github.io/memarydocs/concepts/)  
  
Cognee: [https://www.cognee.ai/blog/fundamentals/llm-memory-cognitive-architectures-with-ai](https://www.cognee.ai/blog/fundamentals/llm-memory-cognitive-architectures-with-ai)