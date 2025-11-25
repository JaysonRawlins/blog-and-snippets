---
title: "ECS Copilot with SQS Autoscaling"
date: Fri, 27 Oct 2023 18:46:21 +0000
description: ""
tags: ["uncategorized","aws","ecscopilot","typescript"]
canonical: "https://dev.to/jjrawlins/ecs-copilot-with-sqs-autoscaling-56l0"
---

> Original post on dev.to: https://dev.to/jjrawlins/ecs-copilot-with-sqs-autoscaling-56l0

### Prerequisites:

*   **ECS Copilot:** ECS Copilot that has been overridden to expose CDK. See [svc override — AWS Copilot CLI](https://aws.github.io/copilot-cli/docs/commands/svc-override/). Probably could use the same principles with regular CDK as well but this particular example assumes we are using ECS Copilot.
*   **Typescript**
*   **CDK v2**
*   **NPM**
*   **CDK IAM Floyd (Library for helping manage AWS IAM)**

    npm install cdk-iam-floyd
    

*   **tranformService():** This is the function that starts of with

    const service = this.template.getResource("Service") as ecs.CfnService;
    

### Notes:

As mentioned before, this could be used for any CDK project. However, for this demonstration ECS Copilot is assumed which will include some commands that simply would not be necessary.

### Lets get started:

    transformService() {
      let minCapacity = 2;
      let maxCapacity = 48;
      let queueName = "your_queue_name"
    
      ## With regular CDK, you will have the Service Object directly.
      const service = this.template.getResource("Service") as ecs.CfnService;
      const clusterName = service.cluster;
      const serviceName = service.attrName;
    
      const scalingRole = new iam.Role(this, 'ServiceScalingRole', {
          assumedBy: new iam.ServicePrincipal('ecs.application-autoscaling.amazonaws.com'),
          inlinePolicies: {
              'ScalingRoleInlinePolicy': new PolicyDocument({
                  statements: [
                      new floyd.ApplicationAutoscaling().allow().onAllResources().allActions(),
                      new floyd.Ecs().allow().onAllResources()
                          .toDescribeServices()
                          .toUpdateService(),
                      new floyd.Cloudwatch().allow().onAllResources()
                          .toDescribeAlarms()
                          .toPutMetricAlarm()
                          .toDeleteAlarms()
                          .toDescribeAlarmHistory()
                          .toDescribeAlarmsForMetric()
                          .toGetMetricStatistics()
                          .toListMetrics()
                          .toDisableAlarmActions()
                          .toEnableAlarmActions(),
                      new floyd.Iam().allow().onAllResources()
                          .toCreateServiceLinkedRole(),
                      new floyd.Sns().allow().onAllResources()
                          .toCreateTopic()
                          .toSubscribe(),
                      new floyd.Sns({
                          actions: [
                              "sns:Get*",
                              "sns:List*"
                          ]
                      }).allow().onAllResources()
                  ]
              })
          }
      });
    
      // First, get the ScalableTarget associated with the service
      const resourceId = `service/${clusterName}/${serviceName}`;
    
      const scalableTarget = new appscaling.CfnScalableTarget(this, 'ServiceScalableTarget', {
          maxCapacity: maxCapacity,
          minCapacity: minCapacity,
          resourceId: resourceId,
          roleArn: scalingRole.roleArn,
          scalableDimension: 'ecs:service:DesiredCount',
          serviceNamespace: 'ecs',
      });
    
     // This and the previous are only necessary because of ECS Copilot.
     // Could just declare the ScalableTarget directly with CDK.
     const cdkScalableTarget = appscaling.ScalableTarget.fromScalableTargetId(
          this,
          'CdkServiceScalableTarget',
          scalableTarget.ref,
      )
    
     const metric = new cloudwatch.Metric({
        namespace: 'AWS/SQS',
        metricName: 'ApproximateNumberOfMessagesVisible',
        dimensionsMap: {
            QueueName: queueName,
        },
        statistic: 'Average',
    });
    
    }