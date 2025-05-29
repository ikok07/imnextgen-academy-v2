import {User} from "@clerk/backend";
import {SerializableUser} from "@/src/entities/models/auth/serializable-user";

export function generateSerializableUser(user: User): SerializableUser {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddresses[0].emailAddress,
        phoneNumber: user.phoneNumbers[0].phoneNumber
    }
}