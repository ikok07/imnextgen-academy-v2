---
module: "Модул 3: React & NextJS"
section: "Качество: производителност, достъпност и тестове"
sectionOrder: 6
title: "useTransition и useDeferredValue"
label: "react-q-04-transitions"
---

Има един вид бавност, която `memo` не решава: интерфейс, който заяква, докато пишеш. Причината е, че React изпълнява всичко с еднакъв приоритет — и една буква в полето задейства пресмятане на хиляда реда, преди буквата да се появи на екрана.

## Проблемът, на живо

```sandbox
{"title":"Полето заяква","height":620}
---
import {useState} from "react";

const ITEMS = Array.from({length: 4000}, (_, index) => "Продукт номер " + index);

function SlowList({query}) {
  const visible = ITEMS.filter(item => item.includes(query));

  return (
    <ul style={{height: 180, overflow: "auto", margin: "10px 0", paddingLeft: 18}}>
      {visible.slice(0, 200).map(item => <li key={item} style={{fontSize: 13}}>{item}</li>)}
    </ul>
  );
}

export default function App() {
  const [query, setQuery] = useState("");

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <input
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="пиши бързо: 123"
        style={{padding: 8, width: 220}}
      />
      <SlowList query={query} />
      <p style={{fontSize: 13, color: "#666"}}>
        Пиши бързо няколко цифри и усети закъснението между натискането и буквата на екрана.
      </p>
    </div>
  );
}
```

Буквата и списъкът се обновяват заедно. А те не са еднакво важни: буквата трябва да се появи веднага, списъкът може да изчака сто милисекунди.

## useDeferredValue

Казва на React: дръж тази стойност „с една крачка назад", ако има по-спешна работа.

```sandbox
{"title":"Същият списък, но полето остава пъргаво","height":660}
---
import {useState, useDeferredValue} from "react";

const ITEMS = Array.from({length: 4000}, (_, index) => "Продукт номер " + index);

function SlowList({query}) {
  const visible = ITEMS.filter(item => item.includes(query));

  return (
    <ul style={{height: 180, overflow: "auto", margin: "10px 0", paddingLeft: 18}}>
      {visible.slice(0, 200).map(item => <li key={item} style={{fontSize: 13}}>{item}</li>)}
    </ul>
  );
}

export default function App() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const stale = query !== deferredQuery;

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <input
        value={query}
        onChange={event => setQuery(event.target.value)}
        placeholder="пиши бързо: 123"
        style={{padding: 8, width: 220}}
      />
      {stale && <span style={{marginLeft: 8, fontSize: 13, color: "#5C45FD"}}>обновява се...</span>}

      <div style={{opacity: stale ? 0.6 : 1, transition: "opacity 150ms"}}>
        <SlowList query={deferredQuery} />
      </div>

      <p style={{fontSize: 13, color: "#666"}}>
        Полето реагира моментално, списъкът наваксва след него.
      </p>
    </div>
  );
}
```

Един ред разлика. Полето ползва `query` и се обновява веднага; списъкът ползва `deferredQuery` и наваксва, когато React има време. Сравнението между двете дава безплатен индикатор „обновява се".

## useTransition

Същата идея, но маркираш **действие**, а не стойност. Полезно, когато сам решаваш кое обновяване е второстепенно.

```sandbox
{"title":"Смяна на таб без замръзване","height":640}
---
import {useState, useTransition} from "react";

function HeavyTab({name}) {
  const rows = Array.from({length: 2500}, (_, index) => `${name} — ред ${index}`);
  return (
    <ul style={{height: 170, overflow: "auto", paddingLeft: 18, marginTop: 10}}>
      {rows.slice(0, 150).map(row => <li key={row} style={{fontSize: 13}}>{row}</li>)}
    </ul>
  );
}

export default function App() {
  const [tab, setTab] = useState("Първи");
  const [isPending, startTransition] = useTransition();

  function select(next) {
    startTransition(() => setTab(next));
  }

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      {["Първи", "Втори", "Трети"].map(name => (
        <button
          key={name}
          onClick={() => select(name)}
          style={{marginRight: 6, fontWeight: tab === name ? 700 : 400}}
        >
          {name}
        </button>
      ))}

      {isPending && <span style={{marginLeft: 8, fontSize: 13, color: "#5C45FD"}}>зарежда се...</span>}

      <div style={{opacity: isPending ? 0.6 : 1}}>
        <HeavyTab name={tab} />
      </div>
    </div>
  );
}
```

Без `startTransition` интерфейсът замръзва между натискането и появата на новия таб — бутонът дори не успява да се оцвети. С него натискането е мигновено, а тежката част пристига след миг.

```callout
{"type":"warn","title":"Не е заместител на оптимизация"}
---
Тези два hook-а не правят кода по-бърз. Правят приложението **по-отзивчиво**, като подреждат кое да стане първо. Ако филтрирането на списъка отнема две секунди, то ще отнема две секунди и с `useDeferredValue` — просто полето няма да заяква.
```

## Кое кога

| Ситуация | Инструмент |
| --- | --- |
| Бавен резултат зависи от бързо поле | `useDeferredValue` |
| Сам предизвикваш тежко обновяване (смяна на таб, филтър, сортиране) | `useTransition` |
| Тежко изчисление със същите входни данни | `useMemo` |
| Тежка библиотека, която не трябва веднага | `lazy` |

```quiz
{"id":"react-q-04-q1","question":"Какво прави `useDeferredValue(query)`?","options":["Забавя въвеждането с фиксирано време","Връща стойност, която наваксва след по-спешните обновявания","Кешира резултата от филтрирането","Прекъсва заявките към сървъра"],"answer":1,"explanation":"Не е таймер. React дава приоритет на спешното (буквата в полето), а отложената стойност догонва, когато има време."}
```

```quiz
{"id":"react-q-04-q2","question":"Филтрирането на списъка отнема 2 секунди. Какво ще направи `useTransition`?","options":["Ще го сведе до милисекунди","Ще остави интерфейса отзивчив, но филтрирането пак ще отнеме 2 секунди","Ще го изпълни на сървъра","Нищо"],"answer":1,"explanation":"Преходите подреждат приоритети, не ускоряват смятането. За самото смятане трябва друг подход — по-малко данни, индекс или сървър."}
```

```takeaways
- Интерфейсът заяква, защото React третира всичко като еднакво спешно.
- `useDeferredValue` оставя стойност да наваксва; `useTransition` маркира действие като второстепенно.
- Сравнението между текущата и отложената стойност дава безплатен индикатор „обновява се“.
- Двата hook-а правят приложението отзивчиво, не по-бързо.
