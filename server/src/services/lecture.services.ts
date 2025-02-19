import { ILecture } from "../interfaces/lecture.interface";
import LectureModel from "../models/lecture.model";
import { convertObjectIdToId } from "../utils/convertObjectId";

const getAllLectures = async (query: Record<string, unknown>) => {};

const createLecture = async (payload: ILecture) => {
  const lecture = await LectureModel.create(payload);
  return convertObjectIdToId(lecture.toObject());
};

const updateLecture = async (lectureId: string, payload: Partial<ILecture>) => {
  const lecture = await LectureModel.findById(lectureId).lean();
  if (!lecture) {
    throw new Error("Lecture not found");
  }
  const updatedLecture = await LectureModel.findByIdAndUpdate(
    lectureId,
    payload,
    { new: true, runValidators: true }
  ).lean();
  return convertObjectIdToId(updatedLecture);
};

const deleteLecture = async (lectureId: string) => {
  const lecture = await LectureModel.findById(lectureId).lean();
  if (!lecture) {
    throw new Error("Lecture not found");
  }
  const deletedLecture = await LectureModel.deleteOne({ _id: lectureId }).lean();
  return convertObjectIdToId(deletedLecture);
};

export const LectureServices = {
  getAllLectures,
  createLecture,
  updateLecture,
  deleteLecture,
};
