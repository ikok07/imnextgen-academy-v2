import {AuthObject, User} from "@clerk/backend";
import { z } from "zod";
import {userRoleSchema} from "@/src/entities/models/auth/user-roles";

export const getAllUsersForRoleOptionsSchema = z.object({
    role: userRoleSchema
});

export const getUserResponseSchema = z.object({
    user: z.custom<User>().nullable(),
    auth: z.custom<AuthObject>(),
});

export type GetAllUsersForRoleOptions = z.infer<typeof getAllUsersForRoleOptionsSchema>;

export type GetUserResponse = z.infer<typeof getUserResponseSchema>;

export interface IAuthenticationService {
    getUser(): Promise<GetUserResponse>;
    deleteUser(userId: string): Promise<User>;
}