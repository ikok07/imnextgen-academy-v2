import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {ISetupQuestionsRepository} from "@/src/application/repositories/setup-questions.repository.interface";
import { SetupQuestion } from "@/drizzle/schema/setup_questions";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {
    UserSetupQuestion,
    UserSetupQuestionInsert,
    userSetupQuestionsTable
} from "@/drizzle/schema/user_setup_questions";
import {eq} from "drizzle-orm";

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
    getUserSetupQuestions(): Promise<UserSetupQuestion[]> {
        try {
            return this.queryDB(db => {
                return db.query.userSetupQuestionsTable.findMany();
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
                    })
                }
            })
        } catch(e) {
            throw new DatabaseError(`Failed to set user setup questions! ${e}`);
        }
    }
}