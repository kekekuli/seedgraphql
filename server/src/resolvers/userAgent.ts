import { UserAgentModule } from '@seedgraphql/sdl/modules/userAgent'

export const resolvers: UserAgentModule.Resolvers = {
  Query: {
    ip: (_parent, _args, { req }) => {
      return req.header('x-forwarded-for')?.split(',')[0] || req.remoteAddr || 'unknown';
    },
    userAgent: (_parent, _args, { req }) => {
      return req.header('user-agent') || 'unknown';
    },
    timestamp: () => {
      return {
        iso: new Date().toISOString(),
      }
    }
  }
}
