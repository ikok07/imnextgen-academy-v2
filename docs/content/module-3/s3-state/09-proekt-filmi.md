---
module: "Модул 3: React & NextJS"
section: "State и събития"
sectionOrder: 2
title: "Проект: списък с филми за гледане"
label: "react-3-08-project"
---

Втората задача за преглед. Тук вече има състояние, форма, филтри и изчислени стойности — всичко от тази секция.

## Заданието

Приложение, в което си водиш списък с филми за гледане.

```steps
{"title":"Какво трябва да може"}
---
**Добавяне** на филм с име и година през форма. Празно име не се приема.
---
**Отмятане** като гледан и **триене** от списъка.
---
**Оценка** от 1 до 5 звезди, която се дава само на гледаните филми.
---
**Филтри**: всички / за гледане / гледани, с брой до всеки.
---
**Обобщение**: колко филма има, колко са гледани и каква е средната оценка на гледаните.
---
**Празни състояния** за всеки филтър поотделно.
```

```sandbox
{"title":"Отправна точка - разгледай и продължи оттук","height":560}
---
import {useState} from "react";

const INITIAL = [
  {id: 1, title: "Спасяването на редник Райън", year: 1998, watched: true, rating: 5},
  {id: 2, title: "Дюна: Част втора", year: 2024, watched: false, rating: 0}
];

export default function App() {
  const [movies, setMovies] = useState(INITIAL);

  const watched = movies.filter(movie => movie.watched);
  const average = watched.length === 0
    ? 0
    : watched.reduce((sum, movie) => sum + movie.rating, 0) / watched.length;

  return (
    <main style={{fontFamily: "system-ui", padding: 16, maxWidth: 420}}>
      <h2 style={{marginTop: 0}}>Филми</h2>
      <p style={{color: "#666", fontSize: 13}}>
        {movies.length} общо · {watched.length} гледани · средно {average.toFixed(1)}
      </p>

      <ul style={{listStyle: "none", padding: 0}}>
        {movies.map(movie => (
          <li key={movie.id} style={{borderBottom: "1px solid #eee", padding: "6px 0"}}>
            {movie.title} <span style={{color: "#999"}}>({movie.year})</span>
            {movie.watched && <span style={{marginLeft: 8}}>{"★".repeat(movie.rating)}</span>}
          </li>
        ))}
      </ul>

      <p style={{fontSize: 13, color: "#666"}}>
        Оттук нататък е твоя работа: форма, отмятане, триене, оценка и филтри.
      </p>
    </main>
  );
}
```

## Предай решението

```submit
{"id":"react-3-08-final","title":"Списък с филми","language":"jsx","requirements":["Минимално състояние: списъкът и активният филтър. Броячите и средната оценка се смятат при рисуването, не се пазят.","Всяка промяна на списъка прави нов масив (`map`, `filter`, разпръскване) — никакъв `push` или промяна на място.","Формата държи собственото си състояние и се изчиства след успешно добавяне.","Поне четири компонента: форма, филтри, ред от списъка и обобщение.","Оценка се дава само на гледан филм; при отмятане обратно оценката се нулира.","Отделно празно състояние за всеки филтър.","Използвай функционалната форма `setMovies(current => ...)` там, където новата стойност зависи от старата."],"askForLink":true}
---
import {useState} from "react";

const INITIAL = [
  {id: 1, title: "Спасяването на редник Райън", year: 1998, watched: true, rating: 5},
  {id: 2, title: "Дюна: Част втора", year: 2024, watched: false, rating: 0}
];

export default function App() {
  const [movies, setMovies] = useState(INITIAL);

  // Твоят код тук.

  return null;
}
```

```callout
{"type":"info","title":"Какво гледа менторът"}
---
Дали състоянието е минимално, дали няма промяна на място, дали компонентите имат ясни граници и дали формата е контролирана. Дизайнът не се оценява.
```

```callout
{"type":"tip","title":"Ако заседнеш"}
---
Върни се на завършения списък със задачи от предишния урок — структурата е същата. Разликата е само в полетата и в оценката.
```

```takeaways
- Проектът повтаря шаблона: минимално състояние, изчислими стойности, нови масиви при всяка промяна.
- Границите между компонентите са това, което отличава работещия код от подредения.
