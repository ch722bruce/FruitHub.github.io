import {MongoClient} from "mongodb";
import dotenv from "dotenv";
dotenv.config();

function MyMongoDB() {
  const myDB = {};
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";

  function connect() {
    const client = new MongoClient(uri);
    const db = client.db("fruitHub");
    return { client, db };
  }

  myDB.getFruits = async function (query={}, limit = 50){
    const { client, db } = connect();

    try {
      return (await db.collection("fruits").find(query).toArray()).slice(0, limit);
    } finally {
      await client.close();
    }
  };

  myDB.getFruitById = async function(query={}){
    const { client, db } = connect();
    try {
      return await db.collection("fruits").findOne(query);
    } finally {
      await client.close();
    }
  }

  return myDB;
}

const myDB = MyMongoDB();

export default myDB;
