import { Types } from "mongoose";

export interface IWatchLecture {
  user: Types.ObjectId;
  state: "STARTED" | "COMPLETED";
  lecture: Types.ObjectId;
  module: Types.ObjectId;
}
