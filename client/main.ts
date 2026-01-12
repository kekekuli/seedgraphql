import { GetIpAndUserAgentDocument, GetRandomDocument, GetMultipleDocument } from './src/generated-types/graphql'
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('http://localhost:4000/graphql')

const agentData = await client.request(GetIpAndUserAgentDocument);
console.log('ip', agentData.ip);
console.log('userAgent', agentData.userAgent)
console.log('timestamp', agentData.timestamp.iso)
console.log('timestamp type', agentData.timestamp.__typename)

const randomData = await client.request(GetRandomDocument);
console.log('random', randomData.random);

const randomInt = Number((Math.random() * 100).toFixed());

console.log('random int', randomInt);
const multipleData = await client.request(GetMultipleDocument, { a: randomInt });
console.log('multiply by 2', multipleData.multiplyBy2);


