const { GraphQLServer } = require('graphql-yoga')

// this is the response we send
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  },{
    id: 'link-1',
    url: 'www.howtographql1.com',
    description: 'Fullstack tutorial2 for GraphQL'
  }]

let idCount = links.length


// 2 - the resolver is something our apy returns when queried
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (root, args) => links.find(link => link.id === args.id)
  },
  Mutation: {
    post: (root, args) => {
       const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      return link
    },
    updateLink: (root, args) => {
      const updateIndex = links.findIndex(link => link.id === args.id);
      links[updateIndex] = Object.assign({}, args)
      return links[updateIndex]
    },
    deleteLink: (root, args) => {
      const updateIndex = links.findIndex(link => link.id === args.id);
      const deletedLink = links[updateIndex]
      links.splice(updateIndex, 1)
      return deletedLink
    }
  }
}

// 3
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))