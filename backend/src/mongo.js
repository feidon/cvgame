import mongoose from "mongoose";
import { dataInit } from "./upload";
import "dotenv-defaults/config.js";

async function connect() {
  if (!process.env.MONGO_URL) {
    console.error("Missing MONGO_URL");
    process.exit(1);
  }
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.once("open", () => {
    console.log("Mongo database connected!");
    dataInit();
  });
}

export default { connect };
