"use server"

import {createServerAction, ServerActionError} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {UserSetupAnswer} from "@/src/entities/setup/user-setup-answers";

export const setUserSetupQuestions = createServerAction(async (userId: string | undefined, answers: UserSetupAnswer[]) => {
    try {
        const setUserSetupController = getInjection("ISetUserSetupQuestionsController");
        await setUserSetupController(userId, answers);
    } catch(e) {
        throw new ServerActionError((e as Error).message);
    }
})