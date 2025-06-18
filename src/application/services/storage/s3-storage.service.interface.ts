import {z} from "zod";

export const uploadFileOptionsSchema = z.object({
    bucket: z.string(),
    key: z.string(),
    body: z.custom<Buffer>(),
    contentType: z.string()
});

export const deleteFileOptionsSchema = uploadFileOptionsSchema.omit({body: true, contentType: true});

export type UploadFileOptions = z.infer<typeof uploadFileOptionsSchema>;
export type DeleteFileOptions = z.infer<typeof deleteFileOptionsSchema>;

export interface IS3StorageService {
    uploadSmallFile(opts: UploadFileOptions): Promise<string>
    deleteFile(opts: DeleteFileOptions): Promise<void>
}