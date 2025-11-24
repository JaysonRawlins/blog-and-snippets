---
title: "How to Create a Custom Resource with AWS CDK"
date: Thu, 20 Mar 2025 01:54:22 +0000
description: "Introduction


The AWS Cloud Development Kit (CDK) allows you to define cloud infrastructure using familiar programming languages. While CDK provides a wide range of constructs, there are scenarios where you might need to create custom resources to extend its capabilities.
Custom Resources in AWS CDK enable you to write custom provisioning logic in AWS Lambda or other services. This allows you to perform operations that are not natively supported by CDK constructs.
To create a custom resource, follow these steps:
Initialize the CDK Project using Projen
Define the Lambda Function: This function will contain the custom logic using Projen
Create the Custom Resource: Use the CustomResource construct and link it to your Lambda function.
Use the Custom Resource in Your Stack: Integrate the custom resource into your CDK stack as needed.
Here’s a simple example of creating a custom resource in AWS CDK:
npx projen new awscdk-app-ts

Here’s a simple example of creating a custom resource in AWS CDK:
https://github.com/jjrawlins/cdk-examples/tree/main/projen-typescript/cdk-custom-resource
Inside the src directory, create a new directory called stacks. Then, create a new file called CustomResourceExampleStack.ts inside the src/ stacks directory.
import { CustomResource, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ExampleCustomResourceLambdaFunction } from '../lambdas/ExampleCustomResourceLambda-function';

interface CustomResourceExampleStackProps extends StackProps {

}

export class CustomResourceExampleStack extends Stack {
  constructor(scope: Construct, id: string, props: CustomResourceExampleStackProps) {
    super(scope, id, props);

    const customResourceLambda = new ExampleCustomResourceLambdaFunction(this, 'CustomResourceLambda', {
      description: 'Example of a custom resource lambda',
      memorySize: 128,
      timeout: Duration.seconds(30),
    });

    const stackName = Stack.of(this).stackName;
    new CustomResource(this, 'CustomResource', {
      serviceToken: provider.serviceToken,
      properties: {
        PhysicalResourceId: \\${stackName}-CustomResourceResource-version,
        MyCustomProperty: 'MyCustomValue',
      },
    });
  }
}

