import mongoose, { Schema, model } from "mongoose";
import { ILecture } from "../interfaces/lecture.interface";

const lectureSchema = new Schema<ILecture>(
  {
    module: { type: Schema.Types.ObjectId, ref: "Module", required: true },
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    pdfNotes: [{ type: String  , required: false}],
    isComplete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<ILecture>("Lecture", lectureSchema);
