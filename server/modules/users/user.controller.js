const bcrypt = require("bcrypt");
const Model = require("./user.model");
const saltRounds = 10;

const create = async (payload) => {
  let { password, ...rest } = payload;
  rest.password = await bcrypt.hash(password, saltRounds);
  return Model.create(rest);
};

const login = async (email, password) => {
  const userExist = await Model.findOne({ email });
  if (!userExist) throw new Error("User doesn't exist");
  const isValidPw = await bcrypt.compare(password, userExist?.password);
  if (!isValidPw) throw new Error("Username or Password invalid");
  return true;
};

module.exports = { create, login };
