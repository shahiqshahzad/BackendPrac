import bcrypt from "bcryptjs";

export const matchPassword = async (password, enteredPassword) => {
  return await bcrypt.compare(enteredPassword, password);
};
