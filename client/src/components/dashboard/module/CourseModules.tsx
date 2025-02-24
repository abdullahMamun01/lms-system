"use client";

import type React from "react";
import { GripVertical, Pencil, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import DeleteModuleModal from "./DeleteModuleModal";
import { IModule } from "@/interfaces/module.interface";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CourseModules({ modules }: { modules: IModule[] }) {
  // const [modules, setModules] = useState<Module[]>([
  //   { id: "0", title: "0 - Introduction", position: 0 },
  //   { id: "1", title: "1 - Getting started", position: 1 },
  //   { id: "2", title: "2 - Installation", position: 2 },
  // ]);
const patheName = usePathname()
  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-2">
      {modules.map((module) => (
        <div
          key={module._id}
          className="flex items-center gap-2  p-4 bg-card rounded-lg border"
        >
          <div className="cursor-grab">
            <GripVertical className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{module.title}</h3>
          </div>
          <DeleteModuleModal moduleId={module._id as string}>
            <Trash className="h-4 w-4 text-red-500" />
          </DeleteModuleModal>
          <Button variant="ghost" size="icon">
            <Link
              href={`${patheName}/modules/${module._id}`}
            >
              <Pencil className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      ))}
    </div>
  );
}