Create a new directory called lambdas inside the src/ directory. Inside the lambdas directory, create a new file called ExampleCustomResource.lambda.ts. This file will contain the logic for your custom resource.
You can always add more logic to this file as needed. Mostly serves as a starting point.
 import {
    CdkCustomResourceResponse,
    CloudFormationCustomResourceCreateEvent,
    CloudFormationCustomResourceDeleteEvent,
    CloudFormationCustomResourceEvent,
    CloudFormationCustomResourceUpdateEvent,
    Context,
} from 'aws-lambda';

    const region = process.env.AWS_REGION;

    export const handler = async (
    event: CloudFormationCustomResourceEvent,
    context: Context,
    ): Promise<CdkCustomResourceResponse> => {
    console.log('Lambda is invoked with:' + JSON.stringify(event));
    console.log('Context is invoked with:' + JSON.stringify(context));
    console.log('Lambda is invoked with:' + JSON.stringify(event));
    console.log('Region: ' + region);
    const physicalResourceId = event.ResourceProperties.PhysicalResourceId;

    let response: CdkCustomResourceResponse = {
    Status: 'SUCCESS',
    Reason: 'See the details in CloudWatch Log Stream: ' + context.logStreamName,
    PhysicalResourceId: physicalResourceId,
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
};

    switch (event.RequestType) {
    case 'Create':
    response = await onCreate(response, event, context);
    break;
    case 'Delete':
    response = await onDelete(response, event, context);
    break;
    case 'Update':
    response = await onUpdate(response, event, context);
    break;
    default:
    throw new Error('Unknown Request Type of CloudFormation');
}
    console.log('Return value:', JSON.stringify(response));
    return response;
};

    /**
    * Executes the create event for a CloudFormation custom resource.
    * @param {CdkCustomResourceResponse} response - The custom resource response object.
    * @param {CloudFormationCustomResourceCreateEvent} event - The create event object.
    * @param {Context} context - The AWS Lambda context object.
    * @return {Promise<CdkCustomResourceResponse>} - A promise that resolves to the custom resource response object.
    */
    export async function onCreate(
    response: CdkCustomResourceResponse,
    event: CloudFormationCustomResourceCreateEvent,
    context: Context): Promise<CdkCustomResourceResponse> {
    try {
    console.log('We are in the Create Event');
    console.log('Event is invoked with:' + JSON.stringify(event));
    console.log('Context is invoked with:' + JSON.stringify(context));
} catch (error) {
    if (error instanceof Error) {
    response.Reason = error.message;
}
    response.Status = 'FAILED';
    response.Data = { Result: error };
    return response;
}
    return response;
}

    /**
    * Handles delete event for a cloud formation custom resource.
    *
    * @param {CdkCustomResourceResponse} response - The custom resource response object.
    * @param {CloudFormationCustomResourceDeleteEvent} event - The delete event object.
    * @param {Context} context - The AWS lambda context object.
    * @returns {Promise<CdkCustomResourceResponse>} - The updated custom resource response object.
    */
    export async function onDelete(
    response: CdkCustomResourceResponse,
    event: CloudFormationCustomResourceDeleteEvent,
    context: Context): Promise<CdkCustomResourceResponse> {
    try {
    console.log('We are in the Delete Event');
    console.log('Context is invoked with:' + JSON.stringify(context));
    console.log('Event is invoked with:' + JSON.stringify(event));
    response.Status = 'SUCCESS';
} catch (error) {
    if (error instanceof Error) {
    response.Reason = error.message;
}
    response.Status = 'FAILED';
    response.Data = { Result: error };
    return response;
}
    return response;
}

    /**
    * Executes the onUpdate logic for a CloudFormation custom resource.
    *
    * @param {CdkCustomResourceResponse} response - The response object for the custom resource.
    * @param {CloudFormationCustomResourceUpdateEvent} event - The update event object from CloudFormation.
    * @param {Context} context - The execution context object.
    * @returns {Promise<CdkCustomResourceResponse>} A promise that resolves to the updated response object.
    */
    export async function onUpdate(
    response: CdkCustomResourceResponse,
    event: CloudFormationCustomResourceUpdateEvent,
    context: Context): Promise<CdkCustomResourceResponse> {
    try {
    console.log('Resource properties: ' + JSON.stringify(event.ResourceProperties));
    console.log('Event is invoked with:' + JSON.stringify(event));
    console.log('Context is invoked with:' + JSON.stringify(context));
} catch (error) {
    if (error instanceof Error) {
    response.Reason = error.message;
}
    response.Status = 'FAILED';
    response.Data = { Result: error };
    return response;
}
    return response;
}

One of the neat things about using projen to create your lambda function is that it will autogenerate the lambda function.
Play
ProjenLambdaGeneration
npx projen

main.ts
   import { App } from 'aws-cdk-lib';
    import { CustomResourceExampleStack } from './stacks/CustomResourceExampleStack';

    // for development, use account/region from cdk cli
    const devEnv = {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
};

    const app = new App();

    new CustomResourceExampleStack(app, 'cdk-custom-resource-dev', { env: devEnv });

    app.synth();

Deploy the custom resource using the following commands:
NOTE: You will have to be authenticated in an AWS Profile to work.
yarn cdk deploy cdk-custom-resource-dev

Play
Deploy CDK Custom Resource
CDK custom resources are a powerful way to extend the functionality of AWS CDK. They allow you to perform operations that are not directly supported by existing CDK constructs, giving you greater flexibility in defining your infrastructure.
Stay tuned for more tutorials and examples on AWS CDK and other cloud technologies!"
tags: ["cdk","ecs"]
canonical: "https://dev.to/jjrawlins/how-to-create-a-custom-resource-with-aws-cdk-4aj1"
---

### Introduction

The AWS Cloud Development Kit (CDK) allows you to define cloud infrastructure using familiar programming languages. While CDK provides a wide range of constructs, there are scenarios where you might need to create custom resources to extend its capabilities.

### What are Custom Resources?

