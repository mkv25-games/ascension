const { expect, matchTemplate, MatchStyle } = require('@aws-cdk/assert')
const cdk = require('@aws-cdk/core')
const { AscensionAWSStack } = require('../ascension-aws-stack')

test('DNS Routes Stack', () => {
  const app = new cdk.App()
  // WHEN
  const stack = new AscensionAWSStack(app, 'MyTestStack')
  // THEN
  expect(stack).to(matchTemplate({
    Resources: {
      SubZoneprodFCD025CC: {
        Type: 'AWS::Route53::HostedZone',
        Properties: {
          Name: 'prod.play-ascension.com.'
        }
      },
      SubZoneqaEB243E2F: {
        Type: 'AWS::Route53::HostedZone',
        Properties: {
          Name: 'qa.play-ascension.com.'
        }
      },
      SubZonedev356302B6: {
        Type: 'AWS::Route53::HostedZone',
        Properties: {
          Name: 'dev.play-ascension.com.'
        }
      },
      SubZonewww470B44B9: {
        Type: 'AWS::Route53::HostedZone',
        Properties: {
          Name: 'www.play-ascension.com.'
        }
      }
    }
  }, MatchStyle.EXACT))
})
