import {z} from "zod";
import {taskSubmissionSchema} from "@/drizzle/schema/task_submissions";

export const fullTaskSubmissionSchema = taskSubmissionSchema.and(z.object({
    profile_name: z.string(),
    profile_email: z.string(),
    video_title: z.string(),
    section_title: z.string(),
    module_title: z.string(),
    module_id: z.string()
}));

export type FullTaskSubmission = z.infer<typeof fullTaskSubmissionSchema>;
