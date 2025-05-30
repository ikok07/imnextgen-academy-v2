import {AuthObject, User} from "@clerk/backend";
import { z } from "zod";
import {UserRole, userRoleSchema} from "@/src/entities/models/auth/user-roles";

export const getAllUsersForRoleOptionsSchema = z.object({
    role: userRoleSchema
});

export const getUserResponseSchema = z.object({
    user: z.custom<User>().nullable(),
    auth: z.custom<AuthObject>(),
});

export const getAllUsersForRoleResponseSchema = z.object({
    data: z.array(z.custom<User>()),
    count: z.number()
});

export type GetAllUsersForRoleOptions = z.infer<typeof getAllUsersForRoleOptionsSchema>;

export type GetUserResponse = z.infer<typeof getUserResponseSchema>;
export type GetAllUsersForRoleResponse = z.infer<typeof getAllUsersForRoleResponseSchema>;

export interface IAuthenticationService {
    getUser(): Promise<GetUserResponse>;
    getAllUsersForRole(opts: GetAllUsersForRoleOptions): Promise<GetAllUsersForRoleResponse>
}