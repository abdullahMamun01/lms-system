import ModuleLectureList from "@/components/dashboard/lectures/ModuleLectureList";
import Module from "@/components/dashboard/module/Module";

import React from "react";

interface Props {
  params: Promise<{ moduleId: string }>;
}

export default async function ModuleManagePage({ params }: Props) {
  const { moduleId } = await params;
  return (
    <div>
      <Module moduleId={moduleId} />
      <div className="lg:p-0 px-6">
        <ModuleLectureList />
      </div>
    </div>
  );
}
