---
module: "Модул 3: React & NextJS"
section: "Мислене в React: ефекти и данни"
sectionOrder: 3
title: "Зареждане, грешка, празно"
label: "react-4-05-ui-states"
---

Начинаещият прави един екран: този с данните. Всеки реален екран има поне четири състояния и потребителят среща всичките.

```steps
{"title":"Четирите състояния"}
---
**Зарежда се** — заявката е тръгнала, отговор още няма.
---
**Грешка** — мрежата падна, сървърът върна 500, потребителят е офлайн.
---
**Празно** — заявката успя, но резултатите са нула.
---
**Данни** — единственото, за което всички се сещат.
```

```sandbox
{"title":"Четирите състояния едно до друго","height":620}
---
import {useState} from "react";

function UserList({state, users, error, onRetry}) {
  if (state === "loading") {
    return (
      <div>
        {[1, 2, 3].map(n => (
          <div key={n} style={{height: 44, background: "#eee", borderRadius: 6, marginBottom: 8, animation: "pulse 1.5s infinite"}} />
        ))}
        <style>{`@keyframes pulse {0%,100%{opacity:1}50%{opacity:.5}}`}</style>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div style={{border: "1px solid #fecaca", background: "#fef2f2", borderRadius: 8, padding: 14}}>
        <p style={{margin: "0 0 8px", color: "#b91c1c"}}>Не успяхме да заредим данните.</p>
        <p style={{margin: "0 0 10px", fontSize: 13, color: "#7f1d1d"}}>{error}</p>
        <button onClick={onRetry}>Опитай пак</button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div style={{textAlign: "center", padding: 24, color: "#666"}}>
        <p style={{fontSize: 32, margin: 0}}>∅</p>
        <p style={{margin: "6px 0"}}>Още няма потребители.</p>
        <button>Покани първия</button>
      </div>
    );
  }

  return (
    <ul style={{paddingLeft: 18}}>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}

export default function App() {
  const [state, setState] = useState("loading");
  const users = state === "data" ? [{id: 1, name: "Ива"}, {id: 2, name: "Георги"}] : [];

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <div style={{marginBottom: 12}}>
        {["loading", "error", "empty", "data"].map(option => (
          <button key={option} onClick={() => setState(option)} style={{marginRight: 6, fontWeight: state === option ? 700 : 400}}>
            {option}
          </button>
        ))}
      </div>

      <UserList
        state={state}
        users={users}
        error="Сървърът върна 500"
        onRetry={() => setState("loading")}
      />
    </div>
  );
}
```

## Ред на проверките

Ранните връщания правят кода четим, но редът има значение:

```steps
---
Първо **зареждане** — докато чакаш, няма смисъл да гадаеш за останалото.
---
После **грешка** — при провал нямаш данни, които да покажеш.
---
После **празно** — заявката е успяла, просто резултатите са нула.
---
Накрая **данните**.
```

```callout
{"type":"warn","title":"Празно не значи грешка"}
---
„Няма намерени резултати за 'хляб'" и „Нещо се обърка" са различни съобщения с различни решения. Първото предлага да смени търсенето, второто — да опита пак.
```

```callout
{"type":"tip","title":"Скелет вместо въртележка"}
---
Сивите правоъгълници с формата на бъдещото съдържание (skeleton) се усещат по-бързи от въртящ се кръг, защото екранът не подскача, когато данните пристигнат.
```

## Едно състояние вместо три булеви

Три отделни булеви променливи позволяват невъзможни комбинации — например „зарежда се" и „грешка" едновременно.

```javascript
const [status, setStatus] = useState("idle"); // idle | loading | error | success
```

Едно поле с четири възможни стойности не може да бъде в две състояния наведнъж. Този подход води право към `useReducer` от следващата секция.

```quiz
{"id":"react-4-05-q1","question":"Кой е правилният ред на проверките в компонент, който зарежда данни?","options":["данни → празно → грешка → зареждане","зареждане → грешка → празно → данни","грешка → зареждане → данни → празно","Няма значение"],"answer":1,"explanation":"Докато се зарежда, останалото е без значение. При грешка няма данни. Празното се проверява само при успешна заявка."}
```

```quiz
{"id":"react-4-05-q2","question":"Защо едно поле `status` е по-добро от три булеви променливи?","options":["Заема по-малко памет","Не позволява невъзможни комбинации като „зарежда се и грешка едновременно“","По-лесно се пише","React го изисква"],"answer":1,"explanation":"Три булеви дават осем комбинации, от които повечето нямат смисъл. Едно поле с изброени стойности допуска само валидните състояния."}
```

```takeaways
- Всеки екран с данни има четири състояния, не едно.
- Ред на проверките: зареждане, грешка, празно, данни.
- Празно и грешка са различни съобщения с различни действия.
- Едно поле `status` е по-безопасно от няколко булеви флага.
