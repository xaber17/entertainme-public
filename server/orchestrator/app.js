const { ApolloServer, gql, makeExecutableSchema } = require("apollo-server");
const movieSchema = require('./schemas/movieSchema')
const tvSchema = require('./schemas/tvSchema')

const typeDefs = gql`
    type Query
    type Mutation
`;

const schema = makeExecutableSchema({
    typeDefs: [typeDefs, tvSchema.typeDefs, movieSchema.typeDefs],
    resolvers: [movieSchema.resolvers, tvSchema.resolvers]
});

const server = new ApolloServer({
    schema
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`)
});