---
module: "Модул 3: React & NextJS"
section: "Финален проект"
sectionOrder: 7
title: "Списък с обяви и филтри"
label: "react-8-03-list"
---

Списъкът е сърцето на проекта. Правим го сървърен, а филтрите живеят в адреса.

```javascript
// app/(public)/jobs/page.jsx
import {getJobs} from "@/lib/db";
import JobCard from "@/components/jobs/JobCard";
import JobFilters from "@/components/jobs/JobFilters";

export const metadata = {
  title: "Обяви за работа",
  description: "Актуални обяви за работа в ИТ сектора в България."
};

export default async function JobsPage({searchParams}) {
  const {query, city, category, type} = await searchParams;
  const jobs = await getJobs({query, city, category, type});

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold">Обяви за работа</h1>

      <JobFilters />

      <p className="mt-4 text-sm text-gray-500">
        {jobs.length === 0 ? "Няма съвпадения" : `${jobs.length} обяви`}
      </p>

      {jobs.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-gray-300 p-10 text-center">
          <p className="text-gray-600">Нищо не съвпада с търсенето.</p>
          <p className="mt-1 text-sm text-gray-500">Опитай с по-малко филтри.</p>
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {jobs.map(job => <JobCard key={job.id} job={job} />)}
        </div>
      )}
    </div>
  );
}
```

Страницата е сървърна: данните пристигат преди HTML-а. Няма `useEffect`, няма индикатор за зареждане вътре в компонента.

## Картата

```javascript
// components/jobs/JobCard.jsx
import Link from "next/link";
import Badge from "@/components/ui/Badge";

export default function JobCard({job}) {
  return (
    <Link
      href={`/jobs/${job.slug}`}
      className="block rounded-lg border border-gray-200 p-4 transition hover:border-violet-400 hover:shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-gray-900">{job.title}</h2>
          <p className="text-sm text-gray-600">{job.company} · {job.city}</p>
        </div>
        <Badge>{job.type}</Badge>
      </div>

      {job.salaryMin && (
        <p className="mt-2 text-sm font-medium text-gray-700">
          {job.salaryMin}–{job.salaryMax} лв.
        </p>
      )}
    </Link>
  );
}
```

Цялата карта е връзка. Няма отделен бутон „виж още" — цялата повърхност е кликаема, което е по-удобно и на телефон.

## Филтрите

Филтрите имат нужда от състояние и събития, значи са клиентски. Но резултатът от филтрирането остава сървърен — в адреса.

```javascript
// components/jobs/JobFilters.jsx
"use client";

import {useRouter, useSearchParams, usePathname} from "next/navigation";
import {CITIES, CATEGORIES, JOB_TYPES} from "@/lib/constants";

export default function JobFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function update(key, value) {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <input
        defaultValue={searchParams.get("query") ?? ""}
        onChange={event => update("query", event.target.value)}
        placeholder="Търси по заглавие"
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
      />

      <select
        value={searchParams.get("city") ?? ""}
        onChange={event => update("city", event.target.value)}
        className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
      >
        <option value="">Всички градове</option>
        {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
      </select>

      {searchParams.size > 0 && (
        <button onClick={() => router.push(pathname)} className="text-sm text-violet-600">
          Изчисти
        </button>
      )}
    </div>
  );
}
```

```callout
{"type":"warn","title":"Забавяне при писането"}
---
Кодът горе праща нов адрес при всяка буква. Добави забавяне — или собствен `useDebounce`, или изпращане при `Enter` и при напускане на полето. Иначе сървърът рисува страницата по десет пъти на дума.
```

```callout
{"type":"tip","title":"Защо филтрите не са в useState"}
---
Защото тогава линкът „обяви за React в София" няма да може да се сподели, презареждането ще ги загуби, а бутонът „назад" няма да върне предишния филтър. В адреса решаваш и трите наведнъж.
```

## Скелет при смяна на филтъра

```javascript
// app/(public)/jobs/loading.jsx
export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl space-y-3 px-4 py-8">
      {[1, 2, 3, 4].map(n => (
        <div key={n} className="h-24 animate-pulse rounded-lg bg-gray-100" />
      ))}
    </div>
  );
}
```

```quiz
{"id":"react-8-03-q1","question":"Защо `JobFilters` е клиентски, а списъкът остава сървърен?","options":["Заради стиловете","Филтрите имат състояние и събития; списъкът само показва данни, дошли от адреса","Защото Next го изисква","Списъкът също трябва да е клиентски"],"answer":1,"explanation":"Интерактивната част е малка и стои ниско в дървото. Резултатът от нея минава през адреса и се рисува на сървъра."}
```

```quiz
{"id":"react-8-03-q2","question":"Какъв е проблемът на филтър, който праща нов адрес при всяка буква?","options":["Не работи","Сървърът рисува страницата при всяка буква","Адресът става твърде дълъг","Няма проблем"],"answer":1,"explanation":"Всяка буква е нова навигация и ново рисуване. Решението е забавяне или изпращане при Enter и при напускане на полето."}
```

```takeaways
- Списъкът е сървърен и чете филтрите от `searchParams`.
- Цялата карта е връзка — по-удобно, особено на телефон.
- Филтрите са клиентски, но пишат в адреса, а не в състояние.
- Полето за търсене задължително има забавяне.
