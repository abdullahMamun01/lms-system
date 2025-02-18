import mongoose, { Schema } from "mongoose";
import { IModule } from "../interfaces/module.interface";

const moduleSchema = new Schema<IModule>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    title: { type: String, required: true },
    lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
  },
  { timestamps: true , versionKey: false}
);

export default mongoose.model<IModule>("Module", moduleSchema);
