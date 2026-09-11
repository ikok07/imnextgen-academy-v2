---
module: "Модул 3: React & NextJS"
section: "Защо React изобщо съществува"
sectionOrder: 0
title: "Първи проект с Vite"
label: "react-1-03-vite"
---

Редакторът в тези статии върши работа за примери, но истинската работа става на твоята машина. Нека направим проект.

## Трите команди

```steps
{"title":"Нов React проект"}
---
`npm create vite@latest moyat-proekt -- --template react` — създава папката и файловете. Vite пита нищо повече, ако си подал шаблона.
---
`cd moyat-proekt && npm install` — сваля зависимостите в `node_modules`.
---
`npm run dev` — вдига сървъра. Отваряш `http://localhost:5173` и виждаш стартовата страница.
```

```callout
{"type":"tip","title":"Защо Vite, а не create-react-app"}
---
`create-react-app` беше стандартът години наред и вече не се поддържа. Vite вдига проекта за секунда и обновява екрана моментално при запис. Днес почти всеки нов React проект тръгва с него.
```

## Какво има вътре

```
moyat-proekt/
├── node_modules/      свалените пакети (не влиза в Git)
├── public/            статични файлове, които се сервират както са
├── src/
│   ├── App.jsx        главният компонент
│   ├── App.css        стилове за него
│   ├── main.jsx       входната точка - тук React се закача за страницата
│   └── index.css      глобални стилове
├── index.html         единственият HTML файл в проекта
├── package.json       описанието на проекта и скриптовете
└── vite.config.js     настройки на Vite
```

Два файла заслужават внимание.

**`index.html`** съдържа един празен `div` и нищо друго:

```html
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
```

**`main.jsx`** е мястото, където React поема контрола над този `div`:

```javascript
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

Прочети го буквално: намери елемента с id `root`, направи го React корен и покажи в него компонента `App`. Оттам нататък цялото приложение е дървото под `App`.

```callout
{"type":"info","title":"Какво е StrictMode"}
---
Помощник само за разработка. Изпълнява компонентите ти по два пъти, за да изкара наяве страничните ефекти, които не би трябвало да ги има. Ако някога видиш `console.log` два пъти, това е причината — в продукция се случва веднъж.
```

## Първата ти промяна

Изтрий съдържанието на `App.jsx` и напиши:

```javascript
export default function App() {
  const name = "Ива";

  return (
    <main>
      <h1>Здравей, {name}!</h1>
      <p>Това е първият ми React компонент.</p>
    </main>
  );
}
```

Запиши файла. Браузърът се обновява сам, без да си го пипал.

## Разширения, които спестяват време

```steps
{"title":"В VS Code"}
---
**ES7+ React snippets** — пишеш `rafce` и получаваш готов компонент.
---
**Prettier** — форматира при запис и приключва споровете за отстояния.
---
**React Developer Tools** (разширение за браузъра) — показва дървото от компоненти и props на всеки. Ще ти трябва още в следващата секция.
```

```quiz
{"id":"react-1-03-q1","question":"Какво прави `createRoot(document.getElementById(\"root\")).render(<App />)`?","options":["Създава нов HTML файл","Казва на React кой елемент от страницата да управлява и какво да покаже в него","Стартира сървъра за разработка","Компилира JSX към JavaScript"],"answer":1,"explanation":"Това е единствената връзка между HTML страницата и React. Оттам надолу целият интерфейс е дърво от компоненти."}
```

```quiz
{"id":"react-1-03-q2","question":"Защо `console.log` в компонент се появява два пъти при разработка?","options":["Има грешка в кода","Заради StrictMode, който умишлено изпълнява компонента двукратно","Vite презарежда страницата","Компонентът е сложен два пъти в дървото"],"answer":1,"explanation":"`StrictMode` изпълнява компонентите по два пъти в режим на разработка, за да изкара наяве нечисти функции и странични ефекти. В продукция това не се случва."}
```

```takeaways
- `npm create vite@latest име -- --template react`, после `npm install` и `npm run dev`.
- `index.html` има един празен `div`; `main.jsx` закача React за него.
- Цялото приложение е дървото под `App`.
- StrictMode удвоява изпълненията при разработка нарочно — не е бъг.
