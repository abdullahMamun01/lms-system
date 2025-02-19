
import AppError from "../errors/AppError";
import { IModule } from "../interfaces/courseModule.interface";
import CourseModel from "../models/course.model";
import CourseModuleModel from "../models/courseModule.model";
import { convertArrayIdToId, convertObjectIdToId } from "../utils/convertObjectId";
import httpStatus from "http-status";

const getModules = async () => {
    const modules = await CourseModuleModel.find().lean();
    return convertArrayIdToId(modules);
};

const getModuleById = async (moduleId: string) => {
  const module = await CourseModuleModel.findById(moduleId).lean();

  if (!module) {
    throw new AppError(httpStatus.NOT_FOUND, "Module not found");
  }
  return convertObjectIdToId(module);
};

const createModule = async (payload: IModule) => {
  if(!payload.course){
    throw new AppError(httpStatus.BAD_REQUEST, "Course is required");
  }
  const course = await CourseModel.findById(payload.course).lean();
  if (!course) {
    throw new AppError(httpStatus.NOT_FOUND, "Course not found");
  }

  const module = await CourseModuleModel.create(payload);
  return convertObjectIdToId(module.toObject());
};

const updateModule = async (moduleId: string, payload: Partial<IModule>) => {
  const module = await CourseModuleModel.findById(moduleId).lean();

  if (!module) {
    throw new AppError(httpStatus.NOT_FOUND, "Module not found");
  }
  const updatedModule = await CourseModuleModel.findByIdAndUpdate(
    moduleId,
    payload,
    { new: true, runValidators: true }
  ).lean();

  return convertObjectIdToId(updatedModule);
};

const deletModule = async (moduleId: string) => {
  const module = await CourseModuleModel.findById(moduleId).lean();

  if (!module) {
    throw new AppError(httpStatus.NOT_FOUND, "Module not found");
  }

  const deletedModule = await CourseModuleModel.findByIdAndUpdate(
    moduleId,
    { isDeleted: true },
    { new: true, runValidators: true }
  ).lean();

  return convertObjectIdToId(deletedModule);
};

export const CourseModuleServices = {
  getModules,
  getModuleById,
  createModule,
  updateModule,
  deletModule,
};
