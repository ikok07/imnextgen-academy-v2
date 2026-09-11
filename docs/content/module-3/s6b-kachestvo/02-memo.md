---
module: "Модул 3: React & NextJS"
section: "Качество: производителност, достъпност и тестове"
sectionOrder: 6
title: "useMemo, useCallback и React.memo"
label: "react-q-02-memo"
---

Трите инструмента, които всички знаят по име и малцина ползват на място. Разликата между тях е проста, щом веднъж се подреди.

| Инструмент | Какво запомня |
| --- | --- |
| `useMemo` | **резултат** от изчисление |
| `useCallback` | **функция**, за да остане същата между рисуванията |
| `React.memo` | **компонент**, за да не се рисува при непроменени props |

## React.memo

Обвит с `memo`, компонентът се пречертава само ако props-ите му наистина са се променили.

```sandbox
{"title":"memo спира пречертаването","height":520,"showConsole":true}
---
import {useState, memo} from "react";

const Plain = ({label}) => {
  console.log("обикновен:", label);
  return <p style={{margin: "2px 0"}}>обикновен: {label}</p>;
};

const Memoized = memo(function Memoized({label}) {
  console.log("с memo:", label);
  return <p style={{margin: "2px 0"}}>с memo: {label}</p>;
});

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <button onClick={() => setCount(count + 1)}>Пречертай родителя: {count}</button>
      <Plain label="едно и също" />
      <Memoized label="едно и също" />
      <p style={{fontSize: 13, color: "#666"}}>
        Натискай бутона: в конзолата излиза само обикновеният.
      </p>
    </div>
  );
}
```

```callout
{"type":"danger","title":"memo се чупи от нов обект или функция"}
---
`memo` сравнява props плитко. Подадеш ли `style={{margin: 4}}` или `onClick={() => ...}`, при всяко рисуване това е **нов обект** и сравнението се проваля. Компонентът е обвит, а се рисува както преди — точно затова `memo` сам по себе си често не върши работа.
```

## useCallback

Решава точно горния проблем: пази функцията същата между рисуванията.

```sandbox
{"title":"С и без useCallback","height":580,"showConsole":true}
---
import {useState, useCallback, memo} from "react";

const Button = memo(function Button({onClick, children}) {
  console.log("бутон се рисува:", children);
  return <button onClick={onClick} style={{marginRight: 6}}>{children}</button>;
});

export default function App() {
  const [count, setCount] = useState(0);

  // нова функция при всяко рисуване -> memo не помага
  const unstable = () => console.log("натиснат нестабилен");

  // същата функция между рисуванията -> memo работи
  const stable = useCallback(() => console.log("натиснат стабилен"), []);

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <button onClick={() => setCount(count + 1)}>Пречертай: {count}</button>
      <div style={{marginTop: 10}}>
        <Button onClick={unstable}>нестабилен</Button>
        <Button onClick={stable}>стабилен</Button>
      </div>
      <p style={{fontSize: 13, color: "#666"}}>
        Натискай горния бутон и следи конзолата.
      </p>
    </div>
  );
}
```

`useCallback` има смисъл само когато функцията отива към компонент с `memo` или в масив със зависимости на ефект. Иначе е чист шум.

## useMemo

Запомня резултат от изчисление, докато зависимостите не се променят.

```sandbox
{"title":"Тежко смятане само когато трябва","height":600,"showConsole":true}
---
import {useState, useMemo} from "react";

function slowSum(limit) {
  console.log("смятам наново...");
  let total = 0;
  for (let i = 0; i < limit * 200000; i++) total += i % 7;
  return total;
}

export default function App() {
  const [limit, setLimit] = useState(5);
  const [text, setText] = useState("");

  const result = useMemo(() => slowSum(limit), [limit]);

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <p>Резултат: {result}</p>

      <button onClick={() => setLimit(limit + 1)}>Увеличи границата ({limit})</button>

      <div style={{marginTop: 10}}>
        <input
          value={text}
          onChange={event => setText(event.target.value)}
          placeholder="пиши тук"
          style={{padding: 8}}
        />
      </div>

      <p style={{fontSize: 13, color: "#666"}}>
        Писането в полето пречертава компонента, но „смятам наново“ излиза само при смяна на границата.
      </p>
    </div>
  );
}
```

Махни `useMemo` и всяка буква в полето ще задейства тежкото смятане.

## Правилото

```steps
---
**Не започвай с тях.** Първо подреждане на състоянието и `children`.
---
**Измери** с Profiler-а, че има реален проблем.
---
**`useMemo`** за наистина тежко изчисление или за обект/масив, който отива като prop към `memo` компонент.
---
**`useCallback`** само за функция, подадена към `memo` компонент или в зависимости на ефект.
---
**`React.memo`** за компонент, който се рисува често със същите props и е скъп.
```

```callout
{"type":"info","title":"React Compiler"}
---
Новият компилатор на React прави тези оптимизации автоматично и в новите проекти ръчното мемоизиране постепенно отпада. Докато не е навсякъде, правилото остава: измервай, после мемоизирай.
```

```quiz
{"id":"react-q-02-q1","question":"Обвил си компонент в `memo`, но той пак се рисува при всяко рисуване на родителя. Най-вероятната причина?","options":["memo не работи с функционални компоненти","Подаваш му нов обект или нова функция като prop","Липсва useMemo вътре в него","Родителят има състояние"],"answer":1,"explanation":"`memo` сравнява props плитко. Нов обект или стрелкова функция при всяко рисуване е различна стойност и сравнението се проваля."}
```

```quiz
{"id":"react-q-02-q2","question":"Кога `useCallback` е излишен?","options":["Когато функцията отива към компонент с memo","Когато функцията е в зависимостите на useEffect","Когато функцията се ползва само в onClick на обикновен бутон","Когато функцията е скъпа"],"answer":2,"explanation":"Обикновеният DOM бутон не се интересува дали функцията е същата. `useCallback` там само добавя код без полза."}
```

```takeaways
- `useMemo` пази резултат, `useCallback` пази функция, `React.memo` пази компонент.
- `memo` се проваля тихо, когато props са нов обект или нова функция.
- Всяко мемоизиране има цена: повече код и още един масив със зависимости за грешене.
- Мемоизирай след измерване, не преди.
