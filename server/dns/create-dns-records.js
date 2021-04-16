import * as route53 from '@aws-cdk/aws-route53'

const stages = {
  prod: 'prod.play-ascension.com',
  qa: 'qa.play-ascension.com',
  dev: 'dev.play-ascension.com',
  www: 'www.play-ascension.com',
}

Object.entries(stages).map(([environmentKey, subdomainValue]) => {
  console.log(`Setting up ${environmentKey} : ${subdomainValue}`)
  const subZone = new route53.PublicHostedZone(this, 'SubZone', {
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
