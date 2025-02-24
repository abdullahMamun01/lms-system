export interface ILectureSchema {
  title: string;
  videoUrl: string;
  files?: {
    file: File;
  }[];
}

export interface ILecture {
  id?: string;
  _id?: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
  pdfNotes?: string[];
}

export interface ILectureWithProgress extends ILecture {
  nextLession: string | null;
  previousLession: string | null;
}
