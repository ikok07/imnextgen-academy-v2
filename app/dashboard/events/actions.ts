"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {addMinutes} from "date-fns";
import {MeetingSignedUpUserInsert} from "@/drizzle/schema/meeting_signed_up_users";
import {
   RemoveSignedUpUserOptions
} from "@/src/application/repositories/meetings/meeting-signed-up-users.repository.interface";
import {UserSpecificMeeting} from "@/drizzle/schema/user_specific_meetings";
import {FullMeeting, FullRegularMeeting} from "@/src/entities/models/meetings/full-meeting";

export const getFullMeetingById = createServerAction((id: string | undefined) => {
   return getInjection("IGetFullRegularMeetingByIdController")({
      type: "single",
      id
   });
});

export const getFullMeetingsForDate = createServerAction(async (timestamp: number, timezoneOffsetMin: number, userId: string, userEmail: string) => {
   const date = new Date(timestamp);
   const dayOfWeek = addMinutes(date, -timezoneOffsetMin).getDay();

   const regularMeetingIdsSet = new Set<string>();
   const specificMeetings: UserSpecificMeeting[] = [];

   (await getInjection("IGetMeetingsByRepeatingDayOfWeekController")(dayOfWeek))
       .forEach(v => {
          if (!v.valid_until || v.valid_until > Date.now() / 1000) {
             regularMeetingIdsSet.add(v.meeting_id);
             return;
          }
       });

   (await getInjection("IGetMeetingDatesByStartDateController")(timestamp, -timezoneOffsetMin))
       .forEach(v => regularMeetingIdsSet.add(v.meeting_id));

   if (regularMeetingIdsSet.size > 0) {
      (await getInjection("IGetMultipleMeetingsExcludedDatesForDateController")(Array.from(regularMeetingIdsSet), timestamp, -timezoneOffsetMin))
          .forEach(v => regularMeetingIdsSet.delete(v.meeting_id));
   }

   specificMeetings.concat(await getInjection("IGetSpecificMeetingsByUserIdController")({
      userId: userId,
      startDate: timestamp,
      timezoneOffsetMin: -timezoneOffsetMin
   }));

   const regularFullMeetings = await getInjection("IGetFullRegularMeetingByIdController")({
      type: "multiple",
      ids: Array.from(regularMeetingIdsSet),
      userEmail
   }) as FullRegularMeeting[];

   const specificFullMeetings = await getInjection("IGetFullSpecificMeetingByUserIdController")({
      userId,
      startDate: timestamp,
      timezoneOffsetMin: -timezoneOffsetMin
   });

   return [...regularFullMeetings, ...specificFullMeetings] as FullMeeting[];
});

export const checkUserSignedUpForMeeting = createServerAction(async (email: string, meetingId: string, startDate: number) => {
   const res = await getInjection("IGetSignedUpUserForMeetingController")({
      email,
      meeting_id: meetingId,
      start_date: startDate
   });

   return !!res;
});

export const addSignedUpUser = createServerAction((data: Partial<MeetingSignedUpUserInsert>) => {
   return getInjection("IAddSignedUpUserController")(data);
});

export const removeSignedUpUser = createServerAction((opts: Partial<RemoveSignedUpUserOptions>) => {
   return getInjection("IRemoveSignedUpUserController")(opts);
})