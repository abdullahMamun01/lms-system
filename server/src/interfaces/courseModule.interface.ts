import { Types } from "mongoose";

export interface IModule {
    course: Types.ObjectId;
    title: string;
    lectures: string[];
    isDeleted?: boolean
  }
  