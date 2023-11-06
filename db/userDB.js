import {MongoClient} from "mongodb";
import dotenv from "dotenv";
dotenv.config();

function MyAuthMongoDB() {
  const myDB = {};
  const mongourl = process.env.MONGO_URL;

  myDB.findUser = async function (user) {
    const DB_NAME = "fruitHub";
    const COL_NAME = "users";
    const client = new MongoClient(mongourl) || "mongodb://localhost:27017";
    const usersColl = client.db(DB_NAME).collection(COL_NAME);
    try {
      const res = await usersColl.findOne({ email: user.email });
      if (res) {
        console.log("DB find user");
        return res;
      } else {
        console.log("No user exist in DB");
        return null;
      }
    } catch (e) {
      console.log(e);
    }
  };

  myDB.register = async function (user) {
    const DB_NAME = "fruitHub";
    const COL_NAME = "users";
    const client = new MongoClient(mongourl) || "mongodb://localhost:27017";
    const usersColl = client.db(DB_NAME).collection(COL_NAME);
    try {
      const userInfo = await usersColl.findOne({ email: user.email });
      if (userInfo) {
        console.log("Register failed. User exists");
        return false;
      } else {
        console.log("Register successful.");
        const res = await usersColl.insertOne(user);
        return true;
      }
    } catch (e) {
      console.log(e);
    }
  };

  myDB.updateUserInfo = async function (userNewInfo) {
    const DB_NAME = "fruitHub";
    const COL_NAME = "users";
    const client = new MongoClient(mongourl) || "mongodb://localhost:27017";
    const usersColl = client.db(DB_NAME).collection(COL_NAME);
    try {
      console.log("New info", userNewInfo);
      const userInfo = await usersColl.findOne({ email: userNewInfo.email });
      console.log("Find the user to be updated", userInfo);
      if (userInfo) {
        const res = await usersColl.updateOne(
          { email: userNewInfo.email },
          {
            $set: {
              fname: userNewInfo.fname,
              lname: userNewInfo.lname,
              program: userNewInfo.program,
              password: userNewInfo.password,
            },
          }
        );
        console.log("Updating Result in DB", res);
        return res;
      }
    } catch (e) {
      console.log(e);
    }
  };

  myDB.deleteUser = async function (user) {
    const DB_NAME = "fruitHub";
    const COL_NAME = "users";
    const client = new MongoClient(mongourl) || "mongodb://localhost:27017";
    const usersColl = client.db(DB_NAME).collection(COL_NAME);
    try {
      console.log("Try Deleting user..", user);
      const userInfo = await usersColl.findOne({ email: user.email });
      if (userInfo) {
        console.log("Deleting user..", userInfo);
        const res = await usersColl.deleteOne({ email: user.email });
        console.log("Deleting Result in DB", res);
        return res;
      }
    } catch (e) {
      console.log(e);
    }
  };

  myDB.getUserOrder = async function (useremail) {
    const DB_NAME = "project3";
    const DB_COLLECTION = "users";
    const client = new MongoClient(mongourl) || "mongodb://localhost:27017";

    try {
      const data = client.db(DB_NAME).collection(DB_COLLECTION);
      const user = await data.findOne({ email: useremail });
      console.log(user);
      client.close();

      const currentUserPlan = user.productOrders;
      return currentUserPlan;
    } catch (e) {
      console.log(e);
    }
  };

  myDB.createOrder = async function (order, useremail) {
    const DB_NAME = "project3";
    const DB_COLLECTION = "users";
    const client = new MongoClient(mongourl) || "mongodb://localhost:27017";
    let count = 0;

    try {
      order.courses.forEach((order) => {
        if (order.code === "none") {
          count = count + 1;
        }
      });
      if (count > 0) {
        return false;
      }
      const userCol = client.db(DB_NAME).collection(DB_COLLECTION);
      await userCol.updateOne({ email: useremail }, { $push: { order: order } });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  return myDB;
}

module.exports = MyAuthMongoDB();