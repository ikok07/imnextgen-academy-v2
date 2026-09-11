---
module: "Модул 3: React & NextJS"
section: "Финален проект"
sectionOrder: 8
title: "Данни, достъп и проверки"
label: "react-8-02-data"
---

Един файл ще знае как се стига до данните. Всичко останало ще пита него.

```javascript
// lib/db.js
const JOBS = [
  {
    id: "1",
    slug: "frontend-razrabotchik-sofia",
    title: "Frontend разработчик",
    company: "Примерна ООД",
    city: "София",
    type: "пълен работен ден",
    category: "разработка",
    salaryMin: 3000,
    salaryMax: 4500,
    description: "Търсим разработчик с React...",
    createdAt: "2026-09-01",
    authorId: "u1",
    published: true
  }
  // още обяви
];

export async function getJobs({query, city, category, type} = {}) {
  return JOBS.filter(job => {
    if (!job.published) return false;
    if (query && !job.title.toLowerCase().includes(query.toLowerCase())) return false;
    if (city && job.city !== city) return false;
    if (category && job.category !== category) return false;
    if (type && job.type !== type) return false;
    return true;
  });
}

export async function getJobBySlug(slug) {
  return JOBS.find(job => job.slug === slug) ?? null;
}

export async function createJob(data) {
  const job = {...data, id: String(Date.now()), createdAt: new Date().toISOString()};
  JOBS.unshift(job);
  return job;
}
```

```callout
{"type":"tip","title":"Защо функциите са async от самото начало"}
---
Истинската база връща обещания. Ако още сега функциите са `async`, смяната на масива с Postgres или Supabase не изисква да пипаш нито един компонент.
```

## Адресът на обявата

```javascript
// lib/slug.js
const MAP = {
  а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ж: "zh", з: "z", и: "i",
  й: "y", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s",
  т: "t", у: "u", ф: "f", х: "h", ц: "ts", ч: "ch", ш: "sh", щ: "sht",
  ъ: "a", ь: "y", ю: "yu", я: "ya"
};

export function slugify(text) {
  return text
    .toLowerCase()
    .split("")
    .map(char => MAP[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
```

„Frontend разработчик София" става `frontend-razrabotchik-sofia` — четим адрес, който Google обича и хората разбират.

```callout
{"type":"warn","title":"Адресите трябва да са уникални"}
---
Две обяви с еднакво заглавие дават еднакъв адрес. Добави кратък суфикс при сблъсък: `frontend-razrabotchik-sofia-2`.
```

## Проверка на данните

```javascript
// lib/validation.js
export function validateJob(data) {
  const errors = {};

  if (!data.title || data.title.trim().length < 5) {
    errors.title = "Заглавието трябва да е поне 5 знака.";
  }
  if (!data.company || data.company.trim().length < 2) {
    errors.company = "Въведи име на компанията.";
  }
  if (!data.city) {
    errors.city = "Избери град.";
  }
  if (!data.description || data.description.trim().length < 50) {
    errors.description = "Описанието трябва да е поне 50 знака.";
  }
  if (data.salaryMin && data.salaryMax && Number(data.salaryMin) > Number(data.salaryMax)) {
    errors.salaryMax = "Горната граница не може да е под долната.";
  }

  return {valid: Object.keys(errors).length === 0, errors};
}
```

Една функция, която връща всички грешки наведнъж — а не спира на първата. Потребителят поправя всичко с едно минаване.

```callout
{"type":"info","title":"Zod в реален проект"}
---
Екипите ползват `zod` — библиотека, която описва схемата веднъж и проверява по нея. Тук пишем проверката на ръка, за да е ясно какво прави тя. В работата ще пишеш схема.
```

## Константите на едно място

```javascript
// lib/constants.js
export const CITIES = ["София", "Пловдив", "Варна", "Бургас", "Дистанционно"];
export const CATEGORIES = ["разработка", "дизайн", "маркетинг", "продажби"];
export const JOB_TYPES = ["пълен работен ден", "стаж", "на свободна практика"];
```

Оттук се пълнят падащите менюта, филтрите и проверките. Един източник — няма как менюто да предлага стойност, която проверката отхвърля.

```quiz
{"id":"react-8-02-q1","question":"Защо функциите за достъп до данни са `async` още докато данните са в масив?","options":["Изисква се от Next","За да не се пипат компонентите при смяна с истинска база","За по-бързо изпълнение","Без причина"],"answer":1,"explanation":"Истинската база връща обещания. С `async` от самото начало интерфейсът остава същият и смяната пипа само един файл."}
```

```quiz
{"id":"react-8-02-q2","question":"Защо проверката връща всички грешки наведнъж?","options":["По-лесно се пише","За да поправи потребителят всичко с едно минаване","Изисква се от Server Actions","За производителност"],"answer":1,"explanation":"Спирането на първата грешка кара потребителя да изпраща формата по пет пъти — най-сигурният начин да я изостави."}
```

```takeaways
- Достъпът до данните е на едно място и е `async` от самото начало.
- Четимите адреси се правят с транслитерация и трябва да са уникални.
- Проверката връща всички грешки наведнъж.
- Константите живеят на едно място и пълнят менюта, филтри и проверки.
