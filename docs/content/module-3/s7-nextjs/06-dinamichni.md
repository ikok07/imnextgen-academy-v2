---
module: "Модул 3: React & NextJS"
section: "Next.js: App Router"
sectionOrder: 6
title: "Динамични страници и предварително сглобяване"
label: "react-7-06-dynamic"
---

Един файл обслужва хиляда страници. Това е основната икономия на файловото рутиране.

```javascript
// app/courses/[slug]/page.jsx
export default async function CoursePage({params}) {
  const {slug} = await params;
  const course = await getCourse(slug);

  if (!course) notFound();

  return (
    <article>
      <h1>{course.title}</h1>
      <p>{course.description}</p>
    </article>
  );
}
```

`/courses/react`, `/courses/javascript`, `/courses/каквото-и-да-е` — всичко минава през този файл.

## Видовете динамични части

| Запис | Съвпада с | `params` |
| --- | --- | --- |
| `[slug]` | `/courses/react` | `{slug: "react"}` |
| `[...slug]` | `/docs/a/b/c` | `{slug: ["a", "b", "c"]}` |
| `[[...slug]]` | `/docs` и `/docs/a/b` | празно или масив |

Второто е за документация и вложени категории. Третото — когато и самият корен трябва да работи.

## Търсене и филтри

```javascript
export default async function CoursesPage({searchParams}) {
  const {level, page = "1"} = await searchParams;
  const courses = await getCourses({level, page: Number(page)});

  return <CourseList courses={courses} />;
}
```

Адресът `/courses?level=beginner&page=2` стига до сървъра и данните идват вече филтрирани. В едностраничното приложение това ставаше в браузъра, след като страницата вече се е заредила.

```callout
{"type":"warn","title":"Пак: await"}
---
И `params`, и `searchParams` са обещания от Next 15 нататък. Без `await` получаваш обект-обещание и полетата му са `undefined`.
```

## Предварително сглобяване

Ако адресите са известни предварително, Next може да нарисува страниците още при сглобяването — резултатът е статичен HTML, който се раздава мигновено:

```javascript
export async function generateStaticParams() {
  const courses = await getCourses();

  return courses.map(course => ({slug: course.slug}));
}
```

```steps
{"title":"Какво се случва"}
---
При сглобяване Next вика `generateStaticParams` и получава списъка с адреси.
---
Рисува всяка страница и записва готов HTML.
---
При заявка сървърът раздава файл — без база, без изчисления.
---
Адрес, който не е в списъка, се рисува при първото поискване и после също се запазва.
```

```callout
{"type":"tip","title":"Кога си заслужава"}
---
Блог, документация, каталог със стотици продукти — да. Данни, зависещи от влезлия потребител — не, там всяка страница е различна.
```

## Метаданни за всяка страница

```javascript
export async function generateMetadata({params}) {
  const {slug} = await params;
  const course = await getCourse(slug);

  if (!course) return {title: "Няма такъв курс"};

  return {
    title: `${course.title} | Академия`,
    description: course.description,
    openGraph: {
      title: course.title,
      images: [course.image]
    }
  };
}
```

Всяка от хилядата страници получава собствено заглавие и описание — без нито ред ръчна работа. Това е разликата, която търсачките виждат.

```quiz
{"id":"react-7-06-q1","question":"Какво прави `generateStaticParams`?","options":["Взима параметрите по време на заявка","Казва на Next кои адреси да нарисува предварително при сглобяване","Валидира параметрите","Кешира заявките"],"answer":1,"explanation":"Връща списъка с познатите адреси. Next рисува всеки от тях веднъж и после раздава готов HTML."}
```

```quiz
{"id":"react-7-06-q2","question":"Кой запис хваща `/docs/a/b/c`?","options":["`[slug]`","`[...slug]`","`(slug)`","`[[slug]]`"],"answer":1,"explanation":"Трите точки означават „всичко нататък\" и връщат масив от частите на пътя."}
```

```takeaways
- `[slug]` прави един файл да обслужва безброй адреси; `params` е асинхронен.
- `searchParams` носи филтрите и търсенето до сървъра.
- `generateStaticParams` рисува известните страници предварително.
- `generateMetadata` дава на всяка страница собствено заглавие и описание.
