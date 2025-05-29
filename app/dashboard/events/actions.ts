"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {FullMeeting} from "@/drizzle/schema/meetings";
import {addMinutes} from "date-fns";
import {MeetingSignedUpUserInsert} from "@/drizzle/schema/meeting_signed_up_users";
import {
   RemoveSignedUpUserOptions
} from "@/src/application/repositories/meetings/meeting-signed-up-users.repository.interface";

export const getFullMeetingById = createServerAction((id: string | undefined) => {
   return getInjection("IGetFullMeetingByIdController")({
      type: "single",
      id
   });
});

export const getFullMeetingsForDate = createServerAction(async (timestamp: number, timezoneOffsetMin: number, userEmail: string) => {
   const date = new Date(timestamp);
   const dayOfWeek = addMinutes(date, -timezoneOffsetMin).getDay();

   const meetingIdsSet = new Set<string>();

   (await getInjection("IGetMeetingsByRepeatingDayOfWeekController")(dayOfWeek))
       .forEach(v => {
          if (!v.valid_until || v.valid_until > Date.now() / 1000) {
             meetingIdsSet.add(v.meeting_id);
             return;
          }
       });

   (await getInjection("IGetMeetingDatesByStartDateController")(timestamp, -timezoneOffsetMin))
       .forEach(v => meetingIdsSet.add(v.meeting_id));

   if (meetingIdsSet.size > 0) {
      (await getInjection("IGetMultipleMeetingsExcludedDatesForDateController")(Array.from(meetingIdsSet), timestamp, -timezoneOffsetMin))
          .forEach(v => meetingIdsSet.delete(v.meeting_id));
   }

   return await getInjection("IGetFullMeetingByIdController")({
      type: "multiple",
      ids: Array.from(meetingIdsSet),
      userEmail
   }) as FullMeeting[];
});

export const checkUserSignedUpForMeeting = createServerAction(async (email: string, meetingId: string, startDate: number) => {
   const res = await getInjection("IGetSignedUpUserForMeetingController")({
      email,
      meeting_id: meetingId,
      start_date: startDate / 1000,
   });

   return !!res;
});

export const addSignedUpUser = createServerAction((data: Partial<MeetingSignedUpUserInsert>) => {
   return getInjection("IAddSignedUpUserController")(data);
});

export const removeSignedUpUser = createServerAction((opts: Partial<RemoveSignedUpUserOptions>) => {
   return getInjection("IRemoveSignedUpUserController")(opts);
})