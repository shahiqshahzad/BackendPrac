import User from "../model/UserModel.js";

const accountAuth = (req, res) => {
  const { email, ...resttd } = req.body;
  console.log(resttd);
};

export { accountAuth };
