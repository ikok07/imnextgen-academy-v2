import {
    GoogleNotificationChannel,
    GoogleNotificationChannelInsert,
    googleNotificationChannelsTable
} from "@/drizzle/schema/google_notification_channels";
import {
    GetNotificationChannelByIdOptions,
    IGoogleNotificationChannelsRepository
} from "@/src/application/repositories/google-notification-channels/google-notification-channels.repository.interface";
import { DatabaseError } from "@/src/entities/errors/db/database";
import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {eq, SQL} from "drizzle-orm";

export class GoogleNotificationChannelsRepository extends BaseRepository implements IGoogleNotificationChannelsRepository {
    getNotificationChannelById(opts: GetNotificationChannelByIdOptions): Promise<GoogleNotificationChannel> {
        try {
            let predicate: SQL<unknown> | undefined;
            if (opts.id) predicate = eq(googleNotificationChannelsTable.id, opts.id);
            if (opts.resourceId) predicate = eq(googleNotificationChannelsTable.resource_id, opts.resourceId);
            if (opts.internalResourceId) predicate = eq(googleNotificationChannelsTable.channel_internal_resource_id, opts.internalResourceId);

            return this.queryDB(async db => {
                const res = await db.query.googleNotificationChannelsTable.findFirst({where: predicate});
                if (!res) throw new Error("Cannot find notification channel with this id!");
                return res;
            })
        } catch (e) {
            throw new DatabaseError(`Failed to get google notification channel by id: ${e}`);
        }
    }
    createNotificationChannel(data: GoogleNotificationChannelInsert): Promise<GoogleNotificationChannel> {
        try {
            return this.queryDB(async db => {
                const res = await db.insert(googleNotificationChannelsTable).values(data).returning();
                return res[0];
            })
        } catch (e) {
            throw new DatabaseError(`Failed to create google notification channel by id: ${e}`);
        }
    }

    async deleteNotificationChannel(resourceId: string): Promise<void> {
        try {
            await this.queryDB(db => {
                return db.delete(googleNotificationChannelsTable).where(eq(googleNotificationChannelsTable.resource_id, resourceId));
            })
        } catch (e) {
            throw new DatabaseError(`Failed to delete google notification channel by id: ${e}`);
        }
    }
}