import mongoose, { Schema } from "mongoose";
import { IModule } from "../interfaces/courseModule.interface";

const moduleSchema = new Schema<IModule>(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course" },
    title: { type: String, required: true },
    lectures: [{ type: Schema.Types.ObjectId, ref: "Lecture" }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true , versionKey: false}
);

export default mongoose.model<IModule>("Module", moduleSchema);
/* course ---> module ---> lecture */