import express from "express";
import myEncrypt from "../encrypt/myEncrypt.js";
import myDB from "../db/userDB.js";


let router = express.Router();


router.post("/api/signIn", async (req, res) => {
  console.log("login data", req.body);
  const user = req.body;
  try {
    const userInfo = await myDB.findUser(user);
    if (userInfo) {
      const hashedPw = userInfo.password;
      const loginResult = await myEncrypt.compare(user.password, hashedPw);
      if (loginResult) {
        req.session.user = userInfo;
        console.log("User login successfully", req.session.user);
        res.json({ success: true, msg: "Successful login", user: userInfo });
      } else {
        res.json({ success: false, msg: "Wrong password or email" });
      }
    } else {
      res.json({ success: false, msg: "No user exist, please sign up." });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/api/getUser", (req, res) => {
  res.json({ user: req.session.user });
});

router.get("/signOut", (req, res) => {
  req.session.user = null;
  res.json({ user: req.session.user });
});

router.post("/api/signUp", async (req, res) => {
  const user = req.body;
  user.password = await myEncrypt.hashPassword(req.body.password);
  console.log("Register data to be added to DB", user);
  try {
    const userInfo = await myDB.signUp(user);
    if (userInfo) {
      res.json({ success: true, msg: "Successful register." });
    } else {
      res.json({ success: false, msg: "User existed. Try another Email." });
    }
  } catch (e) {
    console.log(e);
  }
});


export default router;
