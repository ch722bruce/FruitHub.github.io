import express from "express";
let router = express.Router();


import myDB from "../db/myMongoDb.js";



router.get("/api/fruits", async function (req, res) {

  const fruits = await myDB.getFruits({},60);
  res.json(fruits);
})
export default router;
