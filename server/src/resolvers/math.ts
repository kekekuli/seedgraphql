import { MathModule } from '@seedgraphql/sdl/modules/math'

export const resolvers: MathModule.Resolvers = {
  Query: {
    multiplyBy2: (parent, args) => args.a * 2
  }
}
