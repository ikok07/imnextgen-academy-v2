---
module: "Модул 3: React & NextJS"
section: "Мислене в React: ефекти и данни"
sectionOrder: 3
title: "Собствени hooks"
label: "react-4-06-custom-hooks"
---

Компонентите преизползват външен вид. Hooks преизползват **поведение**.

Custom hook е обикновена функция, чието име започва с `use` и която вътре ползва други hooks. Това е цялото определение.

## От повторение към hook

Ето същата логика за зареждане, която вече писа — извадена навън:

```sandbox
{"title":"useFetch","height":640}
---
import {useState, useEffect} from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, {signal: controller.signal});
        if (!response.ok) throw new Error("Сървърът върна " + response.status);
        setData(await response.json());
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [url]);

  return {data, loading, error};
}

function UserCard({id}) {
  const {data: user, loading, error} = useFetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  if (loading) return <p style={{color: "#888"}}>Зарежда се...</p>;
  if (error) return <p style={{color: "#dc2626"}}>{error}</p>;

  return (
    <div style={{border: "1px solid #ddd", borderRadius: 8, padding: 10, marginBottom: 8}}>
      <strong>{user.name}</strong>
      <p style={{margin: "2px 0 0", color: "#666", fontSize: 13}}>{user.email}</p>
    </div>
  );
}

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <UserCard id={1} />
      <UserCard id={2} />
    </div>
  );
}
```

Компонентът вече не знае нищо за `AbortController` и `response.ok`. Знае само дали има данни, зарежда ли се и има ли грешка.

## Два полезни hook-а за всеки проект

```sandbox
{"title":"useLocalStorage и useDebounce","height":640}
---
import {useState, useEffect} from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // частен режим - просто не пазим
    }
  }, [key, value]);

  return [value, setValue];
}

function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

export default function App() {
  const [name, setName] = useLocalStorage("demo-name", "");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  return (
    <div style={{fontFamily: "system-ui", padding: 16, display: "grid", gap: 14}}>
      <div>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Име (пази се)" style={{padding: 8}} />
        <p style={{fontSize: 13, color: "#666"}}>Презареди прегледа — текстът остава.</p>
      </div>

      <div>
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Търсене" style={{padding: 8}} />
        <p style={{fontSize: 13}}>пишеш: <strong>{query || "—"}</strong></p>
        <p style={{fontSize: 13}}>след забавяне: <strong>{debouncedQuery || "—"}</strong></p>
      </div>
    </div>
  );
}
```

`useDebounce` е рецептата срещу заявка при всяка буква: чака 500 мс тишина и чак тогава пуска новата стойност нататък.

```callout
{"type":"info","title":"Ленива начална стойност"}
---
`useState(() => ...)` с функция вместо стойност изпълнява четенето само веднъж, при първото рисуване. Без функцията `localStorage.getItem` щеше да се изпълнява при всяко рисуване — безсмислена работа.
```

## Правилата на hooks

```steps
---
**Само в компонент или в друг hook.** Не в обикновена функция, не в обработчик на събитие.
---
**Само на най-горно ниво.** Не в `if`, не в цикъл, не след ранно връщане. React разчита на реда им.
---
**Името започва с `use`.** Не е каприз — по него ESLint разпознава кода и проверява останалите правила.
```

```callout
{"type":"danger","title":"Hook в условие"}
---
Ако `useState` понякога се извиква, а понякога не, React обърква коя стойност на кой hook принадлежи. Условието се слага **вътре** в hook-а, не около него.
```

```quiz
{"id":"react-4-06-q1","question":"Какво е custom hook?","options":["Специален вид компонент","Функция с име, започващо с use, която ползва други hooks","Библиотека на React","Заместител на useEffect"],"answer":1,"explanation":"Няма нищо магическо — това е обикновена функция. Конвенцията с `use` позволява на React и на инструментите да я разпознаят като hook."}
```

```quiz
{"id":"react-4-06-q2","question":"Защо hooks не се извикват в условие?","options":["Заради производителността","Защото React ги свързва по реда на извикване при всяко рисуване","Защото ESLint не позволява","Могат, няма проблем"],"answer":1,"explanation":"React пази състоянието в списък и го разпознава по позицията. Пропуснат hook размества целия списък и стойностите отиват при грешните hooks."}
```

```takeaways
- Custom hook преизползва поведение, както компонентът преизползва изглед.
- Логиката за зареждане, съхранение и забавяне се вади навън и компонентът олеква.
- Hooks се викат само на най-горно ниво на компонент или друг hook.
- `useState(() => ...)` изчислява началната стойност само веднъж.
