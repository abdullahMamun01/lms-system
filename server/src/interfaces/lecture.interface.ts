import { Types } from "mongoose";

export interface ILecture {

    module: Types.ObjectId; // Module ID
    title: string;
    videoUrl: string;
    pdfNotes: string[];
    isComplete: boolean;
  }
  