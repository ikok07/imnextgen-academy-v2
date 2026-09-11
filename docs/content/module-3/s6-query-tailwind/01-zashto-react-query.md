---
module: "Модул 3: React & NextJS"
section: "React Query и Tailwind"
sectionOrder: 5
title: "Защо React Query съществува"
label: "react-6-01-why-query"
---

В секция 4 написа зареждане на данни на ръка: състояние, ефект, индикатор, грешка, отмяна. Работи. Проблемът е, че това е само началото на списъка.

```steps
{"title":"Какво още иска едно сериозно приложение"}
---
**Кеш** — отваряш продукт, връщаш се, отваряш го пак. Защо втора заявка?
---
**Споделяне между компоненти** — три компонента искат същите данни. Три еднакви заявки ли?
---
**Ново зареждане при връщане към таба** — потребителят е бил другаде половин час. Данните са остарели.
---
**Повторен опит при мрежова грешка** — една неуспешна заявка не значи, че всичко е загубено.
---
**Обновяване след промяна** — добавяш продукт; списъкът трябва да се обнови сам.
---
**Отмяна и защита от разминаване** — вече го писа веднъж и знаеш колко е приятно.
```

Всяко от тези неща е по 20-40 реда. Умножени по всеки екран в приложението, това са хиляди редове код, които не носят стойност — и които всички пишат еднакво зле.

## Разделението, което променя всичко

```callout
{"type":"tip","title":"Сървърното състояние не е твое"}
---
Продуктите, поръчките и потребителите живеят в база данни. Ти държиш **временно копие**. Копието остарява в мига, в който някой друг промени оригинала. Затова има нужда от кеш, срок на годност и презареждане — а не от място в `useState`.
```

React Query (официално `@tanstack/react-query`) е кеш за сървърно състояние. Не е магазин за състояние и не заменя `useState`.

## Същият екран, двата подхода

```sandbox
{"title":"На ръка срещу с React Query","height":700,"dependencies":{"@tanstack/react-query":"5.59.0"}}
---
import {useState, useEffect} from "react";
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";

const client = new QueryClient();

function ManualVersion() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1", {signal: controller.signal});
        if (!response.ok) throw new Error("Статус " + response.status);
        setData(await response.json());
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  if (loading) return <p>Зарежда се...</p>;
  if (error) return <p style={{color: "#dc2626"}}>{error}</p>;
  return <p>Ръчно: <strong>{data.name}</strong></p>;
}

function QueryVersion() {
  const {data, isPending, error} = useQuery({
    queryKey: ["user", 1],
    queryFn: async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
      if (!response.ok) throw new Error("Статус " + response.status);
      return response.json();
    }
  });

  if (isPending) return <p>Зарежда се...</p>;
  if (error) return <p style={{color: "#dc2626"}}>{error.message}</p>;
  return <p>React Query: <strong>{data.name}</strong></p>;
}

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <div style={{fontFamily: "system-ui", padding: 16}}>
        <ManualVersion />
        <QueryVersion />
        <p style={{fontSize: 13, color: "#666"}}>
          Двете показват едно и също. Но втората вече има кеш, повторни опити, споделяне между компоненти
          и презареждане при връщане към таба — без нито ред допълнителен код.
        </p>
      </div>
    </QueryClientProvider>
  );
}
```

## Настройка

```javascript
// main.jsx
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
```

Един доставчик около приложението. Оттам нататък `useQuery` работи навсякъде.

```callout
{"type":"info","title":"Името"}
---
Библиотеката се казваше React Query, после стана TanStack Query, защото вече работи и с Vue, Svelte и Solid. Пакетът е `@tanstack/react-query`, но всички още я наричат React Query.
```

```quiz
{"id":"react-6-01-q1","question":"Какво е React Query?","options":["Заместител на useState","Кеш и инструмент за синхронизация на сървърно състояние","Библиотека за заявки, като axios","Държава за глобално клиентско състояние"],"answer":1,"explanation":"Заявките ги прави твоята функция (с `fetch` или axios). React Query управлява кеша, срока на годност, повторните опити и обновяването."}
```

```quiz
{"id":"react-6-01-q2","question":"Кое от изброените НЕ е работа за React Query?","options":["Списък с продукти от API","Данни за потребителския профил от сървъра","Дали страничното меню е отворено","Поръчките на клиента"],"answer":2,"explanation":"Отвореното меню е чисто клиентско състояние — живее в `useState`. React Query се занимава само с данни, чийто източник е сървърът."}
```

```takeaways
- Ръчното зареждане покрива само началото; кеш, споделяне и обновяване са още хиляди редове.
- Сървърното състояние е копие на чужда истина и остарява.
- React Query управлява това копие; `useState` остава за клиентското състояние.
- Настройката е един `QueryClientProvider` около приложението.
