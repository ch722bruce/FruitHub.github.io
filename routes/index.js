import express from "express";
import myDB from "../db/myMongoDB.js";
import { ObjectId } from "mongodb";

let router = express.Router();
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
