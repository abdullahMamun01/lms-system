"use client";
import React from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FileUp, X, FileText } from "lucide-react";
import { useLectureStore } from "@/store/lecture.stores";

interface FileEntry {
  file: File;
}

interface FormData {
  files: FileEntry[];
}

interface PdfFileUploadFormProps {
  maxFileSize?: number;
  maxFiles?: number;
}

const PdfFileUploadForm: React.FC<PdfFileUploadFormProps> = ({
  maxFileSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 5,
}) => {
  const { control, setError, clearErrors, watch } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "files",
  });

  const { selectedLecture } = useLectureStore();
  const watchFiles = watch("files");
  const validateFile = (file: File): string | null => {
    if (file.type !== "application/pdf") {
      return "Please select PDF files only";
    }
    if (file.size > maxFileSize) {
      return "File size should not exceed 10MB";
    }
    return null;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (fields.length >= maxFiles) {
      setError("files", {
        type: "maxLength",
        message: `You can only upload up to ${maxFiles} files`,
      });
      return;
    }

    const error = validateFile(file);
    if (error) {
      setError("files", {
        type: "validate",
        message: error,
      });
      return;
    }

    clearErrors("files");
    append({
      file,
    });

    // Reset input
    e.target.value = "";
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="file"
          id="file-input"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
        <label
          htmlFor="file-input"
          className={`block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${
              fields.length > 0
                ? "border-primary/50 bg-blue-50"
                : "border-gray-300 hover:primary/50"
            }`}
        >
          <div className="space-y-4">
            <FileUp className="w-12 h-8 mx-auto text-gray-400" />
            <div className="">
              <p className="text-lg font-medium text-gray-700">
                Click to add a PDF file
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Maximum {maxFiles} files, 10MB each
              </p>
            </div>
          </div>
        </label>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => {
          const file = watchFiles[index]?.file;
          return (
            <div
              key={field.id}
              className="bg-blue-50 rounded-lg border border-blue-100 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-primary/40" />
                    <div>
                      <p className="font-medium text-blue-900 truncate max-w-xs">
                        {file.name}
                      </p>
                      <p className="text-sm text-blue-600">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 hover:bg-blue-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-blue-700" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {fields.length == 0 && selectedLecture && (
        <>
          <div className="bg-yellow-50 rounded-lg border border-yellow-100 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <FileText className="w-8 h-8 text-yellow-400" />
                  {selectedLecture.pdfNotes?.map((pdf, i) => (
                    <li key={i}>{pdf}</li>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PdfFileUploadForm;
