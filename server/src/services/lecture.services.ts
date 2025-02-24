import AppError from '../errors/AppError';
import { ILecture } from '../interfaces/lecture.interface';
import ModuleModel from '../models/module.model';
import LectureModel from '../models/lecture.model';
import { convertObjectIdToId } from '../utils/convertObjectId';
import httpStatus from 'http-status';
import { uploadMultipleFiles } from '../utils/uploadFile';
import mongoose from 'mongoose';
import courseModel from '../models/course.model';

const getLecturesByModuleId = async (moduleId: string) => {
  const module = await ModuleModel.findById(moduleId).lean();
  if (!module) {
    throw new AppError(httpStatus.NOT_FOUND, 'Module not found');
  }
  const lectures = await LectureModel.find({ module: moduleId }).lean();
  return convertObjectIdToId(lectures);
};

// const getNextLession = (lectureId:string , moduleId:string) => {
//   const
// };

const getLectureById = async (lectureId: string) => {
  const lecture = await LectureModel.findById(lectureId).lean();
  if (!lecture) {
    throw new AppError(httpStatus.NOT_FOUND, 'Lecture not found');
  }
  const lession = convertObjectIdToId(lecture);
  const findLectures = await LectureModel.find({ module: lession.module })
    .sort({ createdAt: 1 })
    .lean();
  const index = findLectures.findIndex(
    (item) => item._id.toString() === lectureId
  );
  const nextLession =
    index === findLectures.length - 1 ? null : findLectures[index + 1];
  const previousLession = index === 0 ? null : findLectures[index - 1];
  return {
    ...lession,
    nextLession: nextLession ? nextLession._id : null,
    previousLession: previousLession
      ? previousLession._id
      : null,
  }
};

const getAllLectures = async (query: Record<string, unknown>) => {
  const {
    limit = 10,
    page = 1,
    module: moduleName,
    course: courseName = '',
  } = query;
  const skip = (Number(page) - 1) * Number(limit);
  const filters: Record<string, unknown> = {};

  const course = await courseModel.findOne({
    title: {
      RegExp: new RegExp(courseName as string, 'i'),
    },
  });

  const module = await ModuleModel.findOne({
    course: course?._id,
    title: {
      RegExp: new RegExp(moduleName as string, 'i'),
    },
  });
  const lectures = await LectureModel.find({ module: module?._id })
    .limit(Number(limit))
    .skip(skip)
    .lean();

  return lectures;
};

const createLecture = async (payload: ILecture) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const module = await ModuleModel.findById(payload.module).session(session);
    if (!module) {
      throw new AppError(httpStatus.NOT_FOUND, 'Module not found');
    }

    const lecture = await LectureModel.create(
      [
        {
          ...payload,
        },
      ],
      { session }
    );
    // Add lecture ID to module lectures array
    module.lectures.push(lecture[0]._id);
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
    throw new Error('Lecture not found');
  }

  let pdfNotes = lecture.pdfNotes;
  if (files.length > 0) {
    pdfNotes = (
      await uploadMultipleFiles(files as Express.Multer.File[], 'lecture-notes')
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
    throw new Error('Lecture not found');
  }
  const deletedLecture = await LectureModel.deleteOne({
    _id: lectureId,
  }).lean();

  await ModuleModel.findByIdAndUpdate(
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
  getLectureById,
};
