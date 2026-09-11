---
module: "Модул 3: React & NextJS"
section: "State и събития"
sectionOrder: 2
title: "State е снимка, не жива стойност"
label: "react-3-03-snapshot"
---

Този урок обяснява поведението, което обърква най-много начинаещи. Изпълни примера, преди да четеш нататък.

```sandbox
{"title":"Три пъти +1 дава +1","height":400,"showConsole":true}
---
import {useState} from "react";

export default function App() {
  const [count, setCount] = useState(0);

  function tripleWrong() {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log("count вътре във функцията още е", count);
  }

  function tripleRight() {
    setCount(current => current + 1);
    setCount(current => current + 1);
    setCount(current => current + 1);
  }

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <p style={{fontSize: 28, margin: "0 0 10px"}}>{count}</p>
      <button onClick={tripleWrong}>+3 (счупено)</button>
      <button onClick={tripleRight} style={{marginLeft: 6}}>+3 (правилно)</button>
      <button onClick={() => setCount(0)} style={{marginLeft: 6}}>нулирай</button>
    </div>
  );
}
```

Първият бутон увеличава с 1. Вторият — с 3.

## Обяснението

При всяко рисуване React изпълнява компонента наново. `count` в това изпълнение е **фиксирано число** — снимка на състоянието в момента на рисуването. Не е жива връзка.

Ако `count` е 0, трите реда са буквално:

```javascript
setCount(0 + 1);
setCount(0 + 1);
setCount(0 + 1);
```

Три пъти едно и също. Затова резултатът е 1.

## Функционалната форма

Когато подадеш функция, React ѝ дава **последната изчакваща стойност**, а не снимката:

```javascript
setCount(current => current + 1);  // 0 -> 1
setCount(current => current + 1);  // 1 -> 2
setCount(current => current + 1);  // 2 -> 3
```

```callout
{"type":"tip","title":"Просто правило"}
---
Новата стойност зависи ли от старата — използвай функция. Не зависи ли (например `setQuery(text)` от поле) — подавай стойността направо.
```

## Групиране на обновяванията

React не пречертава след всяко `setState`. Събира промените от едно събитие и прави едно рисуване накрая.

```sandbox
{"title":"Едно рисуване, три промени","height":440,"showConsole":true}
---
import {useState} from "react";

export default function App() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  console.log("рисуване:", a, b, c);

  function changeAll() {
    setA(a + 1);
    setB(b + 2);
    setC(c + 3);
  }

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <p>a: {a} · b: {b} · c: {c}</p>
      <button onClick={changeAll}>Промени и трите</button>
      <p style={{fontSize: 13, color: "#666"}}>Виж конзолата: едно рисуване, не три.</p>
    </div>
  );
}
```

Това е добре за производителността — но означава, че веднага след `setState` старата стойност още е в сила.

```callout
{"type":"warn","title":"Не чакай новата стойност веднага"}
---
Ред след `setCount(count + 1)` променливата `count` още е старата. Ако ти трябва новата стойност веднага, изчисли я отделно: `const next = count + 1;` след това `setCount(next)` и работи с `next`.
```

## Асинхронният случай

```sandbox
{"title":"Снимката живее и в setTimeout","height":420}
---
import {useState} from "react";

export default function App() {
  const [name, setName] = useState("Ива");

  function greetLater() {
    setTimeout(() => {
      console.log("Здравей, " + name);
    }, 2000);
  }

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <input value={name} onChange={event => setName(event.target.value)} />
      <button onClick={greetLater} style={{marginLeft: 6}}>Поздрави след 2 сек</button>
      <p style={{fontSize: 13, color: "#666"}}>
        Натисни бутона, веднага смени името и изчакай. Поздравът ще е със старото име.
      </p>
    </div>
  );
}
```

Функцията в `setTimeout` е родена при онова рисуване и помни неговата снимка. Това не е бъг — това е closure от моста, на работа.

```quiz
{"id":"react-3-03-q1","question":"`count` е 5. Какво ще стане след `setCount(count + 1); setCount(count + 1);`?","options":["count става 7","count става 6","count става 5","Грешка"],"answer":1,"explanation":"И двата реда четат една и съща снимка (5) и заявяват 6. За 7 трябва функционална форма: `setCount(c => c + 1)` два пъти."}
```

```quiz
{"id":"react-3-03-q2","question":"Кога задължително се използва функционалната форма?","options":["Винаги","Когато новата стойност се смята от старата","Само при масиви","Само в useEffect"],"answer":1,"explanation":"Зависи ли новото от старото — функция. Иначе стойността се подава направо."}
```

```takeaways
- При всяко рисуване стойността от `useState` е фиксирана снимка.
- Зависи ли новата стойност от старата — `setValue(current => ...)`.
- React групира обновяванията от едно събитие в едно рисуване.
- Функциите, подадени в таймери и заявки, помнят снимката от своето рисуване.
