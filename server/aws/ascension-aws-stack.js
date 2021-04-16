const cdk = require('@aws-cdk/core')
const route53 = require('@aws-cdk/aws-route53')

class AscensionAWSStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor (scope, id, props) {
    super(scope, id, props)

    console.log('Created Ascension AWS Stack')
    // The code that defines your stack goes here

    const stages = {
      prod: 'prod.play-ascension.com',
      qa: 'qa.play-ascension.com',
      dev: 'dev.play-ascension.com',
      www: 'www.play-ascension.com'
    }

    Object.entries(stages).map(([environmentKey, subdomainValue]) => {
      console.log(`Setting up ${environmentKey} : ${subdomainValue}`)
      const subZone = new route53.PublicHostedZone(this, `SubZone-${environmentKey}`, {
        zoneName: `${subdomainValue}`
      })
      return subZone
    })

    /*
    // Map hosted names to gateways
    const hostName = 'play-ascension.com'
    const parentZone = new route53.PublicHostedZone(this, 'HostedZone', {
      zoneName: hostName
    })

    new route53.ARecord(this, 'ARecord', {
      zone: parentZone,
      target: route53.RecordTarget.fromIpAddresses(elasticIp.ref)
    })
    */
  }
}

module.exports = { AscensionAWSStack }
