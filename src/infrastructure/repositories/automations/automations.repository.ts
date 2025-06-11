import {BaseRepository} from "@/src/infrastructure/repositories/base-class.repository";
import {IAutomationsRepository} from "@/src/application/repositories/automations/automations.repository.interface";
import {AutomationType, Automation, automationsTable} from "@/drizzle/schema/automations";
import { DatabaseError } from "@/src/entities/errors/db/database";
import { eq } from "drizzle-orm";

export class AutomationsRepository extends BaseRepository implements IAutomationsRepository {
    getAutomation(type: AutomationType): Promise<Automation> {
        try {
            return this.queryDB(async db => {
                const res = await db.query.automationsTable.findFirst({where: eq(automationsTable.type, type)});
                if (!res) throw new Error("Automation not found!");
                return res;
            })
        } catch (e) {
            throw new DatabaseError(`Failed to get automation! ${e}`);
        }
    }
}