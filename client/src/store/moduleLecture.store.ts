
import { IModule } from "@/interfaces/module.interface";
import { create } from "zustand";

interface ModuleLectureStore {
  modules: IModule[]; // Required property
  setModules: (lectures: IModule[]) => void;
}

export const useModuleLectureStore = create<ModuleLectureStore>((set) => ({
  selectedLecture: null,
  modules: [], // Initialize 'lectures' with an empty array
  setModules: (modules) => set({ modules: modules }),
}));
