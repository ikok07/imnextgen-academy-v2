"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {UserSetupAnswer} from "@/src/entities/setup/user-setup-answers";

export const setUserSetupQuestions = createServerAction(async (userId: string | undefined, answers: UserSetupAnswer[]) => {
    const setUserSetupController = getInjection("ISetUserSetupQuestionsController");
    await setUserSetupController(userId, answers);
})