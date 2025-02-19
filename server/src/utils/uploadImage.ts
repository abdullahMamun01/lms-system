

import streamifier from 'streamifier';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { Readable } from 'stream';
import AppError from '../errors/AppError';
import cloudinary from '../config/cloudinary.config';


export const uploadImage = (
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> => {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        (err: any, result: any) => {
          if (err) reject(new Error(err.message as string));

          resolve(result);
        },
      );
      const readStream: Readable = streamifier.createReadStream(file.buffer);
      return readStream.pipe(upload);
    });
    
  }


export async function uploadImageByUrls(imageUrls: string[]): Promise<string[]> {
  if (!Array.isArray(imageUrls) || !imageUrls.every((url) => typeof url === "string")) {
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

    return uploadResults.map((result) => result.secure_url,
    );
  } catch (error) {
    throw new AppError(500, "Failed to upload image");
  }
}



export const cloudinaryController = {
  uploadImage,
};