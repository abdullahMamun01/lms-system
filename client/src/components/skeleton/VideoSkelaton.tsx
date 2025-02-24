import React from "react";
import { Skeleton } from "../ui/skeleton";

export default function VideoSkelaton() {
  return (
    <div className="md:col-span-2 space-y-4 z-10">
      <Skeleton className="aspect-video w-full rounded-lg" />
    </div>
  );
}
