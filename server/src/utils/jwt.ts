import jwt from "jsonwebtoken";
const generateToken = (
  payload: Record<string, unknown>,
  secret: string,
  options: jwt.SignOptions = {}
) => {
  return jwt.sign(payload, secret, options);
};

const verifyToken = <T>(token: string, secret: string): T => {
  return jwt.verify(token, secret) as T;
};

export { generateToken, verifyToken };
