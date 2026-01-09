import { RandomModule } from '@seedgraphql/sdl/modules/random'

export const resolvers: RandomModule.Resolvers = {
  Query: {
    random: () => Math.random().toString()
  }
}
