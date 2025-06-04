import {
    IAuthenticationService
} from "@/src/application/services/auth/authentication.service.interface";
import {User, AuthObject, createClerkClient} from "@clerk/backend";
import {auth, currentUser} from "@clerk/nextjs/server";
import {AuthenticationError} from "@/src/entities/errors/auth/authentication";

export class ClerkService implements IAuthenticationService {
    client = createClerkClient({secretKey: process.env.CLERK_SECRET_KEY});

    async getUser(): Promise<{user: User | null, auth: AuthObject}> {
        try {
            const authObject = await auth();

            return {
                user: await currentUser(),
                auth: authObject
            };
        } catch(e) {
            throw new AuthenticationError(`Failed to get user! ${e}`);
        }
    }
}