"use client";
import React from "react";
import ReactPlayer from "react-player";


export default function VideoPlay({ videoUrl ,lectureId }: { videoUrl: string ,lectureId:string }) {
  return (
   
      <div className=" z-10 aspect-video bg-black rounded-lg relative">
        <div className="absolute bottom-0 left-0 right-0 h-full  flex items-center px-4">
          <ReactPlayer key={lectureId} url={videoUrl} width="100%" height="100%" controls />
        </div>
      </div>
 
  );
}
