---
module: "Модул 3: React & NextJS"
section: "Финален проект"
sectionOrder: 8
title: "Вход и защитена част"
label: "react-8-06-auth"
---

Автентикацията е тема за отделен курс. Тук ти трябва достатъчно, за да имаш работеща защитена част — и достатъчно разбиране, за да не направиш опасна грешка.

## Не пиши свой вход

```callout
{"type":"danger","title":"Правило без изключения"}
---
Собствена система за пароли значи: хеширане, соли, защита срещу повторни опити, възстановяване на парола, потвърждение на имейл, управление на сесии, изтичане на токени. Един пропуск и данните на потребителите изтичат. Ползва се готово решение.
```

| Решение | Кога |
| --- | --- |
| **Clerk** | най-бързо за стартиране, готови екрани, безплатно до няколко хиляди потребители |
| **Auth.js (NextAuth)** | безплатно и с пълен контрол, но повече настройка |
| **Supabase Auth** | ако вече ползваш Supabase за база |

За финалния проект всяко от трите става. Документацията им е за 20 минути.

## Трите места, където се проверява

```steps
---
**В изгледа** на защитената група — за пренасочване на непознати посетители.
---
**Във всяко Server Action**, което променя нещо — то е публична крайна точка.
---
**Във всеки Route Handler**, който променя нещо — по същата причина.
```

```javascript
// app/(protected)/layout.jsx
import {redirect} from "next/navigation";
import {getCurrentUser} from "@/lib/auth";

export default async function ProtectedLayout({children}) {
  const user = await getCurrentUser();

  if (!user) redirect("/login");

  return (
    <div>
      <aside>
        <p>{user.name}</p>
        <nav>меню на панела</nav>
      </aside>
      <main>{children}</main>
    </div>
  );
}
```

Проверката е на сървъра, преди HTML-ът да тръгне. За разлика от защитения маршрут в React Router, тук защитеното съдържание **никога не стига** до браузъра на непознат посетител.

```callout
{"type":"warn","title":"Изгледът не пази действията"}
---
Проверката в `layout.jsx` спира навигацията, но не и някой, който извика Server Action директно. Всяко действие проверява потребителя само за себе си.
```

## Чий е записът

```javascript
"use server";

export async function deleteJob(jobId) {
  const user = await getCurrentUser();
  if (!user) return {error: "Не си влязъл."};

  const job = await getJobById(jobId);
  if (!job) return {error: "Няма такава обява."};

  if (job.authorId !== user.id && user.role !== "admin") {
    return {error: "Това не е твоя обява."};
  }

  await removeJob(jobId);
  revalidatePath("/dashboard");
  return {success: true};
}
```

Двете проверки са различни: **влязъл ли е** и **негово ли е**. Пропускането на втората значи, че всеки влязъл потребител може да трие чуждите обяви, като подаде чуждо id.

## Моите обяви

```javascript
// app/(protected)/dashboard/page.jsx
import {getCurrentUser} from "@/lib/auth";
import {getJobsByAuthor} from "@/lib/db";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const jobs = await getJobsByAuthor(user.id);

  return (
    <div>
      <h1 className="text-xl font-bold">Моите обяви</h1>

      {jobs.length === 0 ? (
        <p className="mt-4 text-gray-600">Още нямаш публикувани обяви.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {jobs.map(job => (
            <li key={job.id} className="flex items-center justify-between rounded-lg border p-3">
              <span>{job.title}</span>
              <DeleteJobButton jobId={job.id} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

Заявката пита за обявите **на този потребител**, а не филтрира всички обяви в браузъра. Разликата е между приложение, което пази данни, и приложение, което ги показва на грешния човек.

```quiz
{"id":"react-8-06-q1","question":"Достатъчна ли е проверката в layout на защитената група?","options":["Да, покрива всичко отдолу","Не — Server Actions и Route Handlers се викат директно и проверяват сами","Да, ако има и middleware","Зависи от доставчика"],"answer":1,"explanation":"Изгледът пази навигацията. Действията и API адресите са отделни входове към приложението и всеки проверява за себе си."}
```

```quiz
{"id":"react-8-06-q2","question":"Кои са двете отделни проверки при триене на обява?","options":["Влязъл ли е и има ли интернет","Влязъл ли е и негова ли е обявата","Админ ли е и потвърдил ли е","Валиден ли е id и съществува ли обявата"],"answer":1,"explanation":"Самоличност и право върху конкретния запис. Без втората всеки влязъл потребител може да трие чужди обяви."}
```

```takeaways
- Готово решение за вход — Clerk, Auth.js или Supabase. Не собствено.
- Проверка в изгледа, във всяко действие и във всеки API адрес.
- Самоличност и право върху записа са две различни проверки.
- Заявката пита за данните на потребителя, вместо да филтрира всички в браузъра.
