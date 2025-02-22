import { ICourse } from '@/interfaces/course.interface';
import { create } from 'zustand';

interface CourseStore {
  updatingCourse: ICourse | null;
  deletingCourseId: string | null;
  setUpdatingCourse: (course: ICourse | null) => void;
  setDeletingCourseId: (id: string | null) => void;
}

export const useCourseStore = create<CourseStore>((set) => ({
    updatingCourse: null,
    deletingCourseId: null,
    setUpdatingCourse: (course) => set({ updatingCourse: course }),
    setDeletingCourseId: (id) => set({ deletingCourseId: id }),
  }));
  
