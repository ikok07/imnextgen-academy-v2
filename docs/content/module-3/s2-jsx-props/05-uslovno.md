---
module: "Модул 3: React & NextJS"
section: "Компоненти, JSX и props"
sectionOrder: 1
title: "Условно рендиране"
label: "react-2-05-conditional"
---

В JSX не може да се пише `if`, защото там влизат само изрази. Има четири начина да покажеш нещо само при определено условие — и един капан, в който всеки пада поне веднъж.

## 1. Тернарен оператор

```sandbox
{"title":"Едното или другото","height":380}
---
function Status({isOnline}) {
  return (
    <p>
      Състояние: {isOnline
        ? <span style={{color: "green"}}>на линия</span>
        : <span style={{color: "#999"}}>офлайн</span>}
    </p>
  );
}

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <Status isOnline={true} />
      <Status isOnline={false} />
    </div>
  );
}
```

## 2. Операторът &&

Когато има само "показвам" и "не показвам":

```javascript
{hasNewMessages && <span className="dot" />}
```

```callout
{"type":"danger","title":"Капанът с нулата"}
---
`{items.length && <List />}` при празен масив показва **0** на екрана, защото `0` не е `false`, а React рисува числата.

Пиши условието изрично: `{items.length > 0 && <List />}`.
```

```sandbox
{"title":"Виж нулата с очите си","height":380}
---
export default function App() {
  const empty = [];

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <p>Счупено: [{empty.length && <span>има нещо</span>}]</p>
      <p>Правилно: [{empty.length > 0 && <span>има нещо</span>}]</p>
    </div>
  );
}
```

## 3. Ранно връщане

Най-четимият вариант, когато целият компонент зависи от условието:

```sandbox
{"title":"Излизаме рано","height":420}
---
function Profile({user, loading}) {
  if (loading) return <p>Зарежда се...</p>;
  if (!user) return <p style={{color: "#b91c1c"}}>Няма такъв потребител.</p>;

  return (
    <div>
      <h3 style={{marginBottom: 4}}>{user.name}</h3>
      <p style={{margin: 0, color: "#666"}}>{user.email}</p>
    </div>
  );
}

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <Profile loading={true} />
      <Profile loading={false} user={null} />
      <Profile loading={false} user={{name: "Ива", email: "iva@example.com"}} />
    </div>
  );
}
```

Три реда, три ясни случая, без вложени тернарни оператори.

## 4. Обект като превключвател

Когато случаите са повече от два:

```sandbox
{"title":"Вместо стълба от условия","height":420}
---
const BADGES = {
  pending: {text: "Чака преглед", color: "#b45309", background: "#fef3c7"},
  approved: {text: "Приета", color: "#15803d", background: "#dcfce7"},
  rejected: {text: "Върната", color: "#b91c1c", background: "#fee2e2"}
};

function StatusBadge({status}) {
  const badge = BADGES[status] ?? {text: "Неизвестно", color: "#555", background: "#eee"};

  return (
    <span style={{background: badge.background, color: badge.color, padding: "2px 10px", borderRadius: 12, marginRight: 8, fontSize: 13}}>
      {badge.text}
    </span>
  );
}

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <StatusBadge status="pending" />
      <StatusBadge status="approved" />
      <StatusBadge status="rejected" />
      <StatusBadge status="нещо друго" />
    </div>
  );
}
```

```callout
{"type":"tip","title":"Кое кога"}
---
Две прости стойности — тернарен оператор. Показвам или не — `&&` с изрично условие. Целият компонент зависи от условието — ранно връщане. Три и повече случая — обект.
```

```quiz
{"id":"react-2-05-q1","question":"Какво ще се появи на екрана при `{cart.length && <Cart />}`, ако количката е празна?","options":["Нищо","Числото 0","false","Грешка"],"answer":1,"explanation":"`0` е лъжлива стойност, затова `&&` връща нея — а React рисува числата. Затова условието се пише изрично: `cart.length > 0 && ...`."}
```

```quiz
{"id":"react-2-05-q2","question":"Кой подход е най-четим, когато компонентът има три различни състояния (зарежда се, грешка, данни)?","options":["Вложени тернарни оператори","Ранно връщане за всяко състояние","Няколко `&&` едно след друго","switch вътре в JSX"],"answer":1,"explanation":"Ранните връщания държат всеки случай на един ред и не вгнездяват нищо. Вложените тернарни оператори стават нечетими още при третия случай."}
```

```takeaways
- В JSX влизат изрази, затова `if` се заменя с тернарен оператор, `&&`, ранно връщане или обект.
- `&&` изисква изрично булево условие — иначе `0` се появява на екрана.
- Ранното връщане е най-четимо при няколко състояния на целия компонент.
