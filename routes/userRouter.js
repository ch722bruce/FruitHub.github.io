import express from "express";
import myEncrypt from "../encrypt/myEncrypt.js";
import myDB from "../db/userDB.js";
import passport from "passport";


let router = express.Router();


router.post("/api/signIn", passport.authenticate("local", {
  successRedirect: "/productList"},
));

router.get("/api/getUser", (req, res) => {
  res.json({user: req.user});
});

router.post("/api/signOut", function (req, res) {
  req.logout(function (err) {
    if (err) {
      res.status(500).json({ ok: false });
    }
    res.status(200).json({ ok: true });
  });
});

router.post("/api/signUp", async (req, res) => {
  const user = req.body;
  user.password = await myEncrypt.hashPassword(req.body.password);
  console.log("Register data to be added to DB", user);
  try {
    const userInfo = await myDB.signUp(user);
    if (userInfo) {
      res.json({success: true, msg: "Successful register."});
    } else {
      res.json({success: false, msg: "User existed. Try another Email."});
    }
  } catch (e) {
    console.log(e);
  }
});


export default router;
