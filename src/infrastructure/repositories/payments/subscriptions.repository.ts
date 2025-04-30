import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {
    ISubscriptionsRepository, RawSubscriptionTiersResults, RawUserSubscriptionResults
} from "@/src/application/repositories/payments/user-subscriptions.repository.interface";
import {UserSubscriptionInsert, userSubscriptionTable} from "@/drizzle/schema/user_subscriptions";
import {DatabaseError} from "@/src/entities/errors/db/database";
import {eq, inArray} from "drizzle-orm";
import {subscriptionTiersTable} from "@/drizzle/schema/subscription_tiers";
import {subscriptionPerksTable} from "@/drizzle/schema/subscription_perks";

export class SubscriptionsRepository extends BaseRepository implements ISubscriptionsRepository {
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
                    .leftJoin(subscriptionPerksTable, eq(subscriptionPerksTable.tier_id, subscriptionTiersTable.id));
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get user subscription: ${e}`);
        }
    }

    getSubscriptionTiers(): Promise<RawSubscriptionTiersResults> {
        try {
            return this.queryDB(db => {
                return db
                    .select({
                        tier: subscriptionTiersTable,
                        perk: subscriptionPerksTable
                    })
                    .from(subscriptionTiersTable)
                    .leftJoin(subscriptionPerksTable, eq(subscriptionPerksTable.tier_id, subscriptionTiersTable.id));
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get subscription tiers: ${e}`);
        }
    }

    getSubscriptionTiersByProductIds(productIds: string[]): Promise<RawSubscriptionTiersResults> {
        try {
            return this.queryDB(db => {
                return db
                    .select({
                        tier: subscriptionTiersTable,
                        perk: subscriptionPerksTable
                    })
                    .from(subscriptionTiersTable)
                    .leftJoin(subscriptionPerksTable, eq(subscriptionPerksTable.tier_id, subscriptionTiersTable.id))
                    .where(inArray(subscriptionTiersTable.stripe_product_id, productIds));
            })
        } catch(e) {
            throw new DatabaseError(`Failed to get subscription tiers: ${e}`);
        }
    }

    async createUserSubscription(subscription: UserSubscriptionInsert): Promise<void> {
        try {
            await this.queryDB(db => {
                return db
                    .insert(userSubscriptionTable)
                    .values(subscription)
                    .onConflictDoUpdate({
                        target: userSubscriptionTable.profile_id,
                        set: {
                            tier_id: subscription.tier_id
                        }
                    })
            });
        } catch(e) {
            throw new DatabaseError(`Failed to create subscription: ${e}`);
        }
    }

    async removeUserSubscription(userId: string): Promise<void> {
        try {
            await this.queryDB(db => {
                return db
                    .delete(userSubscriptionTable)
                    .where(eq(userSubscriptionTable.profile_id, userId));
            });
        } catch(e) {
            throw new DatabaseError(`Failed to create subscription: ${e}`);
        }
    }
}