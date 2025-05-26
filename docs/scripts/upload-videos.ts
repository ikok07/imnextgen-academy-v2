import * as fs from "node:fs";
import axios from "axios";
import {z} from "zod";
import path from "node:path";

const MUX_TOKEN_ID= "";
const MUX_TOKEN_SECRET = "";

const ROOT_PATH = "/Users/kok/Downloads/FreeCrashCourse_archive";
const FORMATS = ["mp4"];

const axiosDefaultConfig = {
    headers: {
        Authorization: `Basic ${btoa(`${MUX_TOKEN_ID}:${MUX_TOKEN_SECRET}`)}`
    },
};

let videoCount = 0;

async function uploadVideos() {
    const files = fs.readdirSync(ROOT_PATH).filter(file => FORMATS.some(format => file.includes(format)));
    if (files.length === 0) {
        console.log("No files found in ROOT_PATH!");
        return;
    }

    for (const file of files) {
        console.log(`Uploading ${file}...`);

        // Generate upload url
        const {data: urlData} = await axios.post("https://api.mux.com/video/v1/uploads", {
            new_asset_settings: {
                playback_policies: [
                    "signed"
                ],
                video_quality: "basic",
                max_resolution_tier: "1080p",
            }
        }, axiosDefaultConfig);
        const parsedUrlData = z.object({data: z.object({url: z.string().url(), id: z.string()})}).parse(urlData);

        // Upload the video
        await axios.put(parsedUrlData.data.url, fs.createReadStream(path.join(ROOT_PATH, file)));

        const {data: uploadData} = await axios.get(`https://api.mux.com/video/v1/uploads/${parsedUrlData.data.id}`, axiosDefaultConfig);
        const parsedUploadData = z.object({
            data: z.object({
                status: z.enum(["waiting", "asset_created", "errored", "cancelled", "timed_out"]),
                asset_id: z.string().optional()
            })
        }).parse(uploadData);

        if (parsedUploadData.data.status != "asset_created" || !parsedUploadData.data.asset_id) throw new Error(`Video was not uploaded! Upload status: ${parsedUploadData.data.status}`);

        // Set video metadata
        const splittedFile = file.split('.');
        const title = splittedFile.slice(0, splittedFile.length - 1).join('.');
        const creator_id = "script";
        const external_id = "<change-me>";
        await axios.patch(`https://api.mux.com/video/v1/assets/${parsedUploadData.data.asset_id}`, {
            meta: {
                title,
                creator_id,
                external_id
            }
        }, axiosDefaultConfig);

        console.log(`Finished uploading ${file}! (Number: ${++videoCount}`);
    }
}

uploadVideos().then(res => {
    return;
});