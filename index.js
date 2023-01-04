const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

mongoose.connect(
  "mongodb+srv://vicky:vicky@cluster0.1pvdrab.mongodb.net/?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => console.log("Conntected to database"));

const app = express();

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
