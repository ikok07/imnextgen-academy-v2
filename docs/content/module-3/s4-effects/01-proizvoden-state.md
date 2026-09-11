---
module: "Модул 3: React & NextJS"
section: "Мислене в React: ефекти и данни"
sectionOrder: 3
title: "Производен state: не дублирай истината"
label: "react-4-01-derived"
---

Най-честата грешка на хора, които вече могат да пишат React, е да пазят в състоянието неща, които могат да се сметнат.

## Как изглежда грешката

```sandbox
{"title":"Две истини, които се разминават","height":520}
---
import {useState} from "react";

export default function App() {
  const [items, setItems] = useState([{id: 1, price: 20}, {id: 2, price: 30}]);
  const [total, setTotal] = useState(50);

  function addItem() {
    setItems([...items, {id: Date.now(), price: 10}]);
    // тук „забравяме“ да обновим total - точно както се случва в реален проект
  }

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <p>Артикули: {items.length}</p>
      <p>Сума в състоянието: <strong>{total} лв.</strong></p>
      <p>Истинската сума: <strong>{items.reduce((sum, item) => sum + item.price, 0)} лв.</strong></p>
      <button onClick={addItem}>Добави артикул за 10 лв.</button>
      <p style={{fontSize: 13, color: "#666"}}>Натисни веднъж и виж как двете числа се разделят завинаги.</p>
    </div>
  );
}
```

`total` е второ копие на истина, която вече я има в `items`. Всяко място, което променя `items`, трябва да помни да обнови и `total`. Рано или късно едно място забравя.

## Как се прави правилно

```sandbox
{"title":"Една истина, всичко останало се смята","height":480}
---
import {useState} from "react";

export default function App() {
  const [items, setItems] = useState([{id: 1, price: 20}, {id: 2, price: 30}]);
  const [discount, setDiscount] = useState(0);

  const total = items.reduce((sum, item) => sum + item.price, 0);
  const finalTotal = total - total * discount;
  const isEmpty = items.length === 0;

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <p>Артикули: {items.length}</p>
      <p>Сума: {total} лв.</p>
      <p>С намаление: <strong>{finalTotal.toFixed(2)} лв.</strong></p>

      <button onClick={() => setItems([...items, {id: Date.now(), price: 10}])}>Добави</button>
      <button onClick={() => setItems([])} style={{marginLeft: 6}}>Изпразни</button>
      <button onClick={() => setDiscount(discount === 0 ? 0.2 : 0)} style={{marginLeft: 6}}>
        {discount === 0 ? "Приложи -20%" : "Махни намалението"}
      </button>

      {isEmpty && <p style={{color: "#999"}}>Количката е празна.</p>}
    </div>
  );
}
```

`total`, `finalTotal` и `isEmpty` са обикновени променливи. Пресмятат се при всяко рисуване и **не могат** да се разминат с данните.

## Кое е състояние и кое не

```steps
{"title":"Три въпроса"}
---
**Може ли да се сметне от друго състояние или props?** Ако да — не е състояние.
---
**Остава ли непроменено през целия живот на компонента?** Ако да — обикновена константа извън компонента.
---
**Променя ли се от потребителя или отвън?** Само тогава е състояние.
```

| Изглежда като състояние | Всъщност е |
| --- | --- |
| Брой активни задачи | `todos.filter(...).length` |
| Пълно име | `` `${first} ${last}` `` |
| Филтриран списък | `items.filter(...)` при рисуването |
| Дали формата е валидна | проверка върху полетата |
| Избраният елемент | състояние — но пази **id**, не копие на обекта |

```callout
{"type":"warn","title":"Избраният елемент: пази id, не обекта"}
---
Ако запазиш целия обект и после го редактираш в списъка, избраното копие остава старо. Пази `selectedId` и намирай обекта при рисуването: `items.find(item => item.id === selectedId)`.
```

```sandbox
{"title":"Избор по id","height":520}
---
import {useState} from "react";

export default function App() {
  const [items, setItems] = useState([
    {id: 1, name: "Лаптоп", price: 1200},
    {id: 2, name: "Мишка", price: 30}
  ]);
  const [selectedId, setSelectedId] = useState(1);

  const selected = items.find(item => item.id === selectedId);

  function raisePrice() {
    setItems(items.map(item => item.id === selectedId ? {...item, price: item.price + 100} : item));
  }

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      {items.map(item => (
        <button
          key={item.id}
          onClick={() => setSelectedId(item.id)}
          style={{marginRight: 6, fontWeight: item.id === selectedId ? 700 : 400}}
        >
          {item.name}
        </button>
      ))}

      <p>Избран: {selected ? `${selected.name} — ${selected.price} лв.` : "няма"}</p>
      <button onClick={raisePrice}>Вдигни цената със 100</button>
      <p style={{fontSize: 13, color: "#666"}}>Цената горе се обновява веднага, защото обектът се намира наново при всяко рисуване.</p>
    </div>
  );
}
```

```quiz
{"id":"react-4-01-q1","question":"Имаш `todos` в състоянието. Къде да живее броят на завършените?","options":["В отделно състояние, обновявано при всяка промяна","Смята се при рисуването от todos","В useEffect, който го записва в състояние","В глобална променлива"],"answer":1,"explanation":"Изчислима стойност се смята при рисуването. Отделното ѝ пазене създава второ копие на истината, което рано или късно се разминава."}
```

```quiz
{"id":"react-4-01-q2","question":"Защо е по-добре да пазиш `selectedId` вместо целия избран обект?","options":["Заради по-малко памет","Защото копието на обекта остарява, когато списъкът се промени","Защото React не може да пази обекти в състояние","Няма значение"],"answer":1,"explanation":"Копието е снимка. Промениш ли елемента в списъка, избраният обект остава стар. С id обектът се намира наново при всяко рисуване."}
```

```takeaways
- Всичко, изчислимо от състоянието, се смята при рисуването.
- Дублираната истина винаги се разминава — въпрос на време.
- За избор пази идентификатор, не копие на обекта.
