import {
    DeleteFileOptions, DeleteMultipleFilesOptions,
    IS3StorageService,
    UploadFileOptions
} from "@/src/application/services/storage/s3-storage.service.interface";
import {DeleteObjectCommand, DeleteObjectsCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {S3StorageError} from "@/src/entities/errors/storage/s3-storage";

export class S3StorageService implements IS3StorageService {

    client = new S3Client({
        region: "auto",
        endpoint: process.env.R2_BASE_URL!,
        credentials: {
            accessKeyId: process.env.R2_ACCESS_KEY_ID!,
            secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
        },
        forcePathStyle: true,
        useArnRegion: true,
        tls: true
    });

    /**
     * @brief Uploads the file server side if the size is not that big
     * @returns URI of the file
     */
    async uploadSmallFile({bucket, key, body, contentType}: UploadFileOptions): Promise<string> {
        try {
            await this.client.send(new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: body,
                ContentType: contentType
            }));
            return `/api/v1/assets?bucket=${bucket}&path=${key}`;
        } catch (e) {
            throw new S3StorageError(`Failed to upload small file! ${e}`);
        }
    }

    async deleteFile({bucket, key}: DeleteFileOptions): Promise<void> {
        try {
            await this.client.send(new DeleteObjectCommand({
                Bucket: bucket,
                Key: key
            }));
        } catch (e) {
            throw new S3StorageError(`Failed to delete file ${key} in bucket: ${bucket}! ${e}`);
        }
    }
    async deleteMultipleFiles({bucket, keys}: DeleteMultipleFilesOptions): Promise<void> {
        try {
            await this.client.send(new DeleteObjectsCommand({
                Bucket: bucket,
                Delete: {
                    Objects: keys.map(k => ({Key: k})),
                    Quiet: true
                }
            }));
        } catch (e) {
            throw new S3StorageError(`Failed to delete files '${keys.join(", ")}' in bucket: ${bucket}! ${e}`);
        }
    }
}