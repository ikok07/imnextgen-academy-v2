---
module: "Модул 3: React & NextJS"
section: "React Query и Tailwind"
sectionOrder: 5
title: "Tailwind: стилове като класове"
label: "react-6-05-tailwind"
---

Първата среща с Tailwind обикновено е отблъскваща:

```javascript
<button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700">
  Изпрати
</button>
```

Изглежда като стъпка назад към inline стиловете. Не е — и ето защо.

## Какво решава

```steps
---
**Край на измислянето на имена.** `.card`, `.card-inner`, `.card-title-wrapper` — цялото време, което си губил в кръщаване на класове, отпада.
---
**Край на страха от изтриване.** Не можеш да знаеш дали `.header-box` се ползва другаде. Изтриеш ли клас от компонент, си сигурен.
---
**Ограничена скала.** `p-4` е винаги едно и също. Свършва разнобоят от 13px, 14px и 15px на три места.
---
**Всичко е на едно място.** Гледаш компонента и виждаш как изглежда, без да отваряш втори файл.
```

```sandbox
{"title":"Същият компонент, писан с Tailwind","height":600}
---
export default function App() {
  return (
    <div className="p-6 font-sans">
      <div className="max-w-sm rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">React и Next.js</h3>
          <span className="rounded-full bg-violet-100 px-2.5 py-0.5 text-xs font-medium text-violet-700">
            напреднал
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-600">
          Модерен React от начинаещи до напреднали, с Next.js и реални проекти.
        </p>

        <div className="mt-4 flex items-center gap-3">
          <button className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700">
            Запиши се
          </button>
          <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
            Виж уроците
          </button>
        </div>
      </div>
    </div>
  );
}
---
// file: /public/index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

Промени `bg-violet-600` на `bg-emerald-600` и виж резултата веднага.

## Езикът

Имената следват CSS свойствата, съкратени:

| Клас | CSS |
| --- | --- |
| `p-4` | `padding: 1rem` |
| `px-4 py-2` | хоризонтален и вертикален вътрешен отстъп |
| `mt-2` | `margin-top: 0.5rem` |
| `flex items-center gap-3` | flex контейнер, центрирано, разстояние |
| `text-sm font-medium` | размер и дебелина на шрифта |
| `rounded-lg` | заоблени ъгли |
| `hover:bg-violet-700` | цвят при посочване |
| `md:flex-row` | от среден екран нагоре — в ред |

Скалата е стъпаловидна: `1` е 0.25rem, `2` е 0.5rem, `4` е 1rem. Цветовете вървят от 50 (най-светло) до 950 (най-тъмно).

```callout
{"type":"tip","title":"Не ги наизустявай"}
---
Инсталирай разширението **Tailwind CSS IntelliSense** за VS Code. То допълва имената и показва какъв CSS стои зад тях. След седмица ще пишеш повечето класове по памет, без да си учил нищо.
```

## Отзивчивост и състояния

```sandbox
{"title":"Едно оформление, два екрана","height":620}
---
export default function App() {
  const courses = [
    {id: 1, title: "HTML + CSS", level: "начинаещ"},
    {id: 2, title: "JavaScript", level: "среден"},
    {id: 3, title: "React", level: "напреднал"}
  ];

  return (
    <div className="p-5 font-sans">
      <h2 className="mb-4 text-xl font-bold sm:text-2xl">Курсове</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map(course => (
          <article
            key={course.id}
            className="group cursor-pointer rounded-lg border border-gray-200 p-4 transition hover:border-violet-400 hover:shadow-md"
          >
            <h3 className="font-semibold text-gray-900 group-hover:text-violet-700">{course.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{course.level}</p>
          </article>
        ))}
      </div>

      <p className="mt-4 text-xs text-gray-500">
        Провлачи границата между редактора и прегледа — колоните се преподреждат.
      </p>
    </div>
  );
}
---
// file: /public/index.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

```steps
---
**Мобилно първо.** Класът без представка важи навсякъде; `sm:`, `md:`, `lg:` го заменят от съответната ширина нагоре.
---
**Състояния** с представка: `hover:`, `focus:`, `disabled:`, `dark:`.
---
**`group`** на родителя позволява `group-hover:` на детето — цялата карта реагира на посочване.
```

```callout
{"type":"info","title":"В истински проект"}
---
Тук ползваме CDN заради удобството. В реален проект Tailwind се инсталира като зависимост и при сглобяване остават **само класовете, които наистина ползваш** — обикновено под 10 килобайта CSS за целия сайт.
```

```quiz
{"id":"react-6-05-q1","question":"Какво значи `md:flex-row` в Tailwind?","options":["Винаги подрежда в ред","Подрежда в ред само на екрани от среден размер нагоре","Подрежда в ред само на малки екрани","Работи само с grid"],"answer":1,"explanation":"Tailwind е мобилно първо: класът без представка важи за всички размери, а представката го включва от дадената ширина нагоре."}
```

```quiz
{"id":"react-6-05-q2","question":"Защо Tailwind не е същото като inline стилове?","options":["Няма разлика","Има ограничена скала, поддържа hover и медийни заявки и премахва неизползваното при сглобяване","Защото е по-бърз","Защото е по-кратък"],"answer":1,"explanation":"Inline стиловете не могат `:hover` и медийни заявки, нямат обща скала и не се оптимизират при сглобяване."}
```

```takeaways
- Tailwind премахва измислянето на имена и страха от триене на CSS.
- Скалата е обща и ограничена — оттам идва визуалната последователност.
- Мобилно първо: `sm:`, `md:`, `lg:` важат нагоре.
- Състояния с представка: `hover:`, `focus:`, `disabled:`, `dark:`, `group-hover:`.
