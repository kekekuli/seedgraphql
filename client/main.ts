import { GetIpAndUserAgentDocument, GetRandomDocument } from './src/generated-types/graphql'
import { GraphQLClient } from 'graphql-request'

const client = new GraphQLClient('http://localhost:4000/graphql')

const agentData = await client.request(GetIpAndUserAgentDocument);
console.log('ip', agentData.ip);
console.log('userAgent', agentData.userAgent)

const randomData = await client.request(GetRandomDocument);
console.log('random', randomData.random);
