---
module: "Модул 3: React & NextJS"
section: "State и събития"
sectionOrder: 2
title: "Обекти и масиви в състоянието"
label: "react-3-05-object-state"
---

Състоянието рядко е едно число. Обикновено е обект или масив — и точно тук неизменяемостта от моста става задължителна, а не препоръчителна.

## Защо push не работи

```sandbox
{"title":"Промяна на място срещу нов масив","height":460}
---
import {useState} from "react";

export default function App() {
  const [broken, setBroken] = useState(["а"]);
  const [correct, setCorrect] = useState(["а"]);

  function addBroken() {
    broken.push("нов");
    setBroken(broken);
  }

  function addCorrect() {
    setCorrect([...correct, "нов"]);
  }

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <p>Счупено ({broken.length}): {broken.join(", ")}</p>
      <button onClick={addBroken}>Добави с push</button>

      <p style={{marginTop: 16}}>Правилно ({correct.length}): {correct.join(", ")}</p>
      <button onClick={addCorrect}>Добави с разпръскване</button>

      <p style={{fontSize: 13, color: "#666", marginTop: 14}}>
        Натисни левия бутон няколко пъти — екранът не мърда. Натисни после десния и ще видиш, че
        и счупеният списък внезапно „наваксва“: данните са се променяли, но React не е разбирал.
      </p>
    </div>
  );
}
```

React сравнява старата стойност с новата по препратка. `push` връща същия масив, значи за React нищо не се е случило.

## Речникът на промените

```steps
{"title":"Масив в състоянието"}
---
**Добавяне накрая:** `setItems([...items, newItem])`
---
**Добавяне отпред:** `setItems([newItem, ...items])`
---
**Триене:** `setItems(items.filter(item => item.id !== id))`
---
**Промяна на един елемент:** `setItems(items.map(item => item.id === id ? {...item, done: true} : item))`
---
**Подреждане:** `setItems([...items].sort(...))`
```

```sandbox
{"title":"Четирите операции на живо","height":520}
---
import {useState} from "react";

export default function App() {
  const [tasks, setTasks] = useState([
    {id: 1, text: "Прочети урока", done: true},
    {id: 2, text: "Направи задачата", done: false}
  ]);

  function add() {
    const id = Date.now();
    setTasks([...tasks, {id, text: "Задача " + (tasks.length + 1), done: false}]);
  }

  function toggle(id) {
    setTasks(tasks.map(task => task.id === id ? {...task, done: !task.done} : task));
  }

  function remove(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <button onClick={add}>Добави</button>
      <button onClick={() => setTasks([...tasks].sort((a, b) => a.text.localeCompare(b.text)))} style={{marginLeft: 6}}>
        Подреди
      </button>

      <ul style={{marginTop: 12, paddingLeft: 18}}>
        {tasks.map(task => (
          <li key={task.id} style={{marginBottom: 4}}>
            <span
              onClick={() => toggle(task.id)}
              style={{cursor: "pointer", textDecoration: task.done ? "line-through" : "none"}}
            >
              {task.text}
            </span>
            <button onClick={() => remove(task.id)} style={{marginLeft: 8}}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## Обект в състоянието

```sandbox
{"title":"Една форма, едно състояние","height":500}
---
import {useState} from "react";

export default function App() {
  const [form, setForm] = useState({name: "", email: "", newsletter: false});

  function update(field, value) {
    setForm(current => ({...current, [field]: value}));
  }

  return (
    <div style={{fontFamily: "system-ui", padding: 16, display: "grid", gap: 10, maxWidth: 300}}>
      <input value={form.name} onChange={e => update("name", e.target.value)} placeholder="Име" />
      <input value={form.email} onChange={e => update("email", e.target.value)} placeholder="Имейл" />
      <label>
        <input type="checkbox" checked={form.newsletter} onChange={e => update("newsletter", e.target.checked)} />
        {" "}Искам бюлетин
      </label>
      <pre style={{background: "#f5f5f5", padding: 10, fontSize: 12}}>{JSON.stringify(form, null, 2)}</pre>
    </div>
  );
}
```

`{...current, [field]: value}` — квадратните скоби около `field` правят името на свойството динамично. Един метод обслужва цялата форма.

```callout
{"type":"warn","title":"Вложените обекти искат две разпръсквания"}
---
`{...user, address: {...user.address, city: "Варна"}}`. За всяко ниво, което променяш — ново разпръскване. Затова опитният разработчик държи състоянието плоско: вместо `user.address.city`, просто `city`.
```

## Едно голямо състояние или няколко малки

```steps
---
**Отделни състояния**, когато частите се променят независимо: заявка за търсене, отворено меню, текуща страница.
---
**Един обект**, когато частите се променят заедно и имат смисъл само заедно: полетата на една форма.
---
**Никога не дублирай**: ако `fullName` може да се сметне от `firstName` и `lastName`, не го пази отделно.
```

```quiz
{"id":"react-3-05-q1","question":"Защо `items.push(x); setItems(items);` не обновява екрана?","options":["push не работи в React","Масивът остава същият обект, а React сравнява по препратка","setItems приема само нови променливи","Трябва да се извика два пъти"],"answer":1,"explanation":"React проверява дали новата стойност е същият обект като старата. `push` променя съдържанието, но връща същата препратка — значи „няма промяна\"."}
```

```quiz
{"id":"react-3-05-q2","question":"Как се маха елемент от масив в състоянието?","options":["`items.splice(index, 1)`","`setItems(items.filter(item => item.id !== id))`","`delete items[index]`","`items.pop()`"],"answer":1,"explanation":"`filter` връща нов масив без елемента. `splice`, `delete` и `pop` променят оригинала и React не забелязва."}
```

```takeaways
- Всяка промяна на масив или обект в състоянието връща **нова** стойност.
- Добавяне с разпръскване, триене с `filter`, промяна с `map`, подреждане върху копие.
- `{...current, [field]: value}` обслужва цяла форма с един метод.
- Дръж състоянието плоско и никога не дублирай изчислими стойности.
