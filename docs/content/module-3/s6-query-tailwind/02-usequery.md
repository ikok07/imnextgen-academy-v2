---
module: "Модул 3: React & NextJS"
section: "React Query и Tailwind"
sectionOrder: 5
title: "useQuery на практика"
label: "react-6-02-usequery"
---

Един hook, две задължителни неща: ключ и функция, която връща данните.

```javascript
const {data, isPending, error} = useQuery({
  queryKey: ["users"],
  queryFn: fetchUsers
});
```

## Ключът е адресът в кеша

```steps
---
`["users"]` — целият списък.
---
`["users", userId]` — един потребител. Различно id значи различен запис в кеша.
---
`["users", {status: "active", page: 2}]` — списък с филтри. Промени ли се филтърът, ключът се променя и React Query зарежда наново.
---
Ключът се сравнява по съдържание, не по препратка — обект вътре в масива е напълно нормален.
```

```sandbox
{"title":"Ключът управлява всичко","height":700,"dependencies":{"@tanstack/react-query":"5.59.0"}}
---
import {useState} from "react";
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";

const client = new QueryClient();

async function fetchUser(id) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  if (!response.ok) throw new Error("Сървърът върна " + response.status);
  return response.json();
}

function UserPanel() {
  const [id, setId] = useState(1);

  const {data, isPending, isFetching, error, refetch} = useQuery({
    queryKey: ["user", id],
    queryFn: () => fetchUser(id)
  });

  return (
    <div>
      <div style={{marginBottom: 10}}>
        {[1, 2, 3].map(option => (
          <button key={option} onClick={() => setId(option)} style={{marginRight: 6, fontWeight: option === id ? 700 : 400}}>
            Потребител {option}
          </button>
        ))}
        <button onClick={() => refetch()} style={{marginLeft: 6}}>Презареди</button>
      </div>

      {isPending && <p>Зарежда се за пръв път...</p>}
      {error && <p style={{color: "#dc2626"}}>{error.message}</p>}

      {data && (
        <div style={{border: "1px solid #ddd", borderRadius: 8, padding: 12, opacity: isFetching ? 0.6 : 1}}>
          <strong>{data.name}</strong>
          <p style={{margin: "4px 0", color: "#666"}}>{data.email}</p>
          <p style={{margin: 0, color: "#666"}}>{data.address.city}</p>
        </div>
      )}

      <p style={{fontSize: 13, color: "#666"}}>
        Щракай между потребителите. Първия път се зарежда, после излиза моментално от кеша.
      </p>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <div style={{fontFamily: "system-ui", padding: 16}}><UserPanel /></div>
    </QueryClientProvider>
  );
}
```

## Двата различни „зарежда се"

```steps
---
**`isPending`** — няма никакви данни. Първо зареждане, показва се скелет.
---
**`isFetching`** — има стари данни в кеша, но тече нова заявка. Показва се дискретен индикатор, а старите данни остават на екрана.
```

Точно това прави приложението да се усеща бързо: не празен екран, а леко потъмнели стари данни, които се обновяват.

## Функцията трябва да хвърля при грешка

```callout
{"type":"danger","title":"Най-честата грешка при настройка"}
---
`fetch` не хвърля при 404 и 500. Ако `queryFn` не провери `response.ok` и не хвърли, React Query смята заявката за успешна и слага съобщението за грешка в `data`. Проверката е задължителна.
```

## Полезни настройки

```javascript
useQuery({
  queryKey: ["courses"],
  queryFn: fetchCourses,
  enabled: Boolean(userId),   // не зарежда, докато условието не е изпълнено
  staleTime: 5 * 60 * 1000,   // данните са свежи 5 минути
  retry: 2,                   // два повторни опита при грешка
  select: data => data.items  // взима само нужното парче
});
```

`enabled` е решението на проблема „не пускай заявка за празна търсачка" — без нито един `if` в ефект.

```quiz
{"id":"react-6-02-q1","question":"Каква е разликата между `isPending` и `isFetching`?","options":["Няма разлика","`isPending` значи, че няма никакви данни; `isFetching` — че тече заявка, но може да има стари данни","`isFetching` е за мутации","`isPending` е стар синтаксис"],"answer":1,"explanation":"Първото зареждане показва скелет. Следващите показват старите данни плюс дискретен индикатор — така екранът не подскача."}
```

```quiz
{"id":"react-6-02-q2","question":"Защо `queryFn` трябва да хвърля грешка при лош отговор?","options":["За да се запише в конзолата","Защото иначе React Query смята заявката за успешна и слага грешката в data","Заради повторните опити","Не е задължително"],"answer":1,"explanation":"React Query разпознава провала по хвърлено изключение. `fetch` не хвърля при 404 и 500, затова проверката на `response.ok` е твоя работа."}
```

```takeaways
- `useQuery` иска ключ и функция; ключът е адресът в кеша.
- Промяна на ключа значи ново зареждане и отделен запис в кеша.
- `isPending` е за първо зареждане, `isFetching` — за обновяване на съществуващи данни.
- `queryFn` задължително хвърля при лош отговор.
