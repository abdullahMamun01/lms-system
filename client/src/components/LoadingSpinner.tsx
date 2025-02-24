import React from "react";
import { Spinner } from "./ui/spinner";

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen fixed top-0 left-0 right-0 bottom-0 bg-background bg-opacity-50 z-50 flex items-center justify-center">
      <Spinner size="large" />
    </div>
  );
}
