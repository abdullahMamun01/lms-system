import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";

import useAuth from "@/store/auth.store";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { deleteModuleById } from "@/services/moduleService";

export default function DeleteModuleModal({
    moduleId,
  children,
}: {
  children: React.ReactNode;
  moduleId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();
  const handleDelete = async () => {
    setIsLoading(true);
    console.log(moduleId , 'dafadsf')
    try {
      await deleteModuleById(moduleId, token as string);
      toast.success("module deleting success");
      setIsLoading(false);
      setIsOpen(false);
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you absolutely sure want to delete this Module?
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-end space-x-4">
          <Button
            variant="outline"
            color="red"
            className=""
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>

          <Button color="red" className="bg-red-600" onClick={handleDelete}>
            {isLoading ? (
              <span className="flex ga-2 ">
                <Spinner /> deleting...
              </span>
            ) : (
              <span>delete</span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
