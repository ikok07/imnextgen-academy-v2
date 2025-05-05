"use client"

import ErrorPageComponent from "@/app/_components/ErrorPageComponent";

export default function Error() {
    return <ErrorPageComponent
        heading="Нещо се обърка..."
        subheading="Възникна грешка"
        description={<>
            Ако проблемът не се решава след презареждане на страницата, може да се свържите с нас на <a href={process.env.NEXT_PUBLIC_CONTACT_EMAIL!} className="text-cta">{process.env.NEXT_PUBLIC_CONTACT_EMAIL!}</a>
        </>}
    />
}