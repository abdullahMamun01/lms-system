import AppError from "../errors/AppError";
import httpStatus from "http-status";
import courseModel from "../models/course.model";
import ModuleModel from "../models/module.model";
import { ICourse } from "../interfaces/course.model";
import {
  convertArrayIdToId,
  convertObjectIdToId,
} from "../utils/convertObjectId";
import { ILecture } from "../interfaces/lecture.interface";
import WatchModel from "../models/watch.module";
import { IModule } from "../interfaces/module.interface";
import lectureModel from "../models/lecture.model";

const select = "-createdAt -updatedAt -isDeleted -isPublished";
const getCourses = async (query: Record<string, any>) => {
  const { limit = 10, page = 1, search = "" } = query;
  const skip = (+page - 1) * Number(limit);
  const courses = await courseModel
    .find({
      title: { $regex: search, $options: "i" },
      isDeleted: false,
    })
    .limit(limit)
    .skip(skip)
    .select(select)
    .lean();
  return convertArrayIdToId(courses);
};

const getCompletedLecturesMap = async (modules: any[], userId: string): Promise<Record<string, boolean>> => {
  const watchModules = await WatchModel.find({
    module: { $in: modules.map((m) => m._id) },
    user: userId,
    state: "COMPLETED",
  }).lean();
  return watchModules.reduce((map, { lecture }) => {
    map[lecture.toString()] = true;
    return map;
  }, {} as Record<string, boolean>);
};

const updateLecturesWithCompletion = (lectures: any[], watchModuleMap: Record<string, boolean>) => {
  return lectures.map((lecture) => ({
    ...lecture,
    completed: watchModuleMap[lecture._id.toString()] || false,
  }));
};

const getModuleAndLecturesByCourseId = async (courseId: string, userId: string) => {
  const course = await courseModel.findById(courseId).lean();
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  const modules = await ModuleModel.find({ course: courseId })
    .populate({
      path: "lectures",
      select: "-createdAt -updatedAt -__v",
    })
    .select(select)
    .lean();

  const watchModuleMap = await getCompletedLecturesMap(modules, userId);

  const updatedModules = modules.map((module) => ({
    ...module,
    lectures: updateLecturesWithCompletion(module.lectures, watchModuleMap),
  }));

  return updatedModules;
};


const getCourseById = async (courseId: string) => {
  const course = await courseModel.findById(courseId).select(select).lean();
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  return convertObjectIdToId(course);
};

const createCoures = async (payload: ICourse) => {
  const course = await courseModel.create(payload);
  return convertObjectIdToId(course.toObject());
};

const updateCourse = async (courseId: string, payload: Partial<ICourse>) => {
  const course = await courseModel.findById(courseId).lean();

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }
  const updatedCourse = await courseModel
    .findByIdAndUpdate(courseId, payload, { new: true, runValidators: true })
    .lean();

  return convertObjectIdToId(updatedCourse);
};

const deleteCourse = async (courseId: string) => {
  const course = await courseModel.findById(courseId).lean();

  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }
  const deletedCourse = await courseModel
    .findByIdAndUpdate(
      courseId,
      { isDeleted: true },
      { new: true, runValidators: true }
    )
    .lean();

  return convertObjectIdToId(deletedCourse);
};

export const CourseServices = {
  getCourses,
  getCourseById,
  createCoures,
  updateCourse,
  deleteCourse,
  getModuleAndLecturesByCourseId,
};
