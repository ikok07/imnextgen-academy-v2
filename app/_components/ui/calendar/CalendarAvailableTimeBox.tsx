import {bg} from "date-fns/locale";
import {formatInTimeZone} from "date-fns-tz";

type CalendarAvailableTimeBoxProps = {
    date: number,
    selectedTime: number | null
    onClick: () => void
}

export default function CalendarAvailableTimeBox({date, selectedTime, onClick}: CalendarAvailableTimeBoxProps) {
    return <div
        className={`${selectedTime === date ? "bg-cta text-white" : ""} cursor-pointer hover:bg-cta hover:text-white border border-cta text-cta text-center rounded-md py-2 transition-all duration-200`}
        onClick={onClick}
    >
        {formatInTimeZone(date, "Europe/Sofia", "HH:mm", {locale: bg})}
    </div>
}