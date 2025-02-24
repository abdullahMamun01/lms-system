"use client";
import { Pencil, X } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import ModuleTitleForm from "@/components/forms/ModuleTitleForm";
export default function ModuleTitle({ title }: { title: string }) {
    console.log(title , 'hello')
  const [editTitle, setEditTitel] = useState(false);

  const [moduleTitle, setModuleTitile] = useState(title);
  const onUpdate = (title:string) => {
    setModuleTitile(title);
    setEditTitel(false);
  };
  return (
    <Card className="mt-8 w-2/4">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md bg-emerald-50">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-emerald-600"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </div>
          <div className="w-full flex justify-between">
            <CardTitle>Customize Your module</CardTitle>
            {editTitle && (
              <button
                
                className="flex gap-1"
                onClick={() => setEditTitel(false)}
              >
               <X className="text-red-500"/> 
              </button>
            )}
          </div>
        </div>
      </CardHeader>
      {editTitle ? (
        <ModuleTitleForm onUpdate={onUpdate} title={moduleTitle} />
      ) : (
        <>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="font-medium">{moduleTitle}</div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setEditTitel(true)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
