import jwt from "jsonwebtoken";

const generatorToken = (id) => {
  return jwt.sign({ id }, "test", {
    expiresIn: "30d",
  });
};

export default generatorToken;
