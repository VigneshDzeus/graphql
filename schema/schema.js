const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require("graphql");
const _ = require("lodash");

//mock data
var books = [
  { name: "book1", id: "1", genre: "Fantasy" },
  { name: "book2", id: "2", genre: "Sci-Fi" },
  { name: "book3", id: "3", genre: "Horror" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => "hello world", //Resolver
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve: (parent, args) => {
        // code to get data from DB
        console.log("kjb");
        return_.find(books, { id: args.id });
      },
    },
  },
});

module.export = new GraphQLSchema({
  query: RootQuery,
});
