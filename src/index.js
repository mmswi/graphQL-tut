const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')

// 2 - the resolver is something our apy returns when queried
const resolvers = {
  Query,
  Mutation,
  AuthPayload
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  // adding prisma bindings to the server
  context: req => ({
    req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/public-charmsword-651/hackernews-node/dev',
      secret: 'mysecret123',
      debug: true,
    })
  }),
})
server.start(() => console.log(`Server is running on http://localhost:4000`))