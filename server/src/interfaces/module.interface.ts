import { Types } from "mongoose";

export interface IModule {
    course: Types.ObjectId;
    title: string;
    lectures: Types.ObjectId[];
    isDeleted?: boolean,
    moduleNumber: number
  }
  