import AppError from "../errors/AppError";
import httpStatus from "http-status";
import courseModel from "../models/course.model";
import courseModuleModel from "../models/courseModule.model";
import { ICourse } from "../interfaces/course.model";
import {
  convertArrayIdToId,
  convertObjectIdToId,
} from "../utils/convertObjectId";

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

const getCourseById = async (courseId: string) => {
  const course = await courseModel.findById(courseId).select(select).lean();
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }
  const modules = await courseModuleModel
    .find({ course: courseId })
    .populate("lectures")
    .lean();
  return { ...course, modules };
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
};
