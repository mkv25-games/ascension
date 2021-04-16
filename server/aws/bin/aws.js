#!/usr/bin/env node

const cdk = require('@aws-cdk/core')
const { AscensionAWSStack } = require('../ascension-aws-stack')

const app = new cdk.App()
const stack = new AscensionAWSStack(app, 'AwsStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
})

console.log('Defined AWS Stack', stack)
