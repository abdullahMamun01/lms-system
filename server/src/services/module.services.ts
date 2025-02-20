import { Types } from "mongoose";
import AppError from "../errors/AppError";
import { IModule } from "../interfaces/module.interface";
import CourseModel from "../models/course.model";
import ModuleModel from "../models/module.model";
import {
  convertArrayIdToId,
  convertObjectIdToId,
} from "../utils/convertObjectId";
import httpStatus from "http-status";

const getNextModuleNumber = async (
  courseId: Types.ObjectId
): Promise<number> => {
  const lastModule = await ModuleModel.findOne({course: courseId })
    .sort({ moduleNumber: -1 })
    .select("moduleNumber");
  return lastModule ? lastModule.moduleNumber + 1 : 1;
};

const getModules = async () => {
  const modules = await ModuleModel.find().lean();
  return convertArrayIdToId(modules);
};

const getModuleById = async (moduleId: string) => {
  const module = await ModuleModel.findById(moduleId).lean();

  if (!module) {
    throw new AppError(httpStatus.NOT_FOUND, "Module not found");
  }
  return convertObjectIdToId(module);
};

const createModule = async (payload: IModule) => {
  if (!payload.course) {
    throw new AppError(httpStatus.BAD_REQUEST, "Course is required");
  }
  const course = await CourseModel.findById(payload.course).lean();
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }
  const moduleNumber = await getNextModuleNumber(payload.course);
  const module = await ModuleModel.create({ ...payload, moduleNumber });
  return convertObjectIdToId(module.toObject());
};

const updateModule = async (moduleId: string, payload: Partial<IModule>) => {
  const module = await ModuleModel.findById(moduleId).lean();

  if (!module) {
    throw new AppError(httpStatus.NOT_FOUND, "Module not found");
  }
  const updatedModule = await ModuleModel.findByIdAndUpdate(
    moduleId,
    payload,
    { new: true, runValidators: true }
  ).lean();

  return convertObjectIdToId(updatedModule);
};

const deletModule = async (moduleId: string) => {
  const module = await ModuleModel.findById(moduleId).lean();

  if (!module) {
    throw new AppError(httpStatus.NOT_FOUND, "Module not found");
  }

  const deletedModule = await ModuleModel.findByIdAndUpdate(
    moduleId,
    { isDeleted: true },
    { new: true, runValidators: true }
  ).lean();

  return convertObjectIdToId(deletedModule);
};

export const ModuleServices = {
  getModules,
  getModuleById,
  createModule,
  updateModule,
  deletModule,
};
