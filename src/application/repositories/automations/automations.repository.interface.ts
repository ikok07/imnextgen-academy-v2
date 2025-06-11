import {Automation, AutomationType} from "@/drizzle/schema/automations";

export interface IAutomationsRepository {
    getAutomation(type: AutomationType): Promise<Automation>
}