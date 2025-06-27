import {z} from "zod";

export const uploadFileOptionsSchema = z.object({
    bucket: z.string(),
    key: z.string(),
    body: z.custom<Buffer>(),
    contentType: z.string()
});

export const getUploadLinkOptionsSchema = uploadFileOptionsSchema.omit({body: true}).and(z.object({expiresInSeconds: z.number()}));

export const deleteFileOptionsSchema = uploadFileOptionsSchema.omit({body: true, contentType: true});
export const deleteMultipleFilesOptionsSchema = uploadFileOptionsSchema.pick({bucket: true}).and(z.object({
    keys: z.array(z.string())
}));

export type UploadFileOptions = z.infer<typeof uploadFileOptionsSchema>;
export type GetUploadLinkOptions = z.infer<typeof getUploadLinkOptionsSchema>;
export type DeleteFileOptions = z.infer<typeof deleteFileOptionsSchema>;
export type DeleteMultipleFilesOptions = z.infer<typeof deleteMultipleFilesOptionsSchema>;

export interface IS3StorageService {
    getUploadLink({bucket, key, contentType, expiresInSeconds}: GetUploadLinkOptions): Promise<string>
    uploadSmallFile(opts: UploadFileOptions): Promise<string>
    deleteFile(opts: DeleteFileOptions): Promise<void>
    deleteMultipleFiles(opts: DeleteMultipleFilesOptions): Promise<void>
}