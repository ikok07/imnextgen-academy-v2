"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";
import {FullMeeting} from "@/drizzle/schema/meetings";

export const getFullMeetingById = createServerAction((id: string | undefined) => {
   return getInjection("IGetFullMeetingByIdController")({
      type: "single",
      id
   });
});

export const getFullMeetingsForDate = createServerAction(async (timestamp: number) => {
   const date = new Date(timestamp);
   const dayOfWeek = date.getDay();

   const meetingIdsSet = new Set<string>();

   (await getInjection("IGetMeetingsByRepeatingDayOfWeekController")(dayOfWeek))
       .forEach(v => {
          console.log(v);
          if (!v.valid_until || v.valid_until > Date.now() / 1000) {
             meetingIdsSet.add(v.meeting_id);
             return;
          }
       });

   (await getInjection("IGetMeetingDatesByStartDateController")(timestamp))
       .forEach(v => meetingIdsSet.add(v.meeting_id));

   if (meetingIdsSet.size > 0) {
      (await getInjection("IGetMultipleMeetingsExcludedDatesForDateController")(Array.from(meetingIdsSet), timestamp))
          .forEach(v => {
             console.log(v);
             meetingIdsSet.delete(v.meeting_id);
          });
   }

   return await getInjection("IGetFullMeetingByIdController")({
      type: "multiple",
      ids: Array.from(meetingIdsSet)
   }) as FullMeeting[];
})