---
module: "Модул 3: React & NextJS"
section: "Мислене в React: ефекти и данни"
sectionOrder: 3
title: "useRef: стойност без рисуване и достъп до DOM"
label: "react-4-07-useref"
---

`useRef` върши две различни работи. Полезно е да ги разделиш в главата си от самото начало.

## 1. Достъп до DOM елемент

```sandbox
{"title":"Фокус и превъртане","height":500}
---
import {useRef} from "react";

export default function App() {
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <input ref={inputRef} placeholder="ще получа фокус" style={{padding: 8, width: 200}} />
      <button onClick={() => inputRef.current.focus()} style={{marginLeft: 6}}>Фокусирай</button>
      <button onClick={() => inputRef.current.select()} style={{marginLeft: 6}}>Маркирай</button>

      <div style={{height: 160, overflow: "auto", border: "1px solid #ddd", marginTop: 14, padding: 8}}>
        {Array.from({length: 12}, (_, index) => <p key={index}>Ред {index + 1}</p>)}
        <div ref={bottomRef} />
      </div>
      <button onClick={() => bottomRef.current.scrollIntoView({behavior: "smooth"})} style={{marginTop: 8}}>
        Превърти до края
      </button>
    </div>
  );
}
```

Слагаш `ref={нещо}` на елемента и после го намираш в `нещо.current`. Това е позволената форма на ръчно пипане на DOM — за фокус, превъртане, размери и медийни елементи.

```callout
{"type":"warn","title":"Не за промяна на съдържание"}
---
`ref.current.innerHTML = ...` заобикаля React и промяната изчезва при следващото рисуване. Съдържанието се променя през състояние. Ref е за действия, които React не покрива: фокус, превъртане, `play()`, измерване.
```

## 2. Стойност, която оцелява, но не предизвиква рисуване

```sandbox
{"title":"Ref срещу state","height":540,"showConsole":true}
---
import {useState, useRef} from "react";

export default function App() {
  const [stateCount, setStateCount] = useState(0);
  const refCount = useRef(0);

  console.log("рисуване");

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <p>state: {stateCount}</p>
      <p>ref: {refCount.current} <span style={{fontSize: 13, color: "#666"}}>(не се обновява на екрана)</span></p>

      <button onClick={() => setStateCount(stateCount + 1)}>state +1</button>
      <button onClick={() => { refCount.current += 1; console.log("ref е", refCount.current); }} style={{marginLeft: 6}}>
        ref +1
      </button>
      <p style={{fontSize: 13, color: "#666"}}>
        Натискай „ref +1“ — конзолата брои, екранът не мърда. После натисни „state +1“ и ref-ът внезапно се показва.
      </p>
    </div>
  );
}
```

| | `useState` | `useRef` |
| --- | --- | --- |
| Промяната пречертава | да | не |
| Оцелява между рисуванията | да | да |
| Чете се като | `value` | `ref.current` |
| За какво | всичко, което се вижда | всичко, което не се вижда |

Типични употреби: id на таймер, предишна стойност, брояч на опити, флаг „вече изпратено".

```sandbox
{"title":"Таймер, управляван с ref","height":520}
---
import {useState, useRef} from "react";

export default function App() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  function start() {
    if (intervalRef.current) return;
    setRunning(true);
    intervalRef.current = setInterval(() => setSeconds(current => current + 1), 1000);
  }

  function stop() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setRunning(false);
  }

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <p style={{fontSize: 32, margin: "0 0 10px"}}>{seconds}s</p>
      <button onClick={start} disabled={running}>Старт</button>
      <button onClick={stop} disabled={!running} style={{marginLeft: 6}}>Стоп</button>
      <button onClick={() => { stop(); setSeconds(0); }} style={{marginLeft: 6}}>Нулирай</button>
    </div>
  );
}
```

Идентификаторът на интервала не се показва никъде — значи няма работа в състоянието.

```callout
{"type":"tip","title":"Простият тест"}
---
Показва ли се стойността на екрана? → състояние. Не се ли показва, а само трябва да я помниш? → ref.
```

```quiz
{"id":"react-4-07-q1","question":"Какво става, когато промениш `ref.current`?","options":["Компонентът се пречертава","Нищо видимо — стойността просто се запазва","React хвърля грешка","Всички деца се пречертават"],"answer":1,"explanation":"Промяната на ref не предизвиква рисуване. Затова е подходящ за стойности, които не се показват — и напълно неподходящ за тези, които се показват."}
```

```quiz
{"id":"react-4-07-q2","question":"Кое от изброените е подходяща работа за useRef?","options":["Текстът в полето за търсене","Идентификаторът на активен setInterval","Списъкът с продукти","Дали менюто е отворено"],"answer":1,"explanation":"Идентификаторът на таймера не се показва никъде — трябва само да го помниш, за да го спреш. Останалите три се виждат на екрана, значи са състояние."}
```

```takeaways
- `ref={...}` дава достъп до DOM елемент през `ref.current` — за фокус, превъртане, измерване.
- `useRef` пази и обикновени стойности между рисуванията, без да предизвиква рисуване.
- Вижда ли се на екрана — състояние. Не се ли вижда — ref.
