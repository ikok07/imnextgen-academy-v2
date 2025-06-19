import {z} from "zod";

export const uploadFileOptionsSchema = z.object({
    bucket: z.string(),
    key: z.string(),
    body: z.custom<Buffer>(),
    contentType: z.string()
});

export const deleteFileOptionsSchema = uploadFileOptionsSchema.omit({body: true, contentType: true});
export const deleteMultipleFilesOptionsSchema = uploadFileOptionsSchema.pick({bucket: true}).and(z.object({
    keys: z.array(z.string())
}));

export type UploadFileOptions = z.infer<typeof uploadFileOptionsSchema>;
export type DeleteFileOptions = z.infer<typeof deleteFileOptionsSchema>;
export type DeleteMultipleFilesOptions = z.infer<typeof deleteMultipleFilesOptionsSchema>;

export interface IS3StorageService {
    uploadSmallFile(opts: UploadFileOptions): Promise<string>
    deleteFile(opts: DeleteFileOptions): Promise<void>
    deleteMultipleFiles(opts: DeleteMultipleFilesOptions): Promise<void>
}