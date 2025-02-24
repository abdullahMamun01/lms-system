import { ILecture } from "@/interfaces/lecture.inteface";
import { create } from "zustand";

interface LectureStore {
  selectedLecture: ILecture | null;
  lectures: ILecture[]; // Required property
  setLecture: (lecture: ILecture) => void;
  setLectures: (lectures: ILecture[]) => void;
  removeLecture: () => void;
}

export const useLectureStore = create<LectureStore>((set) => ({
  selectedLecture: null,
  lectures: [], // Initialize 'lectures' with an empty array
  setLecture: (lecture) => set({ selectedLecture: lecture }),
  setLectures: (lectures) => set({ lectures: lectures }),
  removeLecture: () =>
    set(() => ({
      selectedLecture: null,
    })),
}));
