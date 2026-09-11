---
module: "Модул 3: React & NextJS"
section: "React Query и Tailwind"
sectionOrder: 5
title: "Компоненти с варианти"
label: "react-6-06-variants"
---

Първото възражение срещу Tailwind идва бързо: „ако всеки бутон носи по 12 класа, значи ги копирам навсякъде." Отговорът не е нов CSS файл — а компонент.

## Бутон с варианти

```sandbox
{"title":"Един бутон, четири вида и три размера","height":640}
---
const VARIANTS = {
  primary: "bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-300",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-300",
  ghost: "bg-transparent text-violet-700 hover:bg-violet-50 focus:ring-violet-200"
};

const SIZES = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base"
};

function Button({variant = "primary", size = "md", disabled, children, ...props}) {
  const base = "inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <button className={`${base} ${VARIANTS[variant]} ${SIZES[size]}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

export default function App() {
  return (
    <div className="space-y-4 p-6 font-sans">
      <div className="flex flex-wrap items-center gap-2">
        <Button>Основен</Button>
        <Button variant="secondary">Вторичен</Button>
        <Button variant="danger">Изтрий</Button>
        <Button variant="ghost">Откажи</Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm">Малък</Button>
        <Button size="md">Среден</Button>
        <Button size="lg">Голям</Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button disabled>Неактивен</Button>
        <Button variant="danger" size="sm" onClick={() => console.log("клик")}>С обработчик</Button>
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

```steps
{"title":"Три части"}
---
**Основа** — класовете, общи за всички варианти.
---
**Обект с варианти** — вместо стълба от `if`. Познат шаблон от урока за условно рендиране.
---
**`...props`** — всичко останало (`onClick`, `type`, `aria-label`) отива на елемента. Без това компонентът бързо става задушаващ.
```

```callout
{"type":"tip","title":"clsx и tailwind-merge"}
---
`clsx` слепва класове с условия четимо. `tailwind-merge` решава конфликтите: `p-2 p-4` оставя само `p-4`. Двете заедно са стандартът в React проекти с Tailwind и се увиват в помощна функция `cn()`.
```

## Поле с грешка

```sandbox
{"title":"Състояние на полето през класове","height":620}
---
import {useState} from "react";

function Field({label, error, hint, ...props}) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
            : "border-gray-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
        }`}
        {...props}
      />
      {error
        ? <p className="text-xs text-red-600">{error}</p>
        : hint && <p className="text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

export default function App() {
  const [email, setEmail] = useState("");
  const invalid = email.length > 0 && !email.includes("@");

  return (
    <div className="max-w-sm space-y-4 p-6 font-sans">
      <Field
        label="Имейл"
        value={email}
        onChange={event => setEmail(event.target.value)}
        placeholder="ime@example.com"
        hint="Ще пращаме само важното."
        error={invalid ? "Липсва @ в адреса." : ""}
      />
      <p className="text-xs text-gray-500">Напиши нещо без @ и виж как полето сменя вида си.</p>
    </div>
  );
}
```

## Малка библиотека от компоненти

В нормален проект тези неща живеят в `components/ui/`: `Button`, `Input`, `Card`, `Badge`, `Modal`, `Spinner`. Пишеш ги веднъж и оттам нататък екраните се сглобяват бързо и изглеждат еднакво.

```callout
{"type":"info","title":"shadcn/ui"}
---
Ще чуеш това име постоянно. Не е библиотека, която инсталираш — това е колекция от готови компоненти, чийто код **копираш в проекта си** и после променяш както искаш. Точно същите идеи като горните, само написани вместо теб.
```

```quiz
{"id":"react-6-06-q1","question":"Как се избягва повторението на дълги списъци с Tailwind класове?","options":["С отделен CSS файл","С компонент, който приема вариант и размер","С глобални променливи","Не може да се избегне"],"answer":1,"explanation":"Повторението се решава на ниво компонент, не на ниво стилове. Един `Button` с варианти обслужва цялото приложение."}
```

```quiz
{"id":"react-6-06-q2","question":"За какво служи `...props` в такъв компонент?","options":["За стиловете","За да стигнат до елемента всички останали атрибути като onClick, type и aria-label","За производителност","За TypeScript"],"answer":1,"explanation":"Без разпръскване на props компонентът трябва да изброява ръчно всеки възможен атрибут — и неизбежно пропуска нужния."}
```

```takeaways
- Повторените класове се решават с компонент, не с нов CSS файл.
- Основа + обект с варианти + `...props` е шаблонът за всеки UI компонент.
- `clsx` и `tailwind-merge` слепват класове и решават конфликтите.
- Малка собствена библиотека в `components/ui/` държи екраните последователни.
