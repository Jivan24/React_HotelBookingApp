import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {schema} from "./graphql/Schema";
import graphqlHTTP from "express-graphql";
import routes from "./routes/routes"

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost:27017/local");

const db = mongoose.connection;
db.on("error", () => {
  console.log("---FAILED to connect to mongoose");
});
db.once("open", () => {
  console.log("+++Connected to mongoose");
});

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(
  "/graphql",
  graphqlHTTP(req => ({
    schema
    ,graphiql:true
  }))
);

app.use(routes);

app.listen(3000, () => {
  console.log("+++Express Server is Running!!!");
});
