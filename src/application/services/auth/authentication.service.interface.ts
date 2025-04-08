import {AuthObject, User} from "@clerk/backend";
import { z } from "zod";

export const getUserResponseSchema = z.object({
    user: z.custom<User>().nullable(),
    auth: z.custom<AuthObject>(),
})

export type GetUserResponse = z.infer<typeof getUserResponseSchema>;

export interface IAuthenticationService {
    getUser(): Promise<GetUserResponse>;
}