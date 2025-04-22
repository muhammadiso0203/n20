import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password,10);
};

export const verifyPassword = async (password, secret) => {
  return await bcrypt.compare(password, secret);
};
