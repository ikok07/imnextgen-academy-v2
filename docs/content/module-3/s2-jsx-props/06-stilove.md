---
module: "Модул 3: React & NextJS"
section: "Компоненти, JSX и props"
sectionOrder: 1
title: "Стилове в React"
label: "react-2-06-styling"
---

Стиловете в React не са нова технология — това е същият CSS, само че закачен по различни начини. Четири подхода, всеки със своето място.

## 1. Обикновен CSS файл

```javascript
import "./Button.css";

function Button({children}) {
  return <button className="btn">{children}</button>;
}
```

Просто и познато. Недостатъкът: класът `btn` е глобален. Втори компонент със същото име го презаписва.

## 2. CSS модули

```javascript
import styles from "./Button.module.css";

function Button({children}) {
  return <button className={styles.btn}>{children}</button>;
}
```

Файл с име `нещо.module.css` се обработва специално: при сглобяването `btn` става `Button_btn__x7f2a`. Сблъсъци на имена няма, а пишеш обикновен CSS.

## 3. Inline стилове

```sandbox
{"title":"Стил като обект","height":400}
---
function Progress({percent}) {
  return (
    <div style={{background: "#eee", borderRadius: 999, height: 10, overflow: "hidden"}}>
      <div style={{
        width: `${percent}%`,
        height: "100%",
        background: percent > 70 ? "#16a34a" : "#5C45FD",
        transition: "width 300ms"
      }} />
    </div>
  );
}

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16, display: "grid", gap: 12}}>
      <Progress percent={35} />
      <Progress percent={85} />
    </div>
  );
}
```

Незаменими са за стойности, които се смятат по време на работа — ширина на лента, позиция, цвят според данните. За всичко останало са неудобни: нямат `:hover`, нямат медийни заявки.

## 4. Tailwind

```javascript
<button className="rounded-md bg-violet-600 px-4 py-2 text-white hover:bg-violet-700">
  Изпрати
</button>
```

Пишеш стиловете като класове направо върху елемента. Изглежда шумно на пръв поглед и е най-разпространеният подход в новите React проекти. Цяла секция по-нататък е за него.

## Динамични класове

```sandbox
{"title":"Класове според състоянието","height":420}
---
function Tab({label, active}) {
  const classes = ["tab", active ? "tab-active" : ""].filter(Boolean).join(" ");

  return (
    <button className={classes} style={{
      border: "none",
      borderBottom: active ? "2px solid #5C45FD" : "2px solid transparent",
      background: "none",
      padding: "8px 14px",
      fontWeight: active ? 600 : 400,
      cursor: "pointer"
    }}>
      {label}
    </button>
  );
}

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <Tab label="Всички" active={true} />
      <Tab label="Активни" active={false} />
      <Tab label="Завършени" active={false} />
    </div>
  );
}
```

В реалните проекти вместо ръчното слепване се използва малката библиотека `clsx` — прави същото, но по-четимо.

```callout
{"type":"tip","title":"Кое да избереш"}
---
За учебните проекти тук: CSS модули за структурата и inline за изчислените стойности. В работата най-вероятно ще пишеш Tailwind, защото екипът вече го е избрал.
```

```quiz
{"id":"react-2-06-q1","question":"Защо `style={{fontSize: 18}}` се пише с двойни скоби?","options":["Такъв е синтаксисът на JSX за стилове","Външните вкарват JavaScript, вътрешните са обект","За да се различава от className","Заради CSS модулите"],"answer":1,"explanation":"Няма специален синтаксис. Едните скоби казват „тук има JavaScript\", а вътре в тях стои обикновен обект."}
```

```quiz
{"id":"react-2-06-q2","question":"Кое НЕ може да се направи с inline стил?","options":["Да зависи от prop","Да смята стойност по време на работа","`:hover` състояние","Да ползва променлива"],"answer":2,"explanation":"Inline стилът е обект със свойства на един елемент — псевдокласове и медийни заявки нямат къде да се запишат. За тях трябва CSS файл, модул или Tailwind."}
```

```takeaways
- CSS файл, CSS модул, inline обект или Tailwind — всичко е CSS отдолу.
- CSS модулите решават сблъсъците на имена без нова технология.
- Inline стиловете са за изчислени стойности, не за `:hover` и медийни заявки.
- Динамичните класове се слепват с условие или с `clsx`.
