import {AUTH_RETURN_TYPES, AUTH_SYMBOLS} from "@/di/types/authentication.types";
import {EMAIL_RETURN_TYPES, EMAIL_SYMBOLS} from "@/di/types/email.types";
import {AUTHORIZATION_RETURN_TYPES, AUTHORIZATION_SYMBOLS} from "@/di/types/authorization.types";
import {TODOS_RETURN_TYPES, TODOS_SYMBOLS} from "@/di/types/todos.types";
import {PROFILE_RETURN_TYPES, PROFILE_SYMBOLS} from "@/di/types/profiles.types";
import {SETUP_QUESTIONS_RETURN_TYPES, SETUP_QUESTIONS_SYMBOLS} from "@/di/types/setup-questions.types";

export const DI_SYMBOLS = {
    ...AUTH_SYMBOLS,
    ...AUTHORIZATION_SYMBOLS,
    ...EMAIL_SYMBOLS,
    ...TODOS_SYMBOLS,
    ...PROFILE_SYMBOLS,
    ...SETUP_QUESTIONS_SYMBOLS
};

export interface DI_RETURN_TYPES extends
    AUTH_RETURN_TYPES,
    AUTHORIZATION_RETURN_TYPES,
    EMAIL_RETURN_TYPES,
    TODOS_RETURN_TYPES,
    PROFILE_RETURN_TYPES,
    SETUP_QUESTIONS_RETURN_TYPES
{}