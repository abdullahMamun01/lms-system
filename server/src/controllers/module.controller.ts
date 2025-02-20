import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { ModuleServices } from "../services/module.services";
import sendResponse from "../utils/sendResponse";

const getAllModules = catchAsync(async (req: Request, res: Response) => {
  const modules = await ModuleServices.getModules();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get all modules retrieved successfully",
    data: modules,
  });
});

const getModuleById = catchAsync(async (req: Request, res: Response) => {
  const module = await ModuleServices.getModuleById(req.params.moduleId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Get module retrieved successfully",
    data: module,
  });
});

const createModule = catchAsync(async (req: Request, res: Response) => {
  const courseId = req.params.courseId;
  const module = await ModuleServices.createModule({
    ...req.body,
    course: courseId,
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Module created successfully",
    data: module,
  });
});

const updateModule = catchAsync(async (req: Request, res: Response) => {
  const module = await ModuleServices.updateModule(
    req.params.moduleId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Module updated successfully",
    data: module,
  });
});

const deleteModule = catchAsync(async (req: Request, res: Response) => {
  const module = await ModuleServices.deletModule(req.params.moduleId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Module deleted successfully",
    data: module,
  });
});

export const ModuleConroller = {
  getAllModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
};
