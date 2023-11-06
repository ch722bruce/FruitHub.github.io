import express from "express";
let router = express.Router();

import myDB from "../db/myMongoDb.js";
import { ObjectId } from "mongodb";

router.get("/api/fruits", async function (req, res) {
  const fruits = await myDB.getFruits({}, 60);
  res.json(fruits);
});

router.get("/api/fruits/:fruitId", async function (req, res) {
  const { fruitId } = req.params;
  try {
    const fruit = await myDB.getFruitById({ _id: new ObjectId(fruitId) });
    res.json(fruit);
  } catch (e) {
    res.sendStatus(400);
  }
});

router.put("/api/users/subscriptions", async function (req, res) {
  const { fruitId, userId, freq } = req.body;
  try {
    const result = await myDB.subscribe({
      userId: new ObjectId(userId),
      freq: freq,
      fruitId: new ObjectId(fruitId)
    });
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
});
router.get("/api/users/subscriptions", async function (req, res) {
  const { fruitId, userId } = req.params;
  try {
    const fruitSubscription = await myDB.getSubscription({ userId: new ObjectId(userId), fruitId: new ObjectId(fruitId) });
    res.json(fruitSubscription);
  } catch (e) {
    res.sendStatus(500);
  }
});
router.delete("/api/users/subscriptions", async function (req, res) {
  const { fruitId, userId } = req.body;
  try {
    const result = await myDB.unsubscribe({ userId: new ObjectId(userId), fruitId: new ObjectId(fruitId) });
    res.json(result);
  } catch (e) {
    res.sendStatus(500);
  }
});

export default router;
