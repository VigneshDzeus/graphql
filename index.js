const express = require("express");
const graphql = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const app = express();

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
} = graphql;
const _ = require("lodash");

//mock data
var books = [
  { name: "book1", id: "1", genre: "Fantasy", authorid: "1" },
  { name: "book2", id: "2", genre: "Sci-Fi", authorid: "3" },
  { name: "book3", id: "3", genre: "Horror", authorid: "3" },
  { name: "book4", id: "4", genre: "Fantasy", authorid: "1" },
  { name: "book5", id: "5", genre: "Sci-Fi", authorid: "2" },
  { name: "book6", id: "6", genre: "Horror", authorid: "3" },
];

var authors = [
  { name: "author", id: "1", age: 10 },
  { name: "baby", id: "2", age: 2 },
  { name: "doctor", id: "3", age: 25 },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        console.log(parent);
        return _.find(authors, { id: parent.authorid });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        return _.filter(books, { authorid: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve: () => books,
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve: () => authors,
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve: (parent, args) => {
        // code to get data from DB
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      resolve: (parent, args) => {
        // code to get data from DB
        return _.find(authors, { id: args.id });
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
