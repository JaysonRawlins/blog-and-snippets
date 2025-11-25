---
title: "SlackBot Timeouts Getting You Down?"
date: Wed, 16 Apr 2025 11:53:20 +0000
description: ""
tags: ["slackapi","slackbots"]
canonical: "https://dev.to/jjrawlins/slackbot-timeouts-getting-you-down-2lic"
---

> Original post on dev.to: https://dev.to/jjrawlins/slackbot-timeouts-getting-you-down-2lic

Problem with SlackBots and Lambdas:
-----------------------------------

Slack APIs have a 3-second timeout, so if the Lambda doesn’t respond, you’ll receive a timeout message in the Slack channel before the response is ever issued.

Here are some reasons for these timeouts:

1.  Attempting to process too much information within the 3-second window.
2.  Cold Starts. Lambdas that haven’t been used in a way can suffer from taking an extra second or two to process the incoming message.
3.  Database retrieval. Pulling data and processing can sometimes eat up what remains from that 3-second window.

However, by using an API gateway, you now have plenty of time to process the data because Slack will get the response immediately.

Solution Architecture
---------------------

[![ ](https://d2qchn8kvos5rv.cloudfront.net/images/devto/16d4041e180a6baf-ri3naij4l17znzxhwyev.gif)](https://d2qchn8kvos5rv.cloudfront.net/images/devto/16d4041e180a6baf-ri3naij4l17znzxhwyev.gif)

By first going through the API Gateway, you can respond immediately to Slack while sending a copy to SQS, triggering the Lambda with the SQS message. This gives your lambda plenty of time to process data, look up information, make requests, or do whatever it needs to do to provide a response back to the originating channel or perhaps another Slack channel.

No timeouts, just a nice workflow that you could wire in any logic.