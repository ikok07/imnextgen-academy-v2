import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    IUserSubscriptionsRepository
} from "@/src/application/repositories/payments/user-subscriptions.repository.interface";
import {UserSubscription, SubscriptionTier, userSubscriptionTable} from "@/drizzle/schema/user_subscriptions";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {eq} from "drizzle-orm";

export class UserSubscriptionsRepository extends BaseRepository implements IUserSubscriptionsRepository {
    getUserSubscription(userId: string): Promise<UserSubscription | undefined> {
        try {
            return this.queryDB(db => {
                return db.query.userSubscriptionTable.findFirst({where: eq(userSubscriptionTable.profile_id, userId)});
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get user subscription: ${e}`);
        }
    }
    addUserSubscription(userId: string, tier: SubscriptionTier): Promise<UserSubscription> {
        try {
            return this.queryDB(async db => {
                return (await db.insert(userSubscriptionTable).values({
                    profile_id: userId,
                    subscription_tier: tier
                }).returning())[0];
            })
        } catch(e) {
            throw new DatabaseError(`Failed to add user subscription: ${e}`);
        }
    }
    updateUserSubscriptionTier(userId: string, tier: SubscriptionTier): Promise<UserSubscription> {
        try {
            return this.queryDB(async db => {
                return (await db.update(userSubscriptionTable).set({
                    subscription_tier: tier
                }).where(eq(userSubscriptionTable.profile_id, userId)).returning())[0];
            })
        } catch(e) {
            throw new DatabaseError(`Failed to update user subscription tier: ${e}`);
        }
    }

}