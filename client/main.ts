import { GetIpAndUserAgentDocument } from './src/gql/graphql';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from 'graphql'

async function execute<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
): Promise<TResult> {
  console.log('🚀 请求查询', print(document));
  console.log('🚀 请求变量', variables);
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: print(document),
      variables,
    }),
  });

  const { data, errors } = await response.json();
  if (errors) throw new Error(errors[0].message);
  return data;
}

async function startApp() {
  console.log('🚀 正在请求 GraphQL 数据...');

  try {
    const data = await execute(GetIpAndUserAgentDocument);

    console.log('✅ 获取ip成功:', data.ip);
    console.log('✅ 获取userAgent成功:', data.userAgent);

  } catch (err) {
    console.error('❌ 请求挂了，是不是后端没开 CORS？', err);
  }
}

startApp();
