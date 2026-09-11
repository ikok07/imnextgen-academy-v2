---
module: "Модул 3: React & NextJS"
section: "React Query и Tailwind"
sectionOrder: 5
title: "Кеш, свежест и презареждане"
label: "react-6-03-cache"
---

React Query има две различни времена и почти всички ги бъркат. Разберат ли се, поведението на библиотеката спира да изглежда случайно.

```steps
{"title":"staleTime и gcTime"}
---
**`staleTime`** (по подразбиране 0) — колко време данните се смятат за **свежи**. Докато са свежи, нова заявка не се пуска, каквото и да се случи.
---
**`gcTime`** (по подразбиране 5 минути) — колко време неизползваните данни остават **в паметта**, преди да бъдат изхвърлени.
```

Свежи значи „не питай пак". Остарели значи „покажи ги, но питай наново при удобен случай".

## Кога се презарежда

При остарели данни React Query зарежда наново, когато:

```steps
---
Компонентът с тази заявка се появи отново.
---
Прозорецът получи фокус (връщане към таба).
---
Мрежата се възстанови.
---
Ключът се промени.
```

Всяко от тях се изключва поотделно, ако пречи.

```sandbox
{"title":"Свежи срещу остарели данни","height":700,"dependencies":{"@tanstack/react-query":"5.59.0"}}
---
import {useState} from "react";
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";

const client = new QueryClient();

async function fetchPost(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
  if (!response.ok) throw new Error("Статус " + response.status);
  return response.json();
}

function Panel({title, staleTime}) {
  const {data, isFetching, dataUpdatedAt} = useQuery({
    queryKey: ["post", 1, title],
    queryFn: () => fetchPost(1),
    staleTime
  });

  return (
    <div style={{border: "1px solid #ddd", borderRadius: 8, padding: 10, marginBottom: 10}}>
      <strong>{title}</strong>
      {isFetching && <span style={{color: "#5C45FD", marginLeft: 8, fontSize: 13}}>обновява се...</span>}
      <p style={{margin: "6px 0 2px", fontSize: 14}}>{data?.title}</p>
      <p style={{margin: 0, fontSize: 12, color: "#888"}}>
        заредено в {dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString("bg-BG") : "—"}
      </p>
    </div>
  );
}

export default function App() {
  const [visible, setVisible] = useState(true);

  return (
    <QueryClientProvider client={client}>
      <div style={{fontFamily: "system-ui", padding: 16}}>
        <button onClick={() => setVisible(!visible)}>
          {visible ? "Скрий панелите" : "Покажи панелите"}
        </button>

        <div style={{marginTop: 12}}>
          {visible && (
            <>
              <Panel title="staleTime 0 (веднага остарява)" staleTime={0} />
              <Panel title="staleTime 60 сек" staleTime={60000} />
            </>
          )}
        </div>

        <p style={{fontSize: 13, color: "#666"}}>
          Скрий и покажи панелите. Първият зарежда наново всеки път, вторият — не, защото данните му още са свежи.
        </p>
      </div>
    </QueryClientProvider>
  );
}
```

## Какъв staleTime да сложиш

| Данни | Разумен `staleTime` |
| --- | --- |
| Цени, наличности, чат | 0 — винаги свежи |
| Списък с продукти | 30 секунди до 1 минута |
| Профил на потребителя | 5 минути |
| Категории, настройки, статични списъци | часове или `Infinity` |

```callout
{"type":"warn","title":"staleTime: 0 не значи „без кеш“"}
---
Данните пак се пазят и се показват веднага при връщане. Просто React Query пуска и тиха заявка на заден план, за да ги провери. Потребителят вижда старото моментално и новото — секунда по-късно.
```

## Общи настройки

```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});
```

```callout
{"type":"tip","title":"Първото, което екипите изключват"}
---
`refetchOnWindowFocus` при разработка дразни: всяко връщане от редактора към браузъра пуска заявки. В продукция обаче е много полезно — потребителят се връща след час и вижда актуални данни. Изключвай го обмислено.
```

## Инструментите за разглеждане

```javascript
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

<ReactQueryDevtools initialIsOpen={false} />
```

Панел, който показва всяка заявка, състоянието ѝ и съдържанието на кеша. Спестява огромно количество гадаене и не влиза в продукционния пакет.

```quiz
{"id":"react-6-03-q1","question":"Какво прави `staleTime: 60000`?","options":["Изтрива данните след минута","Счита данните за свежи една минута и не пуска нови заявки през това време","Прави заявка на всяка минута","Задава таймаут на заявката"],"answer":1,"explanation":"`staleTime` е срокът на свежест. Докато тече, React Query ползва кеша и не безпокои сървъра."}
```

```quiz
{"id":"react-6-03-q2","question":"Каква е разликата между staleTime и gcTime?","options":["Няма, две имена на едно и също","staleTime е срок на свежест, gcTime е колко време неизползваните данни стоят в паметта","gcTime е за мутации","staleTime важи само при фокус"],"answer":1,"explanation":"Първото решава дали да се пита сървърът, второто — кога кешираните данни да бъдат изхвърлени от паметта."}
```

```takeaways
- `staleTime` решава кога да се пита сървърът; `gcTime` — кога кешът да се изхвърли.
- Остарелите данни се показват веднага и се обновяват тихо на заден план.
- Срокът на свежест се избира според това колко бързо остаряват данните.
- Devtools показват кеша и спестяват гадаене.
