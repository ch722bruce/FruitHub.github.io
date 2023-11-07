import { MongoClient } from "mongodb";
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

  myDB.getFruits = async function (query = {}, limit = 50) {
    const { client, db } = connect();

    try {
      return (await db.collection("fruits").find(query).toArray()).slice(
        0,
        limit,
      );
    } finally {
      await client.close();
    }
  };

  myDB.getFruitById = async function (query = {}) {
    const { client, db } = connect();
    try {
      return await db.collection("fruits").findOne(query);
    } finally {
      await client.close();
    }
  };

  myDB.subscribe = async function (doc = {}) {
    const { client, db } = connect();
    try {
      const filter = { userId: doc.userId, fruitId: doc.fruitId };
      const updateDocument = {
        $set: { freq: doc.freq }
      };
      const options = { upsert: true };
      return await db.collection("subscriptions").updateOne(filter, updateDocument, options);
    } finally {
      await client.close();
    }
  };

  myDB.unsubscribe = async function (doc = {}) {
    const { client, db } = connect();
    try {
      return await db.collection("subscriptions").deleteOne(doc);
    } finally {
      await client.close();
    }
  };

  myDB.getSubscription = async function(query={}){
    const { client, db } = connect();
    try {
      return await db.collection("subscriptions").findOne(query);
    } finally {
      await client.close();
    }
  };

  return myDB;
}

const myDB = MyMongoDB();

export default myDB;
