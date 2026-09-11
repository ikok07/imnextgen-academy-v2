---
module: "Модул 3: React & NextJS"
section: "Next.js: App Router"
sectionOrder: 7
title: "loading, error и not-found"
label: "react-7-05-states"
---

Четирите състояния от секция 4 ги има и тук — но вместо да ги пишеш с `if`, ги слагаш като файлове до страницата.

## loading.jsx

```javascript
// app/courses/loading.jsx
export default function Loading() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map(n => (
        <div key={n} className="h-20 animate-pulse rounded-lg bg-gray-100" />
      ))}
    </div>
  );
}
```

Появи ли се този файл, Next показва съдържанието му, докато `page.jsx` чака данните си. Изгледът, менюто и всичко извън страницата остават видими — сменя се само вътрешността.

```callout
{"type":"info","title":"Отдолу е Suspense"}
---
`loading.jsx` е удобство върху React Suspense. Ако ти трябва по-фин контрол — например отделни скелети за отделни части на страницата — ползваш `<Suspense fallback={...}>` направо около всеки бавен компонент.
```

```javascript
import {Suspense} from "react";

export default function Page() {
  return (
    <div>
      <h1>Табло</h1>

      <Suspense fallback={<StatsSkeleton />}>
        <Stats />           {/* бавен - има си свой скелет */}
      </Suspense>

      <Suspense fallback={<OrdersSkeleton />}>
        <RecentOrders />    {/* показва се, щом е готов */}
      </Suspense>
    </div>
  );
}
```

Бързата част се появява веднага, бавната — когато пристигне. Потребителят не чака най-бавната заявка, за да види нещо.

## error.jsx

```javascript
// app/courses/error.jsx
"use client";

export default function Error({error, reset}) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
      <h2 className="font-semibold text-red-800">Нещо се обърка</h2>
      <p className="mt-1 text-sm text-red-700">{error.message}</p>
      <button onClick={reset} className="mt-3 rounded bg-red-600 px-3 py-1.5 text-sm text-white">
        Опитай пак
      </button>
    </div>
  );
}
```

```steps
---
Файлът е **винаги клиентски** — има бутон, значи има интерактивност.
---
`reset` опитва да нарисува повторно частта, която е гръмнала.
---
Грешката се хваща само за тази част от дървото. Останалото продължава да работи.
---
`error.jsx` не хваща грешки в изгледа на същото ниво — за тях има `global-error.jsx`.
```

## not-found.jsx

```javascript
// app/courses/[slug]/page.jsx
import {notFound} from "next/navigation";

export default async function CoursePage({params}) {
  const {slug} = await params;
  const course = await getCourse(slug);

  if (!course) notFound();

  return <CourseDetail course={course} />;
}
```

```javascript
// app/courses/[slug]/not-found.jsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Няма такъв курс</h2>
      <Link href="/courses">Виж всички курсове</Link>
    </div>
  );
}
```

Извикването на `notFound()` спира рисуването и показва най-близкия `not-found.jsx` с код 404 — правилният отговор и за потребителя, и за търсачките.

```callout
{"type":"warn","title":"params вече е обещание"}
---
От Next 15 нататък `params` и `searchParams` са асинхронни: `const {slug} = await params;`. По-старите примери в интернет ги четат направо и няма да работят. Ако видиш `params.slug` без `await` — статията е за стара версия.
```

## Празното състояние остава твоя работа

```javascript
export default async function CoursesPage() {
  const courses = await getCourses();

  if (courses.length === 0) {
    return (
      <div className="py-12 text-center text-gray-500">
        <p>Още няма курсове.</p>
        <Link href="/courses/new" className="text-violet-600">Създай първия</Link>
      </div>
    );
  }

  return <CourseList courses={courses} />;
}
```

Next покрива зареждането, грешката и липсващата страница. Празният резултат не е грешка — той си остава обикновено условие в кода ти.

```quiz
{"id":"react-7-05-q1","question":"Защо `error.jsx` трябва да е клиентски компонент?","options":["Защото грешките стават в браузъра","Защото има бутон и състояние — трябва интерактивност","Заради Suspense","Не е задължително"],"answer":1,"explanation":"Компонентът за грешка показва бутон за повторен опит и получава функция `reset`. Това изисква изпълнение в браузъра."}
```

```quiz
{"id":"react-7-05-q2","question":"Какво прави `notFound()` от `next/navigation`?","options":["Пренасочва към началната страница","Спира рисуването и показва най-близкия not-found.jsx с код 404","Хвърля грешка в конзолата","Връща null"],"answer":1,"explanation":"Точно това е правилният отговор при несъществуващ запис — и за потребителя, и за търсачките, които виждат честен 404."}
```

```takeaways
- `loading.jsx` показва скелет, докато страницата чака данни; `Suspense` дава по-фин контрол.
- `error.jsx` е клиентски, получава `error` и `reset` и хваща грешките на своя клон.
- `notFound()` плюс `not-found.jsx` дават истински 404.
- Празното състояние си остава твое условие в кода.
