import mongoose, { Schema, Types } from "mongoose";
import { ICourse } from "../interfaces/course.model";

const courseSchema = new Schema<ICourse>(
  {
    thumbnail: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model<ICourse>("Course", courseSchema);
