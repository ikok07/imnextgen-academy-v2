import * as profiles from "../../../drizzle/schema/profiles"
import * as setupQuestions from "../../../drizzle/schema/setup_questions"
import * as userSetupQuestions from "../../../drizzle/schema/user_setup_questions"
import * as modules from "../../../drizzle/schema/modules"
import * as sections from "../../../drizzle/schema/sections"
import * as videos from "../../../drizzle/schema/videos"
import * as finishedVideos from "../../../drizzle/schema/finished_videos"

import ws from "ws"

import {IAuthenticationService} from "@/src/application/services/auth/authentication.service.interface";
import {drizzle, NeonDatabase} from "drizzle-orm/neon-serverless";
import {neonConfig, NeonQueryFunction, Pool} from "@neondatabase/serverless";

export class BaseRepository {
    authService: IAuthenticationService

    schema = {
        ...profiles,
        ...setupQuestions,
        ...userSetupQuestions,
        ...modules,
        ...sections,
        ...videos,
        ...finishedVideos,
    };
    constructor(authenticationService: IAuthenticationService) {
        this.authService = authenticationService;

    }

    protected async queryDB<T>(callback: (db: Omit<
        NeonDatabase<typeof this.schema> & { $client: NeonQueryFunction<false, false> },
        "_" | "$withAuth" | "batch" | "$with" | "$client"
    >) => Promise<T>) {
        neonConfig.webSocketConstructor = ws;
        neonConfig.poolQueryViaFetch = true;

        const pool = new Pool({connectionString: process.env.DATABASE_URL!});

        const db = drizzle(pool, {
            schema: this.schema
        })

        return callback(db);
    };
}