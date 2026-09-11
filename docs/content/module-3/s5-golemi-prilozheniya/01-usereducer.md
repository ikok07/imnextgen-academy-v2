---
module: "Модул 3: React & NextJS"
section: "Големи приложения: reducer, context, маршрути"
sectionOrder: 4
title: "useReducer: когато състоянието има правила"
label: "react-5-01-usereducer"
---

`useState` стига до определен момент. Когато няколко стойности се менят заедно по правила, компонентът се превръща в купчина от `setНещо` извиквания, разпръснати из десет функции.

`useReducer` събира всички правила на едно място.

## Преди и след

```sandbox
{"title":"Същата логика с useReducer","height":640}
---
import {useReducer} from "react";

const initialState = {
  items: [],
  filter: "all",
  lastAction: "нищо"
};

function reducer(state, action) {
  switch (action.type) {
    case "added":
      return {
        ...state,
        items: [...state.items, {id: Date.now(), text: action.text, done: false}],
        lastAction: `добавено: ${action.text}`
      };

    case "toggled":
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id ? {...item, done: !item.done} : item
        ),
        lastAction: "отметнато"
      };

    case "removed":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.id),
        lastAction: "изтрито"
      };

    case "filterChanged":
      return {...state, filter: action.filter, lastAction: `филтър: ${action.filter}`};

    case "clearedDone":
      return {...state, items: state.items.filter(item => !item.done), lastAction: "изчистени"};

    default:
      throw new Error("Непознато действие: " + action.type);
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const visible = state.items.filter(item => {
    if (state.filter === "active") return !item.done;
    if (state.filter === "done") return item.done;
    return true;
  });

  return (
    <div style={{fontFamily: "system-ui", padding: 16, maxWidth: 400}}>
      <button onClick={() => dispatch({type: "added", text: "Задача " + (state.items.length + 1)})}>
        Добави
      </button>
      <button onClick={() => dispatch({type: "clearedDone"})} style={{marginLeft: 6}}>
        Изчисти завършените
      </button>

      <div style={{margin: "10px 0"}}>
        {["all", "active", "done"].map(filter => (
          <button
            key={filter}
            onClick={() => dispatch({type: "filterChanged", filter})}
            style={{marginRight: 6, fontWeight: state.filter === filter ? 700 : 400}}
          >
            {filter}
          </button>
        ))}
      </div>

      <ul style={{listStyle: "none", padding: 0}}>
        {visible.map(item => (
          <li key={item.id} style={{padding: "4px 0"}}>
            <span
              onClick={() => dispatch({type: "toggled", id: item.id})}
              style={{cursor: "pointer", textDecoration: item.done ? "line-through" : "none"}}
            >
              {item.text}
            </span>
            <button onClick={() => dispatch({type: "removed", id: item.id})} style={{marginLeft: 8}}>×</button>
          </li>
        ))}
      </ul>

      <p style={{fontSize: 13, color: "#666"}}>Последно действие: {state.lastAction}</p>
    </div>
  );
}
```

## Трите части

```steps
---
**Състояние** — един обект с всичко свързано.
---
**Действие** — обект, който описва какво се е случило: `{type: "added", text: "..."}`. Описва събитие, не команда.
---
**Reducer** — чиста функция `(state, action) => новото състояние`. Единственото място, където се решава какво става.
```

Компонентът вече не знае как се променя състоянието. Знае само да съобщи какво се е случило: `dispatch({type: "removed", id})`.

```callout
{"type":"tip","title":"Именувай действията по събитие, не по команда"}
---
`{type: "added"}` е по-добро от `{type: "addItem"}`. Първото описва какво се е случило в интерфейса, второто е инструкция към състоянието. Разликата изглежда козметична, докато едно действие не трябва да промени три неща наведнъж — тогава събитийното име остава вярно, а командното става лъжа.
```

## Reducer-ът трябва да е чист

```steps
---
**Никакви заявки, таймери, `Math.random()` или `Date.now()` вътре.** Смятай ги преди `dispatch` и ги подай в действието.
---
**Не променя стария обект** — връща нов, точно както при `useState`.
---
**При едни и същи вход и действие връща един и същ резултат.** Затова reducer-ите се тестват без React.
```

```callout
{"type":"warn","title":"Date.now() в reducer"}
---
В примера горе го има — за краткост. В истински проект id-то се смята преди `dispatch` и се подава в действието, за да остане reducer-ът предвидим.
```

## Кога кое

| Ситуация | Избор |
| --- | --- |
| Една-две независими стойности | `useState` |
| Следващото състояние зависи силно от предишното | `useReducer` |
| Едно действие мени няколко полета наведнъж | `useReducer` |
| Логиката за промяна се повтаря в няколко компонента | `useReducer` |
| Искаш да тестваш логиката отделно | `useReducer` |

```quiz
{"id":"react-5-01-q1","question":"Какво е reducer?","options":["Hook, който заменя useState","Чиста функция, която приема състояние и действие и връща ново състояние","Компонент за управление на форми","Библиотека за глобално състояние"],"answer":1,"explanation":"Reducer е обикновена функция `(state, action) => newState`. `useReducer` е hook-ът, който я свързва с React."}
```

```quiz
{"id":"react-5-01-q2","question":"Кое НЕ бива да стои в reducer?","options":["switch по типа на действието","Разпръскване на стария state","fetch заявка","Връщане на нов обект"],"answer":2,"explanation":"Reducer-ът е чист: без заявки, таймери и случайни стойности. Всичко такова се случва преди dispatch и резултатът се подава в действието."}
```

```takeaways
- `useReducer` събира правилата за промяна на състоянието на едно място.
- Действието описва случило се събитие, а компонентът само го съобщава.
- Reducer-ът е чиста функция — тества се без React.
- Няколко стойности, които се менят заедно, са сигнал за reducer.
