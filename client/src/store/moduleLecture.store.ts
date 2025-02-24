import { IModule } from "@/interfaces/module.interface";
import { create } from "zustand";

interface ModuleLectureStore {
  modules: IModule[];
  selectedLecture: string | null;
  setModules: (modules: IModule[]) => void;
  completeLecture: (lectureId: string) => void;
  calculateLectureCompletion: (moduleId: string) => {
    completedLectures: number;
    totalLectures: number;
  };
  calculateCourseProgress: () => number;
}

export const useModuleLectureStore = create<ModuleLectureStore>((set, get) => ({
  selectedLecture: null,
  modules: [],

  setModules: (modules) => set({ modules }),

  completeLecture: (lectureId) => {
    set((state) => ({
      modules: state.modules.map((module) => ({
        ...module,
        lectures:
          module.lectures?.map((lecture) =>
            lecture._id === lectureId
              ? { ...lecture, completed: true }
              : lecture
          ) || [],
      })),
    }));
  },

  calculateLectureCompletion: (lectureId: string) => {
    const activeModule = get().modules?.find((module) =>
      module.lectures?.some((lecture) => lecture._id === lectureId)
    );

    if (!activeModule || !activeModule.lectures)
      return {
        completedLectures: 0,
        totalLectures: 0,
      };
    const totalLectures = activeModule.lectures.length;
    const completedLectures = activeModule.lectures.filter(
      (lecture) => lecture.completed
    ).length;

    return {
      completedLectures,
      totalLectures,
    };
  },

  calculateCourseProgress: () => {
    const { modules } = get();
    const totalLectures = modules.flatMap(
      (module) => module.lectures || []
    ).length;
    const completedLectures = modules
      .flatMap((module) => module.lectures || [])
      .filter((lecture) => lecture.completed).length;

    return totalLectures ? (completedLectures / totalLectures) * 100 : 0;
  },
}));

// I added optional chaining and fallback values to handle potentially undefined lectures. Let me know if you’d like me to refine anything! 🚀
