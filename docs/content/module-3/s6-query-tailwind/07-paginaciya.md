---
module: "Модул 3: React & NextJS"
section: "React Query и Tailwind"
sectionOrder: 5
title: "Пагинация и безкраен скрол"
label: "react-6-07-pagination"
---

Списък с двайсет реда се зарежда наведнъж. Списък с двайсет хиляди — не. Има три подхода и React Query покрива и трите.

## Класическа пагинация

```sandbox
{"title":"Страници с номера","height":700,"dependencies":{"@tanstack/react-query":"5.59.0"}}
---
import {useState} from "react";
import {QueryClient, QueryClientProvider, useQuery, keepPreviousData} from "@tanstack/react-query";

const client = new QueryClient();
const PER_PAGE = 5;

async function fetchPosts(page) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${PER_PAGE}`);
  if (!response.ok) throw new Error("Статус " + response.status);
  return response.json();
}

function Posts() {
  const [page, setPage] = useState(1);

  const {data, isPending, isFetching, error} = useQuery({
    queryKey: ["posts", page],
    queryFn: () => fetchPosts(page),
    placeholderData: keepPreviousData
  });

  if (isPending) return <p>Зарежда се...</p>;
  if (error) return <p style={{color: "#dc2626"}}>{error.message}</p>;

  return (
    <div>
      <ul style={{paddingLeft: 18, fontSize: 14, opacity: isFetching ? 0.6 : 1, transition: "opacity 150ms"}}>
        {data.map(post => <li key={post.id} style={{marginBottom: 4}}>{post.title}</li>)}
      </ul>

      <div style={{display: "flex", alignItems: "center", gap: 8}}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>← Назад</button>
        <span style={{fontSize: 14}}>Страница {page}</span>
        <button onClick={() => setPage(page + 1)} disabled={data.length < PER_PAGE}>Напред →</button>
        {isFetching && <span style={{fontSize: 12, color: "#5C45FD"}}>обновява се...</span>}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <div style={{fontFamily: "system-ui", padding: 16}}><Posts /></div>
    </QueryClientProvider>
  );
}
```

```callout
{"type":"tip","title":"keepPreviousData маха мигането"}
---
Без него всяка смяна на страница връща `isPending` и списъкът изчезва, докато чака — екранът подскача. С него старите редове остават, леко потъмнели, докато новите пристигнат. Един ред разлика в усещането.
```

```callout
{"type":"warn","title":"Страницата да е в адреса"}
---
В реален проект `page` живее в низа със запитване (`?page=2`), не в `useState`. Тогава линкът може да се сподели, презареждането не губи мястото и бутонът „назад“ работи както очаква потребителят.
```

## Зареждане на още

```sandbox
{"title":"Бутон „Зареди още“ с useInfiniteQuery","height":700,"dependencies":{"@tanstack/react-query":"5.59.0"}}
---
import {QueryClient, QueryClientProvider, useInfiniteQuery} from "@tanstack/react-query";

const client = new QueryClient();
const PER_PAGE = 5;

async function fetchPosts({pageParam}) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=${PER_PAGE}`);
  if (!response.ok) throw new Error("Статус " + response.status);
  return response.json();
}

function Feed() {
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending} = useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: fetchPosts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => lastPage.length < PER_PAGE ? undefined : allPages.length + 1
  });

  if (isPending) return <p>Зарежда се...</p>;

  const posts = data.pages.flat();

  return (
    <div>
      <ul style={{paddingLeft: 18, fontSize: 14}}>
        {posts.map(post => <li key={post.id} style={{marginBottom: 4}}>{post.title}</li>)}
      </ul>

      {hasNextPage ? (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Зарежда се..." : "Зареди още"}
        </button>
      ) : (
        <p style={{color: "#888", fontSize: 13}}>Това беше всичко.</p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <div style={{fontFamily: "system-ui", padding: 16}}><Feed /></div>
    </QueryClientProvider>
  );
}
```

```steps
{"title":"Трите неща, които useInfiniteQuery иска"}
---
**`initialPageParam`** — откъде започва.
---
**`getNextPageParam(lastPage, allPages)`** — какво да поиска следващия път. Върнеш ли `undefined`, `hasNextPage` става `false`.
---
**`data.pages`** е масив от страници. За списък се изравнява с `.flat()`.
```

## Безкраен скрол

Същият hook, само че вместо бутон следиш кога дъното е стигнато:

```javascript
import {useEffect, useRef} from "react";

function useOnScreen(onVisible, enabled) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !enabled) return;

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) onVisible();
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onVisible, enabled]);

  return ref;
}

// в компонента
const sentinelRef = useOnScreen(fetchNextPage, hasNextPage && !isFetchingNextPage);

<div ref={sentinelRef} style={{height: 1}} />
```

Празен елемент най-отдолу; влезе ли в екрана, зарежда следващата страница.

```callout
{"type":"danger","title":"Безкраен скрол не е винаги правилният избор"}
---
При него подвалът става недостижим, връщането към конкретен резултат е мъчение, а адресът не помни докъде си стигнал. За социален поток е естествен. За каталог с продукти или за таблица в административен панел класическите страници почти винаги са по-добри.
```

## Курсорна пагинация

При бързо променящи се данни номерата на страниците лъжат: изтрие ли се запис, докато четеш страница 2, един ред прескача незабелязано на страница 3. Затова сериозните API-та връщат курсор:

```javascript
getNextPageParam: lastPage => lastPage.nextCursor ?? undefined
```

Курсорът сочи конкретен запис, не позиция — и не се обърква от промени.

```quiz
{"id":"react-6-07-q1","question":"Какво прави `placeholderData: keepPreviousData`?","options":["Кешира завинаги","Задържа данните от предишната страница, докато новата пристигне","Зарежда всички страници наведнъж","Спира заявките"],"answer":1,"explanation":"Списъкът не изчезва при смяна на страница — старите редове остават до пристигането на новите и екранът не подскача."}
```

```quiz
{"id":"react-6-07-q2","question":"Как `useInfiniteQuery` разбира, че няма повече страници?","options":["Брои извикванията","Когато `getNextPageParam` върне `undefined`","По дължината на data.pages","Сървърът изпраща 404"],"answer":1,"explanation":"Твоята функция решава дали има следваща страница. Върне ли `undefined`, `hasNextPage` става `false`."}
```

```takeaways
- Класическа пагинация: ключ с номера на страницата плюс `keepPreviousData`; страницата живее в адреса.
- `useInfiniteQuery` натрупва страници; `data.pages` се изравнява с `.flat()`.
- Безкраен скрол се прави с IntersectionObserver, но убива подвала и споделянето.
- При променливи данни курсорът е по-надежден от номер на страница.
