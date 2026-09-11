---
module: "Модул 3: React & NextJS"
section: "Защо React изобщо съществува"
sectionOrder: 0
title: "Проблемът: DOM на ръка"
label: "react-1-01-problem"
---

Преди да научиш React, трябва да усетиш болката, която той лекува. Иначе ще го приемеш като поредния синтаксис за наизустяване.

## Задачата

Списък със задачи. Добавяш, махаш, отмяташ като завършени, и някъде отгоре пише колко са останали. Звучи като упражнение за половин час.

Ето го написано без React — точно както би го направил след Модул 2:

```sandbox
{"template":"vanilla","title":"Списък със задачи на чист JavaScript","height":420}
---
// file: /index.js
let todos = [
  {id: 1, text: "Купи хляб", done: false},
  {id: 2, text: "Пусни пералнята", done: true}
];

const list = document.getElementById("list");
const counter = document.getElementById("counter");
const input = document.getElementById("input");
const form = document.getElementById("form");

function render() {
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo.text;
    li.style.textDecoration = todo.done ? "line-through" : "none";
    li.style.cursor = "pointer";

    li.addEventListener("click", () => {
      todo.done = !todo.done;
      render();
    });

    const button = document.createElement("button");
    button.textContent = "×";
    button.addEventListener("click", event => {
      event.stopPropagation();
      todos = todos.filter(item => item.id !== todo.id);
      render();
    });

    li.appendChild(button);
    list.appendChild(li);
  });

  counter.textContent = `Остават ${todos.filter(todo => !todo.done).length}`;
}

form.addEventListener("submit", event => {
  event.preventDefault();
  if (!input.value.trim()) return;
  todos = [...todos, {id: Date.now(), text: input.value, done: false}];
  input.value = "";
  render();
});

render();
---
// file: /index.html
<form id="form">
  <input id="input" placeholder="Нова задача" />
  <button>Добави</button>
</form>
<p id="counter"></p>
<ul id="list"></ul>
```

Работи. И точно там е проблемът — работи, докато приложението е малко.

## Какво не е наред

```steps
{"title":"Три болки, които растат заедно с проекта"}
---
**Ти управляваш екрана ръчно.** На всяка промяна извикваш `render()`. Забравиш ли едно извикване, интерфейсът показва стари данни. Никой не ти казва — просто числото горе е грешно.
---
**Данните и екранът са две отделни истини.** `todos` е едно, DOM-ът е друго. Твоя работа е да ги държиш синхронизирани. С всяка нова функция синхронизацията става по-крехка.
---
**Нищо не се преизползва.** Искаш същия списък на друга страница? Копираш 40 реда и ги поправяш на ръка. После намираш бъг и го поправяш на две места. После на три.
```

```callout
{"type":"warn","title":"И това е най-добрият вариант"}
---
Горният код е написан спретнато — пречертава всичко наведнъж. По-„оптимизираните" версии пипат отделни елементи на ръка (`li.classList.add`, `counter.textContent = ...`) и точно там се раждат бъговете, които не можеш да възпроизведеш.
```

## Идеята на React

React обръща посоката. Ти не описваш **как да се промени** екранът. Описваш **как изглежда екранът при тези данни**, и оставяш React да сметне разликата.

Същият списък, с React:

```sandbox
{"title":"Същото със React","height":420}
---
import {useState} from "react";

export default function App() {
  const [todos, setTodos] = useState([
    {id: 1, text: "Купи хляб", done: false},
    {id: 2, text: "Пусни пералнята", done: true}
  ]);
  const [text, setText] = useState("");

  function addTodo(event) {
    event.preventDefault();
    if (!text.trim()) return;
    setTodos([...todos, {id: Date.now(), text, done: false}]);
    setText("");
  }

  function toggle(id) {
    setTodos(todos.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo));
  }

  return (
    <div>
      <form onSubmit={addTodo}>
        <input value={text} onChange={event => setText(event.target.value)} placeholder="Нова задача" />
        <button>Добави</button>
      </form>

      <p>Остават {todos.filter(todo => !todo.done).length}</p>

      <ul>
        {todos.map(todo => (
          <li key={todo.id} style={{textDecoration: todo.done ? "line-through" : "none"}}>
            <span onClick={() => toggle(todo.id)} style={{cursor: "pointer"}}>{todo.text}</span>
            <button onClick={() => setTodos(todos.filter(item => item.id !== todo.id))}>×</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Няма `render()`. Няма `createElement`. Няма `appendChild`. Има един израз, който казва: "при тези данни екранът изглежда така". Промениш ли данните, екранът се обновява сам.

```callout
{"type":"tip","title":"Още не разбираш синтаксиса - нормално е"}
---
Не се опитвай да разчетеш всеки ред сега. Виж само формата: данни горе, описание на екрана долу, и нито едно ръчно пипане на DOM. Следващите уроци разглобяват всяка част поотделно.
```

## Провери се

```quiz
{"id":"react-1-01-q1","question":"Каква е основната разлика в подхода на React?","options":["React е по-бърз, защото използва по-малко памет","Описваш какъв да е резултатът, а не какви стъпки да се изпълнят","React заменя JavaScript с нов език","React работи без браузър"],"answer":1,"explanation":"Императивно (ръчно) значи „намери елемента, смени текста, добави клас\". Декларативно значи „при тези данни екранът изглежда така\". React прави второто и сам смята какво да промени в DOM."}
```

```quiz
{"id":"react-1-01-q2","question":"Коя от изброените болки НЕ идва от ръчното управление на DOM?","options":["Забравено извикване на render след промяна","Данните и екранът се разминават","Един и същи код се копира на няколко места","JavaScript не може да смята с дробни числа"],"answer":3,"explanation":"Първите три са ежедневието при ръчна работа с DOM. Последното е несвързан проблем на плаващата запетая, който React не решава и не се опитва да реши."}
```

```takeaways
- При ръчна работа с DOM ти отговаряш екранът да съвпада с данните — и точно там се раждат бъговете.
- React обръща посоката: описваш как изглежда екранът при дадени данни.
- Разликата между стария и новия екран я смята React, не ти.
