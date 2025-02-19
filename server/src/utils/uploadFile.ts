import streamifier from "streamifier";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";
import AppError from "../errors/AppError";
import cloudinary from "../config/cloudinary.config";

export const uploadSingleFile = (
  file: Express.Multer.File,
  resourceType: "image" | "raw" = "image",
  folder: string = "lms-images"
): Promise<UploadApiResponse | UploadApiErrorResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: resourceType,
        folder: folder || undefined, // Optional folder in Cloudinary
        public_id: `${file.originalname.split(".")[0]}`,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!);
      }
    );

    const readStream: Readable = streamifier.createReadStream(file.buffer);
    readStream.pipe(uploadStream);
  });
};

export const uploadMultipleFiles = async (
  files: Express.Multer.File[],
  folder?: string
): Promise<UploadApiResponse[]> => {
  const uploadPromises = files.map((file) => {
    const resourceType = file.mimetype === "application/pdf" ? "raw" : "image";
    return uploadSingleFile(file, resourceType, folder);
  });

  const results = await Promise.all(uploadPromises);

  return results.filter(
    (result) => "secure_url" in result
  ) as UploadApiResponse[];
};

export async function uploadImageByUrls(
  imageUrls: string[]
): Promise<string[]> {
  if (
    !Array.isArray(imageUrls) ||
    !imageUrls.every((url) => typeof url === "string")
  ) {
    throw new Error("imageUrls must be an array of strings");
  }

  try {
    const uploadResults = await Promise.all(
      imageUrls.map((imageUrl) =>
        cloudinary.uploader.upload(imageUrl, {
          folder: "lms-images",
        })
      )
    );

    return uploadResults.map((result) => result.secure_url);
  } catch (error) {
    throw new AppError(500, "Failed to upload image");
  }
}
