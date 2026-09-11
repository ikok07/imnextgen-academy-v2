---
module: "Модул 3: React & NextJS"
section: "Финален проект"
sectionOrder: 8
title: "Страница на обявата"
label: "react-8-04-detail"
---

Тук се събират динамичният маршрут, метаданните, 404 и предварителното сглобяване.

```javascript
// app/(public)/jobs/[slug]/page.jsx
import {notFound} from "next/navigation";
import {getJobBySlug, getJobs} from "@/lib/db";
import Badge from "@/components/ui/Badge";

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map(job => ({slug: job.slug}));
}

export async function generateMetadata({params}) {
  const {slug} = await params;
  const job = await getJobBySlug(slug);

  if (!job) return {title: "Обявата не е намерена"};

  return {
    title: `${job.title} – ${job.company}`,
    description: job.description.slice(0, 155),
    openGraph: {
      title: `${job.title} – ${job.company}`,
      description: job.description.slice(0, 155),
      type: "article"
    }
  };
}

export default async function JobPage({params}) {
  const {slug} = await params;
  const job = await getJobBySlug(slug);

  if (!job) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
          <p className="mt-1 text-gray-600">{job.company} · {job.city}</p>
        </div>
        <Badge>{job.type}</Badge>
      </div>

      {job.salaryMin && (
        <p className="mt-4 text-lg font-semibold">{job.salaryMin}–{job.salaryMax} лв.</p>
      )}

      <div className="mt-6 whitespace-pre-wrap leading-relaxed text-gray-800">
        {job.description}
      </div>

      <a
        href={`mailto:${job.email}?subject=${encodeURIComponent("Кандидатура: " + job.title)}`}
        className="mt-8 inline-block rounded-lg bg-violet-600 px-5 py-2.5 font-medium text-white hover:bg-violet-700"
      >
        Кандидатствай
      </a>
    </article>
  );
}
```

```steps
{"title":"Какво прави всяка част"}
---
`generateStaticParams` рисува предварително всички обяви — страницата се раздава като готов файл.
---
`generateMetadata` дава на всяка обява собствено заглавие и описание за Google и за споделяне.
---
`notFound()` показва `not-found.jsx` с честен 404, вместо празна страница.
---
`whitespace-pre-wrap` запазва новите редове от текста на обявата, без да се ползва опасният `dangerouslySetInnerHTML`.
```

## 404 страницата

```javascript
// app/(public)/jobs/[slug]/not-found.jsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h2 className="text-xl font-semibold">Обявата не е намерена</h2>
      <p className="mt-2 text-gray-600">Може да е изтекла или да е премахната.</p>
      <Link href="/jobs" className="mt-6 inline-block text-violet-600">
        Виж всички обяви
      </Link>
    </div>
  );
}
```

```callout
{"type":"danger","title":"Никога dangerouslySetInnerHTML за чужд текст"}
---
Описанието е писано от потребител. Вкараш ли го като HTML, някой ще вкара `<script>` и ще краде сесии на посетителите. Ако наистина ти трябва форматиран текст, ползвай Markdown с изчистване на съдържанието — но не и суров HTML.
```

## Свързани обяви

```javascript
async function RelatedJobs({category, currentSlug}) {
  const jobs = await getJobs({category});
  const related = jobs.filter(job => job.slug !== currentSlug).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 border-t pt-6">
      <h2 className="mb-3 font-semibold">Подобни обяви</h2>
      <div className="space-y-2">
        {related.map(job => <JobCard key={job.id} job={job} />)}
      </div>
    </section>
  );
}
```

Сървърен компонент, който си взима собствените данни. Не му трябва нищо от родителя освен категорията.

```quiz
{"id":"react-8-04-q1","question":"Какво прави `generateStaticParams` за тази страница?","options":["Взима параметрите при заявка","Казва на Next да нарисува предварително страниците на всички обяви","Проверява дали обявата съществува","Генерира метаданните"],"answer":1,"explanation":"Връща списъка с адреси. При сглобяване Next рисува всеки от тях и после ги раздава като готов HTML."}
```

```quiz
{"id":"react-8-04-q2","question":"Защо описанието не се вкарва с `dangerouslySetInnerHTML`?","options":["Работи по-бавно","Текстът е от потребител — това отваря дупка за вграден скрипт","Не поддържа кирилица","Не изглежда добре"],"answer":1,"explanation":"Вмъкването на чужд HTML позволява изпълнение на скрипт в браузъра на всеки посетител. За нови редове стига `whitespace-pre-wrap`."}
```

```takeaways
- Динамичната страница събира `params`, метаданни, 404 и предварително сглобяване.
- `whitespace-pre-wrap` запазва форматирането без опасен HTML.
- Текст от потребител никога не се вкарва като HTML.
- Свързаните обяви са отделен сървърен компонент със собствени данни.
