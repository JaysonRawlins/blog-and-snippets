---
title: "Secure Your AWS Resources with Twingate VPN"
date: Wed, 26 Mar 2025 21:33:16 +0000
description: ""
tags: ["networking","twingate","vpn"]
canonical: "https://dev.to/jjrawlins/secure-your-aws-resources-with-twingate-vpn-4em6"
---

> Original post on dev.to: https://dev.to/jjrawlins/secure-your-aws-resources-with-twingate-vpn-4em6

Twingate Architecture:
----------------------

[![Twingate VPN Architecture in AWS](https://d2qchn8kvos5rv.cloudfront.net/images/devto/9aa8ea5a7c481d3f-pqcv1zrd2mcclxwp7hu1.png)](https://d2qchn8kvos5rv.cloudfront.net/images/devto/9aa8ea5a7c481d3f-pqcv1zrd2mcclxwp7hu1.png)

Benefits:
---------

1.) Unlike OpenVPN, which requires exposing your VPN EC2 asset to a public subnet, Twingate connectors do not require an inbound security group.

[![Security Group Setup](https://d2qchn8kvos5rv.cloudfront.net/images/devto/e287c2165161cc08-dxozi875lhc1jva9shuu.png)](https://d2qchn8kvos5rv.cloudfront.net/images/devto/e287c2165161cc08-dxozi875lhc1jva9shuu.png)

1.  Another benefit is that the network is controlled by groups, so you don’t need separate logins for each account. Log in once, and if you have the correct resource permissions set up, you can access everything you need.

Deployment:
-----------

There are several options for deploying a connector. The documentation is really good. You can deploy via Kubernetes, CloudFormation, or Terraform.

We rolled our own CDK stack that deploys the AMI, AWS Secret, and maintenance schedule with an SSM document to perform the updates. This allowed us to deploy it once and basically forget about it as it updates itself. Since we deploy it in two AZs, it rarely ever has an outage.

For more information, I highly recommend their documentation ->

[https://www.twingate.com/docs/](https://www.twingate.com/docs/)