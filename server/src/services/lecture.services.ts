import AppError from "../errors/AppError";
import { ILecture } from "../interfaces/lecture.interface";
import CourseModuleModel from "../models/courseModule.model";
import LectureModel from "../models/lecture.model";
import { convertObjectIdToId } from "../utils/convertObjectId";
import httpStatus from "http-status";
import { uploadMultipleFiles } from "../utils/uploadFile";
import mongoose from "mongoose";

const getLecturesByModuleId = async (moduleId: string) => {
  const module = await CourseModuleModel.findById(moduleId).lean();
  if (!module) {
    throw new AppError(httpStatus.NOT_FOUND, "Module not found");
  }
  const lectures = await LectureModel.find({ module: moduleId }).lean();
  return convertObjectIdToId(lectures);
};

const getAllLectures = async (query: Record<string, unknown>) => {
  const {
    limit = 10,
    page = 1,
    module: moduleName,
    course: courseName = "",
  } = query;
  const skip = (Number(page) - 1) * Number(limit);
  const filters: Record<string, unknown> = {};
  if (moduleName) {
    filters["module"] = moduleName;
  }
  if (courseName) {
    filters["course"] = courseName;
  }

  const course = await CourseModuleModel.findOne({
    title: {
      RegExp: new RegExp(courseName as string, "i"),
    },
  });

  const lectures = await CourseModuleModel.findOne({
    course: course?._id,
    title: {
      RegExp: new RegExp(moduleName as string, "i"),
    },
  })
    .skip(skip)
    .limit(Number(limit))
    .populate("lectures")
    .lean();

  return lectures;
};

const createLecture = async (
  payload: ILecture,
  files: Express.Multer.File[]
) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const module = await CourseModuleModel.findById(payload.module).session(
      session
    );
    if (!module) {
      throw new AppError(httpStatus.NOT_FOUND, "Module not found");
    }

    const pdfNotes = (
      await uploadMultipleFiles(files as Express.Multer.File[], "lecture-notes")
    ).map((file) => file.secure_url);

    const lecture = await LectureModel.create(
      [
        {
          ...payload,
          pdfNotes,
        },
      ],
      { session }
    );
    // Add lecture ID to module lectures array
    module.lectures.push(lecture[0]._id.toString());
    await module.save({ session });

    await session.commitTransaction();
    session.endSession();
    return convertObjectIdToId(lecture[0].toObject());
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const updateLecture = async (
  lectureId: string,
  payload: Partial<ILecture>,
  files: Express.Multer.File[]
) => {
  const lecture = await LectureModel.findById(lectureId).lean();
  if (!lecture) {
    throw new Error("Lecture not found");
  }

  let pdfNotes = lecture.pdfNotes;
  if (files.length > 0) {
    pdfNotes = (
      await uploadMultipleFiles(files as Express.Multer.File[], "lecture-notes")
    ).map((file) => file.secure_url);
  }

  const updatedLecture = await LectureModel.findByIdAndUpdate(
    lectureId,
    {
      ...payload,
      pdfNotes,
    },
    { new: true, runValidators: true }
  ).lean();
  return convertObjectIdToId(updatedLecture);
};

const deleteLecture = async (lectureId: string) => {
  const lecture = await LectureModel.findById(lectureId).lean();
  if (!lecture) {
    throw new Error("Lecture not found");
  }
  const deletedLecture = await LectureModel.deleteOne({
    _id: lectureId,
  }).lean();

  await CourseModuleModel.findByIdAndUpdate(
    lecture.module,
    {
      $pull: {
        lectures: lectureId,
      },
    },
    { new: true, runValidators: true }
  );

  return convertObjectIdToId(deletedLecture);
};

export const LectureServices = {
  getAllLectures,
  createLecture,
  getLecturesByModuleId,
  updateLecture,
  deleteLecture,
};
