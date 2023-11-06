import express from "express";
import path from "path";
import myEncrypt from "../encrypt/myEncrypt.js";
import myDB from "../db/userDB.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

app.post("/signUp", (req, res) => {
  // Your sign-up logic here
  res.status(200).json({ success: true, message: "User registered successfully" });
});

const PORT = 5173;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

let router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.join("../front/index.html"));
});

router.post("/signIn", async (req, res) => {
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

router.get("/getUser", (req, res) => {
  res.json({ user: req.session.user });
});

router.get("/signOut", (req, res) => {
  req.session.user = null;
  res.json({ user: req.session.user });
});

router.post("/signUp", async (req, res) => {
  const user = req.body;
  user.password = await myEncrypt.hashPassword(req.body.password);
  console.log("Register data to be added to DB", user);
  try {
    const userInfo = await myDB.register(user);
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
