---
module: "Модул 3: React & NextJS"
section: "State и събития"
sectionOrder: 2
title: "Пълен пример: списък със задачи"
label: "react-3-07-todo"
---

Събираме всичко от секцията в едно работещо приложение: контролирана форма, масив в състоянието, вдигнато състояние, филтри и изчислени стойности.

```sandbox
{"title":"Списък със задачи - завършен","height":640}
---
import {useState} from "react";

function TodoForm({onAdd}) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText("");
  }

  return (
    <form onSubmit={handleSubmit} style={{display: "flex", gap: 6, marginBottom: 12}}>
      <input
        value={text}
        onChange={event => setText(event.target.value)}
        placeholder="Нова задача"
        style={{padding: 8, flex: 1}}
      />
      <button disabled={!text.trim()}>Добави</button>
    </form>
  );
}

function Filters({value, onChange, counts}) {
  const options = [
    {id: "all", label: `Всички (${counts.all})`},
    {id: "active", label: `Активни (${counts.active})`},
    {id: "done", label: `Завършени (${counts.done})`}
  ];

  return (
    <div style={{display: "flex", gap: 6, marginBottom: 10}}>
      {options.map(option => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          style={{
            padding: "4px 10px",
            border: "1px solid",
            borderColor: value === option.id ? "#5C45FD" : "#ddd",
            background: value === option.id ? "#5C45FD" : "white",
            color: value === option.id ? "white" : "#333",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function TodoItem({todo, onToggle, onRemove}) {
  return (
    <li style={{display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid #f0f0f0"}}>
      <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
      <span style={{flex: 1, textDecoration: todo.done ? "line-through" : "none", color: todo.done ? "#999" : "#222"}}>
        {todo.text}
      </span>
      <button onClick={() => onRemove(todo.id)}>×</button>
    </li>
  );
}

export default function App() {
  const [todos, setTodos] = useState([
    {id: 1, text: "Прочети за useState", done: true},
    {id: 2, text: "Направи списъка", done: false}
  ]);
  const [filter, setFilter] = useState("all");

  const counts = {
    all: todos.length,
    active: todos.filter(todo => !todo.done).length,
    done: todos.filter(todo => todo.done).length
  };

  const visible = todos.filter(todo => {
    if (filter === "active") return !todo.done;
    if (filter === "done") return todo.done;
    return true;
  });

  function addTodo(text) {
    setTodos(current => [...current, {id: Date.now(), text, done: false}]);
  }

  function toggleTodo(id) {
    setTodos(current => current.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo));
  }

  function removeTodo(id) {
    setTodos(current => current.filter(todo => todo.id !== id));
  }

  return (
    <main style={{fontFamily: "system-ui", padding: 16, maxWidth: 420}}>
      <h2 style={{marginTop: 0}}>Задачи</h2>

      <TodoForm onAdd={addTodo} />
      <Filters value={filter} onChange={setFilter} counts={counts} />

      {visible.length === 0
        ? <p style={{color: "#999"}}>Няма задачи в тази категория.</p>
        : <ul style={{listStyle: "none", padding: 0, margin: 0}}>
            {visible.map(todo => (
              <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onRemove={removeTodo} />
            ))}
          </ul>}

      {counts.done > 0 && (
        <button
          onClick={() => setTodos(current => current.filter(todo => !todo.done))}
          style={{marginTop: 12}}
        >
          Изчисти завършените
        </button>
      )}
    </main>
  );
}
```

## Какво да забележиш в кода

```steps
---
**Две състояния, не пет.** `todos` и `filter`. Броячите и видимият списък се смятат при рисуването — не се пазят.
---
**Формата държи собствения си текст.** Той не интересува никого другиго, затова не се вдига нагоре.
---
**Функционалната форма навсякъде.** `setTodos(current => ...)` — новата стойност зависи от старата.
---
**Всяка промяна прави нов масив.** `map` за превключване, `filter` за триене, разпръскване за добавяне.
---
**Празното състояние зависи от филтъра** — съобщението се показва и когато има задачи, но нито една не отговаря на филтъра.
```

```callout
{"type":"tip","title":"Упражни се върху този пример"}
---
Отвори редактора и добави: редактиране на текста при двоен клик, бутон „отметни всички", и запазване в `localStorage`. Последното ще ти потрябва да го препишеш след урока за `useEffect`.
```

```quiz
{"id":"react-3-07-q1","question":"Защо броят на активните задачи не се пази в отделно състояние?","options":["Защото ще е бавно","Защото се смята от todos и двете стойности биха се разминали","Защото React не позволява числа в състояние","Защото filter е по-бърз"],"answer":1,"explanation":"Всяка стойност, изчислима от друга, се смята при рисуването. Отделното ѝ пазене означава две истини, които рано или късно се разминават."}
```

```quiz
{"id":"react-3-07-q2","question":"Защо текстът на новата задача живее в TodoForm, а не в App?","options":["Защото App вече има много състояние","Защото никой друг компонент не се интересува от него","Защото формата не може да подава props нагоре","Заради производителността"],"answer":1,"explanation":"Състоянието се качва само когато втори компонент има нужда от него. Недовършеният текст е вътрешна работа на формата."}
```

```takeaways
- Пази минимума състояние; всичко изчислимо се смята при рисуването.
- Локалното състояние остава долу, споделеното се качва нагоре.
- Промените на масиви минават през `map`, `filter` и разпръскване.
- Празните състояния се пишат за всеки филтър, не само за празния списък.
