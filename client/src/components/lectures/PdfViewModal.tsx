"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";


export default function PdfViewModal({
  children,
  pdfUrl,
}: {
  children: React.ReactNode;
  pdfUrl: string;
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <button>{children}</button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl p-6 h-auto max-h-[90vh] overflow-y-auto z-[9999]">
        <iframe
          src={`https://docs.google.com/gview?url=${pdfUrl}&embedded=true`}
          width="100%"
          height="800px"
          className="border rounded"
        />
      </DialogContent>
    </Dialog>
  );
}
