import * as profiles from "../../../drizzle/schema/profiles"
import * as setupQuestions from "../../../drizzle/schema/setup_questions"
import * as userSetupQuestions from "../../../drizzle/schema/user_setup_questions"

import {IAuthenticationService} from "@/src/application/services/auth/authentication.service.interface";
import {drizzle, NeonHttpDatabase} from "drizzle-orm/neon-http";
import {neon, NeonQueryFunction} from "@neondatabase/serverless";

export class BaseRepository {
    authService: IAuthenticationService

    schema = {
        ...profiles,
        ...setupQuestions,
        ...userSetupQuestions
    };
    constructor(authenticationService: IAuthenticationService) {
        this.authService = authenticationService;

    }

    protected async queryDB<T>(callback: (db: Omit<
        NeonHttpDatabase<typeof this.schema> & { $client: NeonQueryFunction<false, false> },
        "_" | "$withAuth" | "batch" | "$with" | "$client"
    >) => Promise<T>) {
        const sql = neon(process.env.DATABASE_URL!);

        const db = drizzle({
            client: sql,
            schema: this.schema
        })

        return callback(db);
    };
}