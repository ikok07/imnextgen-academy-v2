---
module: "Модул 3: React & NextJS"
section: "State и събития"
sectionOrder: 2
title: "useState: паметта на компонента"
label: "react-3-02-usestate"
---

Обикновената променлива в компонент не работи така, както очакваш:

```sandbox
{"title":"Защо това не работи","height":380}
---
export default function App() {
  let count = 0;

  function increase() {
    count = count + 1;
    console.log("променливата е", count);
  }

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <p>Брояч: {count}</p>
      <button onClick={increase}>+1</button>
      <p style={{fontSize: 13, color: "#666"}}>Числото на екрана не мърда.</p>
    </div>
  );
}
```

Две причини. Първо, React не знае, че нещо се е променило — никой не му е казал да пречертае. Второ, дори да пречертаеше, функцията щеше да се изпълни отначало и `count` пак щеше да е 0.

Нужно е нещо, което **оцелява между рисуванията** и **предизвиква ново рисуване**. Това е `useState`.

```sandbox
{"title":"Същото, с useState","height":380}
---
import {useState} from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <p style={{fontSize: 28, margin: "0 0 10px"}}>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)} style={{marginLeft: 6}}>-1</button>
      <button onClick={() => setCount(0)} style={{marginLeft: 6}}>нулирай</button>
    </div>
  );
}
```

## Как се чете редът

```javascript
const [count, setCount] = useState(0);
```

```steps
---
`useState(0)` казва: „дай ми състояние с начална стойност 0". Началната стойност се ползва само при първото рисуване.
---
Връща масив с две неща, който деструктурираме: **текущата стойност** и **функция за промяна**.
---
Имената са по твой избор, но конвенцията е `[нещо, setНещо]`. Не я нарушавай — всеки React проект изглежда така.
---
Извикването на `setCount` прави две неща: запомня новата стойност и казва на React да пречертае компонента.
```

```callout
{"type":"danger","title":"Не пипай стойността директно"}
---
`count = 5` или `todos.push(item)` не правят нищо видимо. React разбира за промяната само през функцията за промяна. Всяко обновяване минава през `setCount`.
```

## Състоянието е на всеки екземпляр поотделно

```sandbox
{"title":"Три брояча, три отделни състояния","height":400}
---
import {useState} from "react";

function Counter({label}) {
  const [count, setCount] = useState(0);

  return (
    <div style={{border: "1px solid #ddd", borderRadius: 8, padding: 12, width: 130, textAlign: "center"}}>
      <p style={{margin: "0 0 6px", fontSize: 13, color: "#666"}}>{label}</p>
      <strong style={{fontSize: 22}}>{count}</strong>
      <div><button onClick={() => setCount(count + 1)} style={{marginTop: 8}}>+1</button></div>
    </div>
  );
}

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16, display: "flex", gap: 12}}>
      <Counter label="Първи" />
      <Counter label="Втори" />
      <Counter label="Трети" />
    </div>
  );
}
```

Един и същи компонент, три независими памети. Състоянието принадлежи на екземпляра, не на функцията.

## Колко състояния

Толкова, колкото са независимите неща:

```javascript
const [query, setQuery] = useState("");
const [page, setPage] = useState(1);
const [isOpen, setIsOpen] = useState(false);
```

```callout
{"type":"tip","title":"Кое НЕ е състояние"}
---
Ако нещо може да се сметне от съществуващите данни — то не е състояние. Броят на активните задачи се смята от списъка. Пълното име се смята от името и фамилията. Дублираната истина винаги се разминава рано или късно.
```

```quiz
{"id":"react-3-02-q1","question":"Защо обикновена променлива в компонент не върши работа за брояч?","options":["Защото JavaScript не позволява промяна на let","Защото не предизвиква ново рисуване и се нулира при всяко изпълнение на компонента","Защото React забранява променливи в компоненти","Защото трябва да е const"],"answer":1,"explanation":"Компонентът е функция, която се изпълнява отново при всяко рисуване. Локалната променлива се създава наново, а React не разбира, че нещо се е променило."}
```

```quiz
{"id":"react-3-02-q2","question":"Кое от изброените НЕ трябва да е състояние?","options":["Текстът в полето за търсене","Дали менюто е отворено","Броят на резултатите, който се смята от списъка","Текущата страница"],"answer":2,"explanation":"Стойност, която се смята от друга стойност, се смята при рисуването. Държиш ли я отделно, рано или късно двете се разминават."}
```

```takeaways
- `const [value, setValue] = useState(начална)` дава памет, която оцелява между рисуванията.
- Промяна само през функцията за промяна — иначе React не разбира.
- Всеки екземпляр на компонента има собствено състояние.
- Каквото може да се сметне, не се пази като състояние.
