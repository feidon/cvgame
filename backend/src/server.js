import { GraphQLServer, PubSub } from "graphql-yoga";

// resolvers
import Query from "./resolvers/Query.js";
import Mutation from "./resolvers/Mutation.js";
import User from "./resolvers/User.js";
import Subscription from "./resolvers/Subscription.js";
// db
import userModel from "./models/user.js";

const pubSub = new PubSub();
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
  },
  context: {
    userModel,
    pubSub,
  },
});

export default server;
