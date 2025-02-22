import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default function CourseThumbnail({ thumbnail , onEdit }: { thumbnail: string , onEdit: () => void }) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <h3 className="font-medium">Course Image</h3>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          Edit Image
        </Button>
      </div>
      <div className="aspect-video rounded-lg border overflow-hidden">
        <Image
          src={thumbnail}
          alt="Course thumbnail"
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
