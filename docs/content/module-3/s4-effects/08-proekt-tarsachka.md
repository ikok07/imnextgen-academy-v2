---
module: "Модул 3: React & NextJS"
section: "Мислене в React: ефекти и данни"
sectionOrder: 3
title: "Проект: търсачка с реално API"
label: "react-4-08-project"
---

Третата задача за преглед. Досега данните бяха измислени от теб. Сега идват от сървър — с всичко, което върви с това.

## Какво строим

Търсачка за книги през отворено API, без регистрация и ключове:

```
https://openlibrary.org/search.json?q=ЗАЯВКА&limit=10
```

Отговорът има поле `docs` — масив с книги, всяка с `title`, `author_name` (масив), `first_publish_year` и `cover_i` (номер на корица). Корицата се показва от:

```
https://covers.openlibrary.org/b/id/НОМЕР-M.jpg
```

```sandbox
{"title":"Отправна точка - работи, но е недовършена","height":620}
---
import {useState, useEffect} from "react";

export default function App() {
  const [query, setQuery] = useState("tolkien");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!query) return;

    fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`)
      .then(response => response.json())
      .then(data => setBooks(data.docs ?? []));
  }, [query]);

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <input
        defaultValue={query}
        onBlur={event => setQuery(event.target.value)}
        placeholder="Автор или заглавие, после щракни встрани"
        style={{padding: 8, width: 260}}
      />

      <ul style={{paddingLeft: 18, fontSize: 14}}>
        {books.map((book, index) => (
          <li key={index}>{book.title} — {book.author_name?.[0] ?? "неизвестен"}</li>
        ))}
      </ul>

      <p style={{fontSize: 13, color: "#666"}}>
        Липсват: индикатор за зареждане, грешки, празно състояние, забавяне при писане, отмяна и стабилни ключове.
      </p>
    </div>
  );
}
```

## Задачата

```submit
{"id":"react-4-08-final","title":"Търсачка за книги","language":"jsx","requirements":["Търсенето се задейства при писане, но с забавяне (`useDebounce` от урока за собствени hooks) — не на всяка буква.","Логиката за заявката е извадена в собствен hook (например `useBookSearch`), а компонентът само показва резултата.","Четирите състояния са налице: зареждане, грешка с бутон „опитай пак“, празен резултат и списък с данни.","Заявката се отменя с `AbortController` при нова заявка или при премахване на компонента.","Стабилен `key` — `book.key` от API-то, не индексът.","Корица, когато има `cover_i`, и заместител, когато няма.","Празната заявка не пуска заявка към сървъра."],"askForLink":true}
---
import {useState, useEffect} from "react";

// 1. useDebounce
// 2. useBookSearch(query) -> {books, loading, error, retry}
// 3. Компоненти: поле за търсене, списък, ред от списъка, състояния

export default function App() {
  return null;
}
```

```callout
{"type":"tip","title":"Ред на работа"}
---
Първо накарай заявката да работи без нищо друго. После добави забавянето. После състоянията. Отмяната — последна. Ако тръгнеш да пишеш всичко наведнъж, ще дебъгваш пет неща едновременно.
```

```callout
{"type":"warn","title":"Внимавай с празната заявка"}
---
При изтриване на текста `query` става празен. Без проверка пускаш заявка за нищо и API-то връща произволни резултати. Провери преди заявката и покажи начален екран.
```

```callout
{"type":"info","title":"Какво гледа менторът"}
---
Дали логиката е в hook, а не в компонента; дали заявките се отменят; дали всички състояния са покрити; дали заявката не се пуска на всяка буква.
```

```takeaways
- Реалните данни носят четири състояния, забавяне, отмяна и грешки — това е нормалната цена.
- Логиката за данни живее в hook, изгледът — в компонента.
- Този проект е последният, който пишеш на ръка: следващата секция въвежда React Query, което върши по-голямата част от това вместо теб.
