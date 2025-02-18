import { Request, Response } from "express";

const getUser = async (req: Request, res: Response) => {
  res.json({
    message: "Get all users user",
  });
};

export const UserController = {
  getUser,
};
