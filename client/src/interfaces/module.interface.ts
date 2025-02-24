import { ILecture } from "./lecture.inteface";

export interface IModule {
    _id?: string
  course: string;
  title: string;
  lectures?: ILecture[]
  moduleNumber: number;
}

export interface ICourseModule {
  course: string;
  modules: IModule[]
}