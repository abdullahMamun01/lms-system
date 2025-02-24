"use client";
import React, { Suspense } from "react";
import { Search, FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dynamic from "next/dynamic";

const PdfViewModal = React.lazy(() => import("./PdfViewModal"));

export default function PdfList({ pdfNotes }: { pdfNotes: string[] }) {
  const getFileName = (url: string) => {
    return url.split("/").pop() || url;
  };
  const pdfList = pdfNotes.map((pdf) => ({
    url: pdf,
    filename: getFileName(pdf),
  }));

  // Function to handle PDF download
  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };
  return (
    <Card className="bg-[#1A1B2D] text-white">
      <Table className="hover:bg-[#1A1B2D]/90 border-0">
        <TableHeader className="hover:bg-[#1A1B2D]/90 border-0">
          <TableRow className="hover:bg-[#1A1B2D]/90 border-0">
            <TableHead className="text-white">File Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pdfList.map((pdf, i) => (
            <TableRow key={i} className="hover:bg-[#1A1B2D]/90 border-0">
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  {pdf.filename}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <Suspense fallback={<div>Loading...</div>}>
                    <PdfViewModal pdfUrl={pdf.url}>
                      <div className="flex gap-1 items-center">
                        <Eye className="h-4 w-4" />
                        <span className="hidden sm:inline">View</span>
                      </div>
                    </PdfViewModal>
                  </Suspense>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDownload(pdf.url)}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
