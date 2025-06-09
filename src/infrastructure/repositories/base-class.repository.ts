import * as profiles from "../../../drizzle/schema/profiles"
import * as setupQuestions from "../../../drizzle/schema/setup_questions"
import * as userSetupQuestions from "../../../drizzle/schema/user_setup_questions"
import * as modules from "../../../drizzle/schema/modules"
import * as sections from "../../../drizzle/schema/sections"
import * as videos from "../../../drizzle/schema/videos"
import * as finishedVideos from "../../../drizzle/schema/finished_videos"
import * as userSubscription from "../../../drizzle/schema/user_subscriptions"
import * as userBoughtModules from "../../../drizzle/schema/user_bought_modules"
import * as meetings from "../../../drizzle/schema/meetings"
import * as meetingRepeatDays from "../../../drizzle/schema/meeting_repeat_days"
import * as meetingExcludedDates from "../../../drizzle/schema/meeting_excluded_dates"
import * as meetingDates from "../../../drizzle/schema/meeting_dates"
import * as bankOrders from "../../../drizzle/schema/bank_orders"
import * as bankOrderProducts from "../../../drizzle/schema/bank_order_products"
import * as backendKeys from "../../../drizzle/schema/backend_keys"
import * as meetingSignedUpUsers from "../../../drizzle/schema/meeting_signed_up_users"
import * as userSpecificMeetings from "../../../drizzle/schema/user_specific_meetings"
import * as userCalendarIds from "../../../drizzle/schema/user_calendar_ids"

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
        ...userSubscription,
        ...userBoughtModules,
        ...meetings,
        ...meetingRepeatDays,
        ...meetingExcludedDates,
        ...meetingDates,
        ...bankOrders,
        ...bankOrderProducts,
        ...backendKeys,
        ...meetingSignedUpUsers,
        ...userSpecificMeetings,
        ...userCalendarIds
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

        const result = await callback(db);
        await pool.end();
        return result;
    };
}