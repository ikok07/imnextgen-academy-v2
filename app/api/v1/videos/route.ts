import {NextResponse} from "next/server";
import {GetObjectCommand, S3Client} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {JsonWebTokenError} from "jsonwebtoken"
import {auth} from "@clerk/nextjs/server";

const s3 = new S3Client({
    region: "auto",
    endpoint: process.env.VIDEO_PROVIDER_BASE_URL!,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!
    }
})

export async function GET(req: Request, res: Response) {
    try {
        const url = new URL(req.url);
        const path = url.searchParams.get("path");
        if (!path) return NextResponse.json({error: "Invalid path"}, {status: 400});

        const authObject = await auth();
        if (!authObject.userId) return NextResponse.json({error: "Unauthorized!"}, {status: 401});

        const command = new GetObjectCommand({
            Bucket: "test",
            Key: path
        });

        return await fetch(await getSignedUrl(s3, command, {expiresIn: 60}));
    } catch(e) {
        if (e instanceof JsonWebTokenError) return NextResponse.json({error: "Unauthorized!"}, {status: 401});
        return NextResponse.json({error: "Unexpected error!"}, {status: 500});
    }
}