Custom Resources in AWS CDK enable you to write custom provisioning logic in AWS Lambda or other services. This allows you to perform operations that are not natively supported by CDK constructs.

### Creating a Custom Resource

To create a custom resource, follow these steps:

1.  Initialize the CDK Project using Projen
2.  Define the Lambda Function: This function will contain the custom logic using Projen
3.  Create the Custom Resource: Use the CustomResource construct and link it to your Lambda function.
4.  Use the Custom Resource in Your Stack: Integrate the custom resource into your CDK stack as needed.

### Example

Here’s a simple example of creating a custom resource in AWS CDK:

##### Step 1: Initialize a new Projen Project

    npx projen new awscdk-app-ts
    

Here’s a simple example of creating a custom resource in AWS CDK:

[https://github.com/jjrawlins/cdk-examples/tree/main/projen-typescript/cdk-custom-resource](https://github.com/jjrawlins/cdk-examples/tree/main/projen-typescript/cdk-custom-resource)

Inside the src directory, create a new directory called stacks. Then, create a new file called CustomResourceExampleStack.ts inside the src/ stacks directory.

#### CustomResourceExampleStack.ts

    import { CustomResource, Duration, Stack, StackProps } from 'aws-cdk-lib';
    import { Construct } from 'constructs';
    import { ExampleCustomResourceLambdaFunction } from '../lambdas/ExampleCustomResourceLambda-function';
    
    interface CustomResourceExampleStackProps extends StackProps {
    
    }
    
    export class CustomResourceExampleStack extends Stack {
      constructor(scope: Construct, id: string, props: CustomResourceExampleStackProps) {
        super(scope, id, props);
    
        const customResourceLambda = new ExampleCustomResourceLambdaFunction(this, 'CustomResourceLambda', {
          description: 'Example of a custom resource lambda',
          memorySize: 128,
          timeout: Duration.seconds(30),
        });
    
        const stackName = Stack.of(this).stackName;
        new CustomResource(this, 'CustomResource', {
          serviceToken: provider.serviceToken,
          properties: {
            PhysicalResourceId: \${stackName}-CustomResourceResource-version,
            MyCustomProperty: 'MyCustomValue',
          },
        });
      }
    }
    

### Step 2: Define the Lambda Function

Create a new directory called lambdas inside the src/ directory. Inside the lambdas directory, create a new file called ExampleCustomResource.lambda.ts. This file will contain the logic for your custom resource.

You can always add more logic to this file as needed. Mostly serves as a starting point.

     import {
        CdkCustomResourceResponse,
        CloudFormationCustomResourceCreateEvent,
        CloudFormationCustomResourceDeleteEvent,
        CloudFormationCustomResourceEvent,
        CloudFormationCustomResourceUpdateEvent,
        Context,
    } from 'aws-lambda';
    
        const region = process.env.AWS_REGION;
    
        export const handler = async (
        event: CloudFormationCustomResourceEvent,
        context: Context,
        ): Promise<CdkCustomResourceResponse> => {
        console.log('Lambda is invoked with:' + JSON.stringify(event));
        console.log('Context is invoked with:' + JSON.stringify(context));
        console.log('Lambda is invoked with:' + JSON.stringify(event));
        console.log('Region: ' + region);
        const physicalResourceId = event.ResourceProperties.PhysicalResourceId;
    
        let response: CdkCustomResourceResponse = {
        Status: 'SUCCESS',
        Reason: 'See the details in CloudWatch Log Stream: ' + context.logStreamName,
        PhysicalResourceId: physicalResourceId,
        StackId: event.StackId,
        RequestId: event.RequestId,
        LogicalResourceId: event.LogicalResourceId,
    };
    
        switch (event.RequestType) {
        case 'Create':
        response = await onCreate(response, event, context);
        break;
        case 'Delete':
        response = await onDelete(response, event, context);
        break;
        case 'Update':
        response = await onUpdate(response, event, context);
        break;
        default:
        throw new Error('Unknown Request Type of CloudFormation');
    }
        console.log('Return value:', JSON.stringify(response));
        return response;
    };
    
        /**
        * Executes the create event for a CloudFormation custom resource.
        * @param {CdkCustomResourceResponse} response - The custom resource response object.
        * @param {CloudFormationCustomResourceCreateEvent} event - The create event object.
        * @param {Context} context - The AWS Lambda context object.
        * @return {Promise<CdkCustomResourceResponse>} - A promise that resolves to the custom resource response object.
        */
        export async function onCreate(
        response: CdkCustomResourceResponse,
        event: CloudFormationCustomResourceCreateEvent,
        context: Context): Promise<CdkCustomResourceResponse> {
        try {
        console.log('We are in the Create Event');
        console.log('Event is invoked with:' + JSON.stringify(event));
        console.log('Context is invoked with:' + JSON.stringify(context));
    } catch (error) {
        if (error instanceof Error) {
        response.Reason = error.message;
    }
        response.Status = 'FAILED';
        response.Data = { Result: error };
        return response;
    }
        return response;
    }
    
        /**
        * Handles delete event for a cloud formation custom resource.
        *
        * @param {CdkCustomResourceResponse} response - The custom resource response object.
        * @param {CloudFormationCustomResourceDeleteEvent} event - The delete event object.
        * @param {Context} context - The AWS lambda context object.
        * @returns {Promise<CdkCustomResourceResponse>} - The updated custom resource response object.
        */
        export async function onDelete(
        response: CdkCustomResourceResponse,
        event: CloudFormationCustomResourceDeleteEvent,
        context: Context): Promise<CdkCustomResourceResponse> {
        try {
        console.log('We are in the Delete Event');
        console.log('Context is invoked with:' + JSON.stringify(context));
        console.log('Event is invoked with:' + JSON.stringify(event));
        response.Status = 'SUCCESS';
    } catch (error) {
        if (error instanceof Error) {
        response.Reason = error.message;
    }
        response.Status = 'FAILED';
        response.Data = { Result: error };
        return response;
    }
        return response;
    }
    
        /**
        * Executes the onUpdate logic for a CloudFormation custom resource.
        *
        * @param {CdkCustomResourceResponse} response - The response object for the custom resource.
        * @param {CloudFormationCustomResourceUpdateEvent} event - The update event object from CloudFormation.
        * @param {Context} context - The execution context object.
        * @returns {Promise<CdkCustomResourceResponse>} A promise that resolves to the updated response object.
        */
        export async function onUpdate(
        response: CdkCustomResourceResponse,
        event: CloudFormationCustomResourceUpdateEvent,
        context: Context): Promise<CdkCustomResourceResponse> {
        try {
        console.log('Resource properties: ' + JSON.stringify(event.ResourceProperties));
        console.log('Event is invoked with:' + JSON.stringify(event));
        console.log('Context is invoked with:' + JSON.stringify(context));
    } catch (error) {
        if (error instanceof Error) {
        response.Reason = error.message;
    }
        response.Status = 'FAILED';
        response.Data = { Result: error };
        return response;
    }
        return response;
    }
    

### Step 3: Generate New Lambda Function

One of the neat things about using projen to create your lambda function is that it will autogenerate the lambda function.

Play

_ProjenLambdaGeneration_

    npx projen
    

main.ts

       import { App } from 'aws-cdk-lib';
        import { CustomResourceExampleStack } from './stacks/CustomResourceExampleStack';
    
        // for development, use account/region from cdk cli
        const devEnv = {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION,
    };
    
        const app = new App();
    
        new CustomResourceExampleStack(app, 'cdk-custom-resource-dev', { env: devEnv });
    
        app.synth();
    

### Step 4: Deploy Your Custom Resource

Deploy the custom resource using the following commands:

NOTE: You will have to be authenticated in an AWS Profile to work.

    yarn cdk deploy cdk-custom-resource-dev
    

Play

_Deploy CDK Custom Resource_

### Conclusion

CDK custom resources are a powerful way to extend the functionality of AWS CDK. They allow you to perform operations that are not directly supported by existing CDK constructs, giving you greater flexibility in defining your infrastructure.

Stay tuned for more tutorials and examples on AWS CDK and other cloud technologies!