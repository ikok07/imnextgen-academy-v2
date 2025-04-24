"use server"

import {createServerAction} from "@/app/_utils/createServerAction";
import {getInjection} from "@/di/container";

export const getFullMeetingById = createServerAction((id: string | undefined) => {
   return getInjection("IGetFullMeetingByIdController")(id);
});

export const getMeetingsForDate = createServerAction(async (timestamp: number) => {
   const date = new Date(timestamp);
   const dayOfWeek = date.getDay();

   const meetingIdsSet = new Set<string>();

   (await getInjection("IGetMeetingsByRepeatingDayOfWeekController")(dayOfWeek))
       .forEach(v => meetingIdsSet.add(v.meeting_id));

   (await getInjection("IGetMeetingDatesByStartDateController")(timestamp))
       .forEach(v => meetingIdsSet.add(v.meeting_id));

   (await getInjection("IGetMultipleMeetingsExcludedDatesForDateController")(Array.from(meetingIdsSet), timestamp))
       .forEach(v => meetingIdsSet.delete(v.meeting_id));

   console.log(meetingIdsSet);

})