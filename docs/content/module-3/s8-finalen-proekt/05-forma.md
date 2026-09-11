---
module: "Модул 3: React & NextJS"
section: "Финален проект"
sectionOrder: 8
title: "Форма за публикуване със Server Action"
label: "react-8-05-form"
---

Формата е мястото, където приложението спира да бъде витрина и започва да приема данни. Значи и мястото, където проверките са задължителни.

```javascript
// app/actions/jobs.js
"use server";

import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";
import {createJob} from "@/lib/db";
import {validateJob} from "@/lib/validation";
import {slugify} from "@/lib/slug";
import {getCurrentUser} from "@/lib/auth";

export async function publishJob(previousState, formData) {
  const user = await getCurrentUser();
  if (!user) return {errors: {form: "Трябва да си влязъл, за да публикуваш."}};

  const data = {
    title: formData.get("title"),
    company: formData.get("company"),
    city: formData.get("city"),
    type: formData.get("type"),
    category: formData.get("category"),
    salaryMin: formData.get("salaryMin"),
    salaryMax: formData.get("salaryMax"),
    description: formData.get("description"),
    email: formData.get("email")
  };

  const {valid, errors} = validateJob(data);
  if (!valid) return {errors, values: data};

  const job = await createJob({
    ...data,
    slug: slugify(`${data.title}-${data.city}`),
    authorId: user.id,
    published: true
  });

  revalidatePath("/jobs");
  redirect(`/jobs/${job.slug}`);
}
```

```steps
{"title":"Редът е важен"}
---
**Първо правата.** Има ли изобщо право този човек да публикува?
---
**После данните.** Проверката се прави на сървъра, не в браузъра.
---
**При грешка** се връщат и грешките, и въведените стойности — за да не пише потребителят всичко наново.
---
**След запис** се обявява списъкът за неактуален и се пренасочва към новата обява.
```

## Формата

```javascript
// components/jobs/JobForm.jsx
"use client";

import {useActionState} from "react";
import {useFormStatus} from "react-dom";
import {publishJob} from "@/app/actions/jobs";
import {CITIES, CATEGORIES, JOB_TYPES} from "@/lib/constants";

function SubmitButton() {
  const {pending} = useFormStatus();

  return (
    <button
      disabled={pending}
      className="rounded-lg bg-violet-600 px-5 py-2.5 font-medium text-white disabled:opacity-50"
    >
      {pending ? "Публикувам..." : "Публикувай обявата"}
    </button>
  );
}

export default function JobForm() {
  const [state, formAction] = useActionState(publishJob, null);
  const errors = state?.errors ?? {};
  const values = state?.values ?? {};

  return (
    <form action={formAction} className="space-y-4">
      {errors.form && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{errors.form}</p>
      )}

      <div>
        <label className="block text-sm font-medium">Заглавие</label>
        <input
          name="title"
          defaultValue={values.title}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
        />
        {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Град</label>
        <select name="city" defaultValue={values.city} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2">
          <option value="">Избери</option>
          {CITIES.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
        {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Описание</label>
        <textarea
          name="description"
          rows={8}
          defaultValue={values.description}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2"
        />
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
      </div>

      <SubmitButton />
    </form>
  );
}
```

```callout
{"type":"tip","title":"defaultValue, не value"}
---
Полетата тук не са контролирани: `FormData` чете стойностите при изпращане. `defaultValue` служи само за да ги върне попълнени след неуспешна проверка. Така формата остава проста и работи дори без JavaScript.
```

```callout
{"type":"danger","title":"Проверката в браузъра не е проверка"}
---
`required`, `minLength` и всеки клиентски код се заобикалят за секунди. Server Action-ът е публична крайна точка — данните минават през `validateJob` **на сървъра**, винаги.
```

## Пренасочването не се хваща в try/catch

```javascript
// грешно - redirect хвърля вътрешно изключение, което catch поглъща
try {
  await createJob(data);
  redirect("/jobs");
} catch (error) {
  return {errors: {form: "Нещо се обърка"}};
}
```

`redirect()` работи, като хвърля специално изключение, което Next хваща. Сложиш ли го в `try`, твоят `catch` го поглъща и пренасочването не се случва. Пренасочването върви след блока.

```quiz
{"id":"react-8-05-q1","question":"Защо при грешка действието връща и въведените стойности?","options":["За проследяване","За да не пише потребителят всичко наново","Изисква се от useActionState","За кеша"],"answer":1,"explanation":"Формата не е контролирана — след изпращане полетата се връщат празни, ако не им подадеш обратно стойностите."}
```

```quiz
{"id":"react-8-05-q2","question":"Какво се случва, ако сложиш `redirect()` в блок try/catch?","options":["Нищо особено","catch поглъща вътрешното изключение и пренасочването не се случва","Страницата се презарежда","Грешка при сглобяване"],"answer":1,"explanation":"`redirect` сигнализира чрез изключение. То трябва да стигне до Next, затова повикването стои извън `try`."}
```

```takeaways
- Действието проверява първо правата, после данните — и двете на сървъра.
- При грешка се връщат и съобщенията, и въведените стойности.
- `useFormStatus` заключва бутона по време на изпращане.
- `redirect()` никога не стои в `try/catch`.
