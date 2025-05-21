import {NextResponse} from "next/server";
import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {JsonWebTokenError} from "jsonwebtoken"
import {auth} from "@clerk/nextjs/server";

const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.R2_BASE_URL!,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
    }
});

const MEDIA_FORMATS = [".mp4", ".png", ".jpeg", ".jpg", ".svg"];

export async function GET(req: Request, res: Response) {
    try {
        const url = new URL(req.url);
        const bucket = url.searchParams.get("bucket");
        const path = url.searchParams.get("path");
        const download = !MEDIA_FORMATS.some(format => path?.includes(format));

        if (!bucket) return NextResponse.json({error: "Invalid bucket"}, {status: 400});
        if (!path) return NextResponse.json({error: "Invalid path"}, {status: 400});

        const authObject = await auth();
        if (!authObject.userId) return NextResponse.json({error: "Unauthorized!"}, {status: 401});

        const command = new GetObjectCommand({
            Bucket: bucket,
            Key: path
        });

        const downloadResponse = await fetch(await getSignedUrl(s3, command, {expiresIn: 60}));
        if (!downloadResponse.ok) return NextResponse.json({error: "File not found!"}, {status: 404});

        if (download) {
            const buffer = Buffer.from(await downloadResponse.arrayBuffer());
            const filename = path.split('/').pop() || "academy-file";
            const newResponse = new NextResponse(buffer);

            const contentType = downloadResponse.headers.get('Content-Type');
            if (contentType) {
                downloadResponse.headers.set('Content-Type', contentType);
            }

            newResponse.headers.set('Content-Disposition', `attachment; filename="${filename}"`);
            newResponse.headers.set('Content-Length', buffer.length.toString());

            return newResponse;
        }

        return downloadResponse;
    } catch(e) {
        if (e instanceof JsonWebTokenError) return NextResponse.json({error: "Unauthorized!"}, {status: 401});
        return NextResponse.json({error: "Unexpected error!"}, {status: 500});
    }
}