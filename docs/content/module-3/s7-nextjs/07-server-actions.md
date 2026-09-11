---
module: "Модул 3: React & NextJS"
section: "Next.js: App Router"
sectionOrder: 7
title: "Server Actions: форми без API"
label: "react-7-07-actions"
---

Обичайният път за изпращане на форма: клиентско състояние → `fetch` към собствен API адрес → API-то пише в базата → обновяване на данните. Четири места за една операция.

Server Actions махат средата.

```javascript
// app/courses/actions.js
"use server";

import {db} from "@/lib/db";
import {revalidatePath} from "next/cache";

export async function createCourse(formData) {
  const title = formData.get("title");

  if (!title || title.length < 3) {
    return {error: "Заглавието трябва да е поне 3 знака."};
  }

  await db.course.create({data: {title}});
  revalidatePath("/courses");

  return {success: true};
}
```

```javascript
// app/courses/new/page.jsx
import {createCourse} from "../actions";

export default function NewCoursePage() {
  return (
    <form action={createCourse}>
      <input name="title" placeholder="Заглавие" />
      <button type="submit">Създай</button>
    </form>
  );
}
```

Функцията се изпълнява **на сървъра**, макар да е извикана от форма в браузъра. Няма API адрес, няма `fetch`, няма ръчно сериализиране.

```steps
{"title":"Правилата"}
---
`"use server"` най-горе във файла (или най-горе във функцията).
---
Функцията е винаги `async`.
---
Получава `FormData`; стойностите се четат с `formData.get("име")`.
---
Формата я получава през `action={функцията}`.
```

```callout
{"type":"danger","title":"Проверявай всичко на сървъра"}
---
Server Action е публична крайна точка. Всеки може да я извика с каквито си иска данни — `required` и `minLength` в HTML не спират никого. Проверката на данните и на правата е задължителна вътре в действието.
```

## Състояние на формата

```javascript
"use client";

import {useActionState} from "react";
import {useFormStatus} from "react-dom";
import {createCourse} from "./actions";

function SubmitButton() {
  const {pending} = useFormStatus();
  return <button disabled={pending}>{pending ? "Записвам..." : "Създай"}</button>;
}

export default function CourseForm() {
  const [state, formAction] = useActionState(createCourse, null);

  return (
    <form action={formAction}>
      <input name="title" placeholder="Заглавие" />
      {state?.error && <p className="text-red-600">{state.error}</p>}
      {state?.success && <p className="text-green-600">Готово.</p>}
      <SubmitButton />
    </form>
  );
}
```

```steps
---
`useActionState` пази това, което действието е върнало — грешки и съобщения.
---
`useFormStatus` дава `pending`, за да заключиш бутона, докато трае изпращането. Работи само в компонент **вътре** във формата.
---
Формата работи и без JavaScript: браузърът я изпраща по стария начин, а сървърът я обработва.
```

## Обновяване на данните

```javascript
import {revalidatePath, revalidateTag} from "next/cache";

revalidatePath("/courses");        // тази страница вече не е актуална
revalidateTag("courses");          // всички заявки с етикет "courses"
```

Без това записът влиза в базата, но страницата продължава да показва кеширания стар списък. Това е най-честият въпрос от рода на „защо не се обновява".

## Действие не само от форма

```javascript
"use client";

import {deleteCourse} from "./actions";

export default function DeleteButton({id}) {
  return (
    <button onClick={async () => {
      if (confirm("Сигурен ли си?")) await deleteCourse(id);
    }}>
      Изтрий
    </button>
  );
}
```

Server Action е обикновена асинхронна функция — може да се извика отвсякъде в клиентски компонент.

```callout
{"type":"tip","title":"Кога API адрес все пак трябва"}
---
Server Actions обслужват собствения ти интерфейс. Ако данните трябват на мобилно приложение, на външен партньор или на webhook от друга услуга — там е мястото на `route.js`, следващия урок.
```

```quiz
{"id":"react-7-07-q1","question":"Къде се изпълнява функция с `\"use server\"`?","options":["В браузъра","На сървъра, дори когато е извикана от клиентски компонент","И на двете места","При сглобяване"],"answer":1,"explanation":"Next създава скрита крайна точка и повикването от браузъра стига до сървъра. В браузъра не заминава нито ред от тялото на функцията."}
```

```quiz
{"id":"react-7-07-q2","question":"Записът мина, но списъкът показва старите данни. Какво липсва?","options":["`router.refresh()` в клиента","`revalidatePath` или `revalidateTag` в действието","Нов `fetch`","`useEffect`"],"answer":1,"explanation":"Страницата е кеширана. Действието трябва да каже кое вече не е актуално, за да бъде нарисувано наново."}
```

```takeaways
- Server Action е `async` функция с `"use server"`, която тече на сървъра.
- Формата я получава през `action`; данните идват като `FormData`.
- Проверката на данни и права е задължителна — действието е публична крайна точка.
- След запис задължително `revalidatePath` или `revalidateTag`.
