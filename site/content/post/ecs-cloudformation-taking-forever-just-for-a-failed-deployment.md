---
title: "ECS CloudFormation Taking Forever - Just for a Failed Deployment"
date: Thu, 13 Mar 2025 20:57:34 +0000
description: ""
tags: []
canonical: "https://dev.to/aws-builders/ecs-cloudformation-taking-forever-just-for-a-failed-deployment-41k7"
---

> Original post on dev.to: https://dev.to/aws-builders/ecs-cloudformation-taking-forever-just-for-a-failed-deployment-41k7

Introduction  
Sometimes times when you are deploying an AWS ECS service using CDK or a CloudFormation stack, you end up in a strange situation where the deployment seems to go on forever. The tasks aren't deployed, the tasks are failing health checks, and ECS just keeps starting new tasks.

Sometimes, you can see even the old tasks aren't passing health checks. That's a guarantee that your poor service is going to take forever to fail, according to CloudFormation.

You're waiting and waiting and waiting. You already know how to fix it and are ready to move on; however, CloudFormation just keeps trying in vain. This can be a really frustrating experience.

[![Person staring at their computer screen](https://d2qchn8kvos5rv.cloudfront.net/images/devto/f5f5a314b388e243-6e5356u76kgd3wr8abo3.png)](https://d2qchn8kvos5rv.cloudfront.net/images/devto/f5f5a314b388e243-6e5356u76kgd3wr8abo3.png)

How to Trick CloudFormation Into 'Thinking' It Succeeded  
So, a basic way to trick CloudFormation into thinking that everything has been deployed successfully is to simply redeploy the service in the AWS Console.

Yeap, that's right. You can redeploy the service in the AWS Console, but this time, you are going to set the following parameters:

DesiredCount: 0  
MinCount: 0  
MaxCount: 0

REMEMBER: You are not changing anything else in the service; you are just changing the desired, min, and max count to 0. Also, you don't need to check the box to force a redeployment.

[![ECS AWS console settings](https://d2qchn8kvos5rv.cloudfront.net/images/devto/2755df7cda4efaf6-2uyzx019l6yuoqtzjg60.png)](https://d2qchn8kvos5rv.cloudfront.net/images/devto/2755df7cda4efaf6-2uyzx019l6yuoqtzjg60.png)

After all the tasks have been stopped, cloudformation will think that everything has been deployed successfully.

This will allow you to continue debugging your service without waiting hours for cloudformation to timeout or for the number of retries to finally have been exhausted.

This trick has saved me a lot of time and frustration over the years.