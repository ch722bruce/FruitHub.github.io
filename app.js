import express from "express";
import path, {dirname} from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import {fileURLToPath} from "url";
import indexRouter from "./routes/index.js";
import userRouter from "./routes/userRouter.js";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session";
import userDB from "./db/userDB.js";
import myEncrypt from "./encrypt/myEncrypt.js";


// ES6 modules don't have __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();

const myStrategy = new LocalStrategy(
  async function verify(username, password, cb) {
    try {
      const userInfo = await userDB.findUser({email: username});
      if (userInfo) {
        const hashedPw = userInfo.password;
        const loginResult = await myEncrypt.compare(password, hashedPw);
        if (loginResult) {
          return cb(
            null,
            {id: userInfo._id, email: userInfo}
          );
        } else {
          return cb(null, false);
        }
      } else {
        return cb(null, false);
      }
    } catch (err) {
      return cb(err);
    }
  }
);
passport.use(myStrategy);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "front", "dist")));
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
  }),
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    console.log(user);
    cb(null, {id: user.id, email: user.email});
  });
});
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});
app.use(passport.authenticate("session"));
app.use("/", indexRouter);
app.use("/", userRouter);


export default app;
