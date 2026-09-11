---
module: "Модул 3: React & NextJS"
section: "React Query и Tailwind"
sectionOrder: 5
title: "Проект: пренапиши търсачката"
label: "react-6-07-project"
---

В секция 4 написа търсачка за книги на ръка: състояние за зареждане, ефект, отмяна, собствен hook. Сега я пренаписваш с React Query и Tailwind.

Това не е упражнение заради упражнението. Пренаписването на собствен код с по-добър инструмент е най-бързият начин да усетиш какво точно печелиш.

## Какво се променя

| Беше | Става |
| --- | --- |
| `useState` за `data`, `loading`, `error` | `useQuery` |
| `useEffect` със зареждане | `queryFn` |
| `AbortController` на ръка | React Query го прави сам |
| Собствен `useFetch` | `useQuery` с ключ |
| Inline стилове | Tailwind класове |
| Един голям компонент | малка библиотека от UI компоненти |

```sandbox
{"title":"Скелет, от който да тръгнеш","height":700,"dependencies":{"@tanstack/react-query":"5.59.0"}}
---
import {useState} from "react";
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";

const client = new QueryClient();

async function searchBooks(query) {
  const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=10`);
  if (!response.ok) throw new Error("Сървърът върна " + response.status);
  const data = await response.json();
  return data.docs ?? [];
}

function Search() {
  const [query, setQuery] = useState("tolkien");

  const {data: books, isPending, isFetching, error, refetch} = useQuery({
    queryKey: ["books", query],
    queryFn: () => searchBooks(query),
    enabled: query.length > 2,
    staleTime: 60000
  });

  return (
    <div className="p-5 font-sans">
      <input
        defaultValue={query}
        onBlur={event => setQuery(event.target.value)}
        placeholder="Автор или заглавие"
        className="w-full max-w-sm rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200"
      />

      {isFetching && <p className="mt-2 text-xs text-violet-600">обновява се...</p>}
      {error && <p className="mt-2 text-sm text-red-600">{error.message}</p>}

      <ul className="mt-4 space-y-1 text-sm">
        {books?.map(book => (
          <li key={book.key}>{book.title} — {book.author_name?.[0] ?? "неизвестен"}</li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-gray-500">
        Оттук нататък: забавяне при писане, карти с корици, скелет при зареждане, празно състояние,
        бутон „опитай пак“ и UI компоненти.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <Search />
    </QueryClientProvider>
  );
}
```

Забележи колко изчезна: няма `useEffect`, няма `AbortController`, няма три състояния, няма ръчно гасене на индикатора.

## Задачата

```submit
{"id":"react-6-07-final","title":"Търсачка с React Query и Tailwind","language":"jsx","requirements":["Зареждането минава през `useQuery` с ключ `[\"books\", debouncedQuery]` — без `useEffect`.","Забавяне при писане със собствен `useDebounce`; `enabled` пази от заявка при празно или твърде кратко търсене.","`staleTime` е зададен съзнателно и можеш да обясниш защо е точно толкова.","Четирите състояния: скелет при първо зареждане (`isPending`), дискретен индикатор при обновяване (`isFetching`), грешка с бутон „опитай пак“ (`refetch`), празен резултат.","Всички стилове са с Tailwind — нито един inline стил.","Поне три собствени UI компонента: `Card`, `Input` или `Field`, и `Badge` или `Skeleton`.","Мрежа с карти, която е една колона на телефон и три на широк екран.","Корица при наличие на `cover_i`, заместител при липса."],"askForLink":true}
---
import {useState} from "react";
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";

// 1. useDebounce
// 2. useQuery с ключ ["books", debouncedQuery]
// 3. UI компоненти с Tailwind
// 4. Четирите състояния

export default function App() {
  return null;
}
```

```callout
{"type":"tip","title":"Сравни двете версии"}
---
Отвори старото решение до новото. Преброй редовете. Разликата е горе-долу това, което React Query спестява на всеки екран с данни — а екраните в едно приложение са десетки.
```

```callout
{"type":"info","title":"Какво гледа менторът"}
---
Липсва ли `useEffect` за зареждане, има ли забавяне и `enabled`, покрити ли са четирите състояния, и дали Tailwind класовете са събрани в компоненти вместо разпилени.
```

```takeaways
- React Query маха ефекта, отмяната и трите състояния от всеки екран с данни.
- Забавянето и `enabled` пестят заявки към чуждия сървър.
- Tailwind класовете се събират в малка библиотека от UI компоненти.
