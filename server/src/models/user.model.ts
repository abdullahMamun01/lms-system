import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, unique: true, sparse: true },
    avatarUrl: { type: String, required: false },
    role: {
      type: String,
      default: "USER",
      enum: ["USER", "ADMIN"],
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
const UserModel  = mongoose.model<IUser>("User", UserSchema);
export default  UserModel
