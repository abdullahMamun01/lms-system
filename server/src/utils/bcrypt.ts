import bcrypt from "bcrypt";
import config from "../config";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(config.bcrypt_salt_rounds );
  return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
