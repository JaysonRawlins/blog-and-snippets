---
title: "Site to Site VPN"
date: Thu, 20 Mar 2025 16:09:33 +0000
description: ""
tags: ["networking","aws","azure"]
canonical: "https://dev.to/jjrawlins/site-to-site-vpn-4fo4"
---

> Original post on dev.to: https://dev.to/jjrawlins/site-to-site-vpn-4fo4

### Introduction

Site-to-site VPN provides a secure tunnel between two networks. Unlike, say, VPN peering, where you have a connection between one AWS VPC and another AWS VPC, site-to-site VPN allows you to connect two networks that are not even in AWS. You could connect an on-premise network to the AWS network, or you could connect two different cloud providers together, like AWS and Azure.

Here is an example of a Site-to-Site VPN between AWS and Azure

[https://www.youtube.com/watch?v=G8hwCso8JSs&t=3s](https://www.youtube.com/watch?v=G8hwCso8JSs&t=3s)  
[![https://www.youtube.com/watch?v=G8hwCso8JSs&t=3s](https://d2qchn8kvos5rv.cloudfront.net/images/devto/cfc3f445ff30f8e2-iep47s6yqkp5aixhih14.png)](https://d2qchn8kvos5rv.cloudfront.net/images/devto/cfc3f445ff30f8e2-iep47s6yqkp5aixhih14.png)

Here is a YouTube video that shows how to set up a Site-to-Site VPN between AWS and Azure.

Play

_Site-to-Site VPN AWS to Azure_

Here is a step-by-step guide to setting up a Site-to-Site VPN between AWS and Azure.

[https://github.com/jjrawlins/youtube/blob/main/entra-id-site-2-site-vpn/instructions.md](https://github.com/jjrawlins/youtube/blob/main/entra-id-site-2-site-vpn/instructions.md)

### Conclusion

Site-to-Site VPN is a great way to connect two networks that are not on the same cloud provider. It is also a great way to connect on-premise networks to the cloud.

Stay tuned for more tutorials and examples of building durable, secure cloud infrastructure!