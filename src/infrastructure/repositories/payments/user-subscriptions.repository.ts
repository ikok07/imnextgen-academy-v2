import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    IUserSubscriptionsRepository, RawUserSubscriptionResults
} from "@/src/application/repositories/payments/user-subscriptions.repository.interface";
import {userSubscriptionTable} from "@/drizzle/schema/user_subscriptions";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {eq} from "drizzle-orm";
import {subscriptionTiersTable} from "@/drizzle/schema/subscription_tiers";
import { subscriptionPerksTable } from "@/drizzle/schema/subscription_perks";

export class UserSubscriptionsRepository extends BaseRepository implements IUserSubscriptionsRepository {
    getUserSubscription(userId: string): Promise<RawUserSubscriptionResults | undefined> {
        try {
            return this.queryDB(db => {
                return db
                    .select({
                        subscription: userSubscriptionTable,
                        tier: subscriptionTiersTable,
                        perk: subscriptionPerksTable
                    })
                    .from(userSubscriptionTable)
                    .where(eq(userSubscriptionTable.profile_id, userId))
                    .innerJoin(subscriptionTiersTable, eq(subscriptionTiersTable.id, userSubscriptionTable.tier_id))
                    .innerJoin(subscriptionPerksTable, eq(subscriptionPerksTable.tier_id, subscriptionTiersTable.id));
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get user subscription: ${e}`);
        }
    }
}