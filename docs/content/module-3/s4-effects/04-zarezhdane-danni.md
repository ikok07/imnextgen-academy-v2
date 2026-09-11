---
module: "Модул 3: React & NextJS"
section: "Мислене в React: ефекти и данни"
sectionOrder: 3
title: "Зареждане на данни от API"
label: "react-4-04-fetching"
---

Най-честата причина за ефект: приложението има нужда от данни, които са на сървър.

## Наивната версия и какво ѝ липсва

```sandbox
{"title":"Работи, но само в идеалния случай","height":480}
---
import {useState, useEffect} from "react";

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <h3>Потребители ({users.length})</h3>
      <ul style={{fontSize: 14}}>
        {users.map(user => <li key={user.id}>{user.name} — {user.email}</li>)}
      </ul>
    </div>
  );
}
```

Липсват три неща: индикатор за зареждане, обработка на грешка и отмяна, когато компонентът изчезне преди отговора.

## Пълната версия

```sandbox
{"title":"Как изглежда правилно","height":620}
---
import {useState, useEffect} from "react";

export default function App() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          {signal: controller.signal}
        );
        if (!response.ok) throw new Error("Сървърът върна " + response.status);

        const data = await response.json();
        setUser(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [userId]);

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <div style={{marginBottom: 12}}>
        {[1, 2, 3, 99].map(id => (
          <button key={id} onClick={() => setUserId(id)} style={{marginRight: 6, fontWeight: id === userId ? 700 : 400}}>
            {id === 99 ? "несъществуващ" : "потребител " + id}
          </button>
        ))}
      </div>

      {loading && <p>Зарежда се...</p>}
      {error && <p style={{color: "#dc2626"}}>Грешка: {error}</p>}
      {!loading && !error && user && (
        <div style={{border: "1px solid #ddd", borderRadius: 8, padding: 12}}>
          <strong>{user.name}</strong>
          <p style={{margin: "4px 0", color: "#666"}}>{user.email}</p>
          <p style={{margin: 0, color: "#666"}}>{user.address?.city}</p>
        </div>
      )}
    </div>
  );
}
```

```steps
{"title":"Какво прави всяка част"}
---
**`setLoading(true)` в началото** на всяко зареждане — иначе при смяна на потребителя екранът показва стария, докато идва новият.
---
**`response.ok`** — `fetch` не гърми при 404, помниш ли.
---
**`AbortController`** — ако компонентът изчезне или потребителят щракне друго id, старата заявка се отменя. Без това по-бавният отговор може да пристигне последен и да презапише по-новия.
---
**`err.name !== "AbortError"`** — отменената заявка не е грешка на приложението.
---
**`finally`** — гаси индикатора и при успех, и при провал.
```

```callout
{"type":"danger","title":"Състезанието между заявките"}
---
Потребителят щраква бързо 1 → 2 → 3. Ако отговорът за 1 закъснее, той пристига последен и презаписва данните за 3. Отмяната решава точно това — и е причината този проблем да не съществува в React Query, което идва след две секции.
```

## Заявка при действие, не при рисуване

```callout
{"type":"warn","title":"Изпращането на форма не е ефект"}
---
Заявка `POST` при натискане на бутон се прави в обработчика на събитието, не в `useEffect`. Ефектът е за синхронизация, обработчикът е за действие.
```

```quiz
{"id":"react-4-04-q1","question":"Защо в ефект за зареждане се ползва AbortController?","options":["За да е по-бърза заявката","За да се отмени заявката, когато компонентът изчезне или зависимостта се смени","Защото fetch го изисква","За да се хванат 404 грешките"],"answer":1,"explanation":"Иначе закъснял отговор от стара заявка може да презапише резултата от по-новата, а компонент, който вече го няма, получава обновяване на състояние."}
```

```quiz
{"id":"react-4-04-q2","question":"Къде се прави POST заявка при изпращане на форма?","options":["В useEffect със зависимост формата","В обработчика onSubmit","В отделен компонент","При първото рисуване"],"answer":1,"explanation":"Действието е предизвикано от събитие, значи мястото му е в обработчика. `useEffect` е за синхронизация, не за реакция на клик."}
```

```takeaways
- Зареждането на данни при показване на компонент е класически ефект.
- Четирите задължителни части: индикатор, проверка на отговора, обработка на грешка, отмяна.
- Без отмяна закъснелите отговори презаписват новите.
- Заявки, предизвикани от действие на потребителя, стоят в обработчика.
