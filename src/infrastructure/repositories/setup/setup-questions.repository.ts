import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    GetUserSetupQuestionsRawResponse,
    ISetupQuestionsRepository
} from "@/src/application/repositories/setup/setup-questions.repository.interface";
import {SetupQuestion, setupQuestionsTable} from "@/drizzle/schema/setup_questions";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {
    UserSetupQuestion,
    UserSetupQuestionInsert,
    userSetupQuestionsTable
} from "@/drizzle/schema/user_setup_questions";
import {eq} from "drizzle-orm";
import {profilesTable} from "@/drizzle/schema/profiles";

export class SetupQuestionsRepository extends BaseRepository implements ISetupQuestionsRepository {
    getSetupQuestions(): Promise<SetupQuestion[]> {
        try {
            return this.queryDB(db => {
                return db.query.setupQuestionsTable.findMany();
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get setup questions! ${e}`);
        }
    }
    getUserSetupQuestions(userId: string): Promise<GetUserSetupQuestionsRawResponse> {
        try {
            return this.queryDB(db => {
                return db
                    .select({
                        userSetupQuestion: userSetupQuestionsTable,
                        setupQuestion: setupQuestionsTable
                    })
                    .from(userSetupQuestionsTable)
                    .where(eq(userSetupQuestionsTable.profile_id, userId))
                    .innerJoin(setupQuestionsTable, eq(setupQuestionsTable.id, userSetupQuestionsTable.question_id));
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get user setup questions! ${e}`);
        }
    }
    async setUserSetupQuestions(userId: string, answers: UserSetupQuestionInsert[]): Promise<void> {
        try {
            await this.queryDB(async db => {
                if (answers.length > 0) {
                    await db.transaction(async tx => {
                        await tx.delete(userSetupQuestionsTable).where(eq(userSetupQuestionsTable.profile_id, userId)).execute();
                        await tx.insert(userSetupQuestionsTable).values(answers).execute();
                        await tx.update(profilesTable).set({configured: true}).where(eq(profilesTable.id, userId)).execute();
                    })
                }
            })
        } catch(e) {
            throw new DatabaseError(`Failed to set user setup questions! ${e}`);
        }
    }
}