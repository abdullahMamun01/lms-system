import mongoose, { Schema } from "mongoose";
import { IWatchLecture } from "../interfaces/watch.interface";

const watchSchema = new Schema<IWatchLecture>({
  state: {
    required: true,
    type: String,
    default: "STARTED",
  },
  lecture: { type: Schema.ObjectId, ref: "Lecture" },
  user: { type: Schema.ObjectId, ref: "User" },
  module: { type: Schema.ObjectId, ref: "Module" },
}
, {
  timestamps: true,
  versionKey:false
}
);

export default mongoose.model("Watch", watchSchema);
