// node fakeBackend.js
const { ApolloServer, gql } = require('apollo-server')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { addMocksToSchema } = require('@graphql-tools/mock')

const typeDefs = gql`
  type Query {
    fakeAddress: String
  }
`

const schema = makeExecutableSchema({ typeDefs })

const mocks = {
  String: () => 'https://api.domen.ru?adr=g0834thw9dfh3498hf4k'
}

const schemaWithMocks = addMocksToSchema({
  schema,
  mocks
})

const server = new ApolloServer({ schema: schemaWithMocks })

const PORT = 9696

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀 Mock server ready at ${url}`)
})
