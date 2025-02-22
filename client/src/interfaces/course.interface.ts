

export interface ICourseSchema {
    title: string;
    description: string;
    price: string;
    image: FileList; // Add the image field here
  }
  

  export interface ICourse {
    id:string
    title: string;
    description: string;
    price: number;
    thumbnail: string
  }
  