import bcrypt from "bcrypt";
const saltRounds = 10;

const myEncrypt = {};

myEncrypt.hashPassword = async function (pw) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(pw, salt);
  return hash;
};

myEncrypt.compare = async function (pw, hashedPw) {
  const result = await bcrypt.compare(pw, hashedPw);
  return result;
};

export default myEncrypt;