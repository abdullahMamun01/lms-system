interface Lecture {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
}
interface Module {
  id: string;
  title: string;
  duration: string;
  progress: string;
  moduleNo: number;
  lessons: Lecture[];
  complete: boolean;
}

export const modules: Module[] = [
  {
    id: "01",
    title: "Introduction to redux",
    duration: "1h 58m",
    progress: "5/11",
    moduleNo: 1,
    complete: false,
    lessons: [
      {
        id: "1-1",
        title: "Introduction to the course",
        duration: "7 min",
        videoUrl: "https://www.youtube.com/watch?v=K5KVEU3aaeQ",

        completed: false,
      },
      {
        id: "1-2",
        title: "Why do we need redux ??",
        videoUrl: "https://www.youtube.com/watch?v=K5KVEU3aaeQ",

        duration: "12 min",
        completed: false,
      },
      {
        id: "1-3",
        title: "Why do we need redux continued",
        duration: "15 min",
        videoUrl: "https://www.youtube.com/watch?v=K5KVEU3aaeQ",

        completed: false,
      },
      {
        id: "1-6",
        title: "Inner Working Of Redux",
        videoUrl: "https://www.youtube.com/watch?v=K5KVEU3aaeQ",

        duration: "9 min",
        completed: false,
      },
    ],
  },

  {
    id: "02",
    title: "Introduction to redux",
    duration: "1h 58m",
    progress: "5/11",
    moduleNo: 2,
    complete: false,
    lessons: [
      {
        id: "2-1",
        title: "Introduction to the course",
        videoUrl: "https://www.youtube.com/watch?v=K5KVEU3aaeQ",
        duration: "7 min",
        completed: true,
      },
      {
        id: "2-2",
        title: "Why do we need redux ??",
        duration: "12 min",
        videoUrl: "https://www.youtube.com/watch?v=K5KVEU3aaeQ",

        completed: false,
      },
      {
        id: "2-3",
        title: "Why do we need redux continued",
        videoUrl: "https://www.youtube.com/watch?v=K5KVEU3aaeQ",

        duration: "15 min",
        completed: false,
      },
      {
        id: "2-6",
        title: "Inner Working Of Redux",
        videoUrl: "https://www.youtube.com/watch?v=K5KVEU3aaeQ",

        duration: "9 min",
        completed: false,
      },
    ],
  },
];
