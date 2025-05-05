"use client"

import ErrorPageComponent from "@/app/_components/ErrorPageComponent";

export default function Error() {
    return <ErrorPageComponent
        heading="Къде попадна?"
        subheading="Страницата не е намерена"
        description="За съжаление страницата, която търсиш не е налична. Може да се върнеш на началната страница."
    />
}