import { UploadApiResponse } from "cloudinary";
import { cloudinary } from "../config/cloudinary";

export type CloudinaryResourceType = "image" | "video" | "raw" | "auto";

export interface UploadResult {
  url: string;
  publicId: string;
  bytes: number;
  format: string | undefined;
}

/**
 * Uploads a buffer (from Multer's memoryStorage — no temp file ever touches
 * disk) straight to Cloudinary via its upload_stream API.
 */
export function uploadBuffer(
  buffer: Buffer,
  options: { folder: string; resourceType: CloudinaryResourceType }
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: options.folder, resource_type: options.resourceType },
      (error, result?: UploadApiResponse) => {
        if (error || !result) {
          return reject(
            error ?? new Error("Cloudinary upload returned no result")
          );
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          bytes: result.bytes,
          format: result.format,
        });
      }
    );
    stream.end(buffer);
  });
}
