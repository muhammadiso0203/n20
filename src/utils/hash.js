import { hash, compare } from "bcrypt";

export const decode = async (password) => {
  return await hash(password, 10);
};

export const encode = async (password, hashedPassword) => {
  const isMatch = await compare(password, hashedPassword);
  return isMatch;
};
