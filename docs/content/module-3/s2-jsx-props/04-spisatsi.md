---
module: "Модул 3: React & NextJS"
section: "Компоненти, JSX и props"
sectionOrder: 1
title: "Списъци с map и key"
label: "react-2-04-lists"
---

Всеки списък на екрана се ражда от `map`. Това е мястото, където JavaScript-ът от моста си плаща.

```sandbox
{"title":"От масив към елементи","height":420}
---
const students = [
  {id: "s1", name: "Ива", module: "JavaScript"},
  {id: "s2", name: "Георги", module: "React"},
  {id: "s3", name: "Мария", module: "HTML + CSS"}
];

function StudentRow({name, module}) {
  return <li><strong>{name}</strong> — {module}</li>;
}

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <h3>Курсисти</h3>
      <ul>
        {students.map(student => (
          <StudentRow key={student.id} name={student.name} module={student.module} />
        ))}
      </ul>
    </div>
  );
}
```

Схемата е винаги една и съща: масив → `map` → компонент за всеки елемент → `key`.

## key: защо React настоява

`key` е стабилен идентификатор, по който React разпознава кой елемент кой е между две рисувания. Без него React сравнява по позиция — и когато списъкът се пренареди, състоянието на елементите се разминава с данните.

```sandbox
{"title":"Виж какво чупи индексът като key","height":500}
---
import {useState} from "react";

export default function App() {
  const [items, setItems] = useState([
    {id: "a", label: "Ябълка"},
    {id: "b", label: "Банан"},
    {id: "c", label: "Череша"}
  ]);

  function addFirst() {
    const id = Math.random().toString(36).slice(2, 6);
    setItems([{id, label: "Нов " + id}, ...items]);
  }

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <button onClick={addFirst}>Добави отпред</button>

      <p style={{marginBottom: 4}}>key = index (счупено):</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <input placeholder="напиши нещо" /> {item.label}
          </li>
        ))}
      </ul>

      <p style={{marginBottom: 4}}>key = id (правилно):</p>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <input placeholder="напиши нещо" /> {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Напиши нещо в първото поле на **всеки** от двата списъка, после натисни "Добави отпред". В горния списък текстът остава на първия ред и се залепя за новия елемент. В долния пътува заедно със своя ред.

```callout
{"type":"danger","title":"Кога индексът все пак става"}
---
Само когато списъкът е статичен: не се пренарежда, не се добавя и не се трие от него. Във всеки друг случай ти трябва стабилен `id`, дошъл от данните.
```

## Празен списък

```sandbox
{"title":"Какво показваме, когато няма нищо","height":420}
---
function List({items}) {
  if (items.length === 0) {
    return <p style={{color: "#777"}}>Няма записи. Добави първия.</p>;
  }

  return <ul>{items.map(item => <li key={item.id}>{item.label}</li>)}</ul>;
}

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <h4>С данни</h4>
      <List items={[{id: 1, label: "Първо"}, {id: 2, label: "Второ"}]} />
      <h4>Без данни</h4>
      <List items={[]} />
    </div>
  );
}
```

Празното състояние не е дребен детайл — то е първото, което вижда новият потребител.

## Филтриране и подреждане преди рисуване

```sandbox
{"title":"Веригата от моста, но на екран","height":460}
---
const products = [
  {id: 1, name: "Лаптоп", price: 1200, inStock: true},
  {id: 2, name: "Мишка", price: 30, inStock: false},
  {id: 3, name: "Стол", price: 210, inStock: true}
];

export default function App() {
  const visible = products
    .filter(product => product.inStock)
    .sort((a, b) => a.price - b.price);

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <h3>В наличност ({visible.length})</h3>
      <ul>
        {visible.map(product => (
          <li key={product.id}>{product.name} — {product.price} лв.</li>
        ))}
      </ul>
    </div>
  );
}
```

```callout
{"type":"warn","title":"sort пак чупи"}
---
Тук `sort` работи върху резултата от `filter`, който вече е нов масив — затова е безопасно. Ако някога подредиш направо масива от props, ще промениш данните на родителя. Помни `[...items].sort(...)`.
```

```quiz
{"id":"react-2-04-q1","question":"Защо `key` не бива да е индексът при списък, от който се трие?","options":["Защото индексът е число, а key трябва да е текст","Защото при промяна елементите получават чужди ключове и състоянието им се разминава","Защото React не приема числа за ключове","Защото е по-бавно"],"answer":1,"explanation":"Ключът казва на React „това е същият елемент\". Индексът се мести при всяка промяна на списъка, така че React залепя старото състояние за нов елемент."}
```

```quiz
{"id":"react-2-04-q2","question":"Къде се слага `key`?","options":["На най-външния елемент, върнат от map","На всеки елемент в списъка","На родителския `ul`","Вътре в компонента, който се рисува"],"answer":0,"explanation":"Ключът стои на елемента, който `map` връща директно — не вътре в компонента и не на контейнера."}
```

```takeaways
- Списък = `map` върху масив + компонент + `key`.
- `key` е стабилен идентификатор от данните, не индекс.
- Празното състояние е част от работата, не изключение.
- `filter` и `sort` се прилагат преди рисуването; `sort` — винаги върху копие.
