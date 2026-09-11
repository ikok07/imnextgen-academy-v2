---
module: "Модул 3: React & NextJS"
section: "Next.js: App Router"
sectionOrder: 7
title: "Метаданни и видимост в търсачките"
label: "react-7-09-metadata"
---

Основната причина много проекти да минат на Next е точно тази: сайтът да се вижда в Google и линковете да изглеждат добре, когато някой ги сподели.

## Основните метаданни

```javascript
// app/layout.jsx
export const metadata = {
  title: {
    default: "Академия за уеб разработка",
    template: "%s | Академия"
  },
  description: "Научи HTML, CSS, JavaScript и React от нулата, с реални проекти.",
  metadataBase: new URL("https://example.com")
};
```

`template` спестява повторение: страница със `title: "Курсове"` става „Курсове | Академия" автоматично.

```javascript
// app/courses/page.jsx
export const metadata = {
  title: "Курсове",
  description: "Всички курсове в академията - от основи до React и Next.js."
};
```

## Динамични метаданни

```javascript
export async function generateMetadata({params}) {
  const {slug} = await params;
  const course = await getCourse(slug);

  if (!course) return {title: "Няма такъв курс"};

  return {
    title: course.title,
    description: course.shortDescription,
    openGraph: {
      title: course.title,
      description: course.shortDescription,
      images: [{url: course.image, width: 1200, height: 630}],
      type: "article"
    },
    alternates: {
      canonical: `/courses/${slug}`
    }
  };
}
```

```steps
{"title":"Какво прави всяко"}
---
**`title` и `description`** — това, което се вижда в резултатите на Google.
---
**`openGraph`** — картината и текстът, когато линкът се сподели във Facebook, LinkedIn или Viber.
---
**`canonical`** — кой е истинският адрес, когато една страница е достъпна по няколко пътя.
---
**Размерът 1200×630** е стандартът за изображение при споделяне. По-малко изглежда зле навсякъде.
```

```callout
{"type":"tip","title":"Картинката се генерира"}
---
Next може да прави изображението за споделяне автоматично: файл `opengraph-image.jsx` до страницата, който рисува заглавието върху фон. Така всяка статия получава собствена картинка, без дизайнер.
```

## Структурирани данни

Google разбира повече, когато му се каже изрично какво има на страницата:

```javascript
export default async function CoursePage({params}) {
  const {slug} = await params;
  const course = await getCourse(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.description,
    provider: {"@type": "Organization", name: "Академия"}
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />
      <article>{/* съдържанието */}</article>
    </>
  );
}
```

Оттам идват звездичките, цените и датите, които понякога виждаш под резултатите в Google.

## sitemap и robots

```javascript
// app/sitemap.js
export default async function sitemap() {
  const courses = await getCourses();

  return [
    {url: "https://example.com", lastModified: new Date(), priority: 1},
    ...courses.map(course => ({
      url: `https://example.com/courses/${course.slug}`,
      lastModified: course.updatedAt
    }))
  ];
}
```

```javascript
// app/robots.js
export default function robots() {
  return {
    rules: [{userAgent: "*", allow: "/", disallow: ["/dashboard/", "/api/"]}],
    sitemap: "https://example.com/sitemap.xml"
  };
}
```

Два файла, които се обновяват сами при добавяне на ново съдържание.

```callout
{"type":"warn","title":"Клиентски компонент не изнася метаданни"}
---
`export const metadata` работи само в сървърни компоненти. Ако страницата ти започва с `"use client"`, метаданните мълчаливо изчезват. Това е още една причина директивата да стои възможно най-ниско.
```

```quiz
{"id":"react-7-09-q1","question":"Какво прави `title: {template: \"%s | Академия\"}`?","options":["Задава заглавие по подразбиране","Добавя „| Академия“ към заглавието на всяка подстраница","Превежда заглавието","Скрива заглавието"],"answer":1,"explanation":"`%s` се заменя със заглавието на конкретната страница, така че суфиксът не се пише ръчно навсякъде."}
```

```quiz
{"id":"react-7-09-q2","question":"Защо метаданните не работят в клиентски компонент?","options":["Работят навсякъде","Защото се четат при рисуване на сървъра, преди HTML-ът да тръгне","Защото са само за продукция","Заради кеша"],"answer":1,"explanation":"Метаданните влизат в `<head>` на изпратения HTML. Клиентският компонент се изпълнява по-късно, в браузъра, когато главата вече е изпратена."}
```

```takeaways
- `metadata` в изгледа задава общото, `generateMetadata` — специфичното за страницата.
- `openGraph` управлява как изглежда споделеният линк; 1200×630.
- `sitemap.js` и `robots.js` се обновяват сами.
- Метаданни има само в сървърни компоненти.
