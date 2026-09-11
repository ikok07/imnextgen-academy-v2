---
module: "Модул 3: React & NextJS"
section: "Next.js: App Router"
sectionOrder: 6
title: "Route Handlers: истинско API"
label: "react-7-08-route-handlers"
---

Server Actions обслужват твоя интерфейс. Когато данните трябват на някой отвън — мобилно приложение, партньор, друга услуга — нужен е обикновен HTTP адрес. Това е `route.js`.

```javascript
// app/api/courses/route.js
import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export async function GET(request) {
  const {searchParams} = new URL(request.url);
  const level = searchParams.get("level");

  const courses = await db.course.findMany({
    where: level ? {level} : undefined
  });

  return NextResponse.json(courses);
}

export async function POST(request) {
  const body = await request.json();

  if (!body.title) {
    return NextResponse.json({error: "Липсва заглавие"}, {status: 400});
  }

  const course = await db.course.create({data: body});
  return NextResponse.json(course, {status: 201});
}
```

Файлът `app/api/courses/route.js` става адрес `/api/courses`. Изнасяш по една функция за всеки метод: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.

```callout
{"type":"danger","title":"page.jsx и route.js не живеят в една папка"}
---
Адресът е или страница, или API — не и двете. Сложиш ли ги заедно, Next отказва да сглоби проекта.
```

## Динамичен адрес

```javascript
// app/api/courses/[id]/route.js
export async function GET(request, {params}) {
  const {id} = await params;
  const course = await db.course.findUnique({where: {id}});

  if (!course) {
    return NextResponse.json({error: "Няма такъв курс"}, {status: 404});
  }

  return NextResponse.json(course);
}

export async function DELETE(request, {params}) {
  const {id} = await params;
  await db.course.delete({where: {id}});

  return new NextResponse(null, {status: 204});
}
```

## Кога кое

| Случай | Инструмент |
| --- | --- |
| Форма в твоя сайт | Server Action |
| Бутон, който променя нещо | Server Action |
| Мобилно приложение иска данни | Route Handler |
| Webhook от Stripe или доставчик | Route Handler |
| Външен партньор ползва данните ти | Route Handler |
| Файл за сваляне, RSS, sitemap | Route Handler |

```callout
{"type":"warn","title":"Не викай собственото си API от сървърен компонент"}
---
`fetch("/api/courses")` вътре в сървърен компонент праща заявка на самия себе си по мрежата — бавно и безсмислено. Извикай функцията от базата направо. API-то е за външни потребители.
```

## Защита

```javascript
export async function POST(request) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({error: "Не си влязъл"}, {status: 401});
  }

  if (session.user.role !== "admin") {
    return NextResponse.json({error: "Нямаш права"}, {status: 403});
  }

  // ...
}
```

Route Handler-ът е отворен за целия интернет. Проверката на самоличност и права се прави във всяка функция, която променя нещо.

```callout
{"type":"info","title":"Webhook: суровото тяло"}
---
Webhook-ите от платежни доставчици се подписват и подписът се проверява върху **суровия** текст на заявката, не върху разчетения JSON. Затова там се чете `await request.text()`, а не `request.json()`.
```

```quiz
{"id":"react-7-08-q1","question":"Кога Route Handler е по-правилен от Server Action?","options":["Винаги","Когато данните трябват на външен потребител - мобилно приложение, партньор, webhook","При форми","Когато има база данни"],"answer":1,"explanation":"Server Actions са за собствения интерфейс. Публичното API е за всичко, което не е твоят React код."}
```

```quiz
{"id":"react-7-08-q2","question":"Може ли `page.jsx` и `route.js` да са в една и съща папка?","options":["Да","Не - адресът е или страница, или API","Да, ако имат различни имена","Само в режим на разработка"],"answer":1,"explanation":"Един адрес има един отговор. Next отказва да сглоби проект с такъв конфликт."}
```

```takeaways
- `route.js` прави обикновен HTTP адрес; изнасяш функция за всеки метод.
- Server Actions са за твоя интерфейс, Route Handlers — за външния свят.
- Не викай собственото си API от сървърен компонент.
- Всяка променяща функция проверява самоличност и права.
