export class S3StorageError extends Error {
    constructor(message: string) {
        super(message);
    }
}