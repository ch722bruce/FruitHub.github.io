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
  const fruit = await myDB.getFruitById({ _id: new ObjectId(fruitId) });
  res.json(fruit);
});

export default router;
