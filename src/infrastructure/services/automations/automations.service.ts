import {IAutomationsService, StartSalesMeetingOptions} from "@/src/application/services/automations/automations.service.interface";
import { DatabaseError } from "@/src/entities/errors/db/database";
import axios from "axios";

export class AutomationsService implements IAutomationsService {
    async startSalesMeetingAutomation({automationUrl, backendUrl, userId, firstName, email, hour, date, meetingUrl, meetingStartDateSeconds}: StartSalesMeetingOptions): Promise<void> {
        try {
            await axios.post(automationUrl, {
                backendUrl,
                userId,
                firstName,
                email,
                hour,
                date,
                meetingUrl,
                currentTimestamp: Math.floor(Date.now() / 1000),
                meetingTimestamp: meetingStartDateSeconds
            });
        } catch (e) {
            throw new DatabaseError(`Failed to start sales meeting automation! ${e}`);
        }
    }
}