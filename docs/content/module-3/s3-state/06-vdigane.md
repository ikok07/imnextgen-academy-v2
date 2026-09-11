---
module: "Модул 3: React & NextJS"
section: "State и събития"
sectionOrder: 2
title: "Вдигане на състоянието нагоре"
label: "react-3-06-lifting"
---

Два компонента трябва да знаят едно и също нещо. Къде да живее то?

Правилото: **състоянието се качва при най-близкия общ родител**, а надолу пътува като props.

## Проблемът

Поле за търсене и списък с резултати. Полето знае какво е написано, но списъкът трябва да филтрира по същия текст.

```sandbox
{"title":"Състоянието се качва при общия родител","height":540}
---
import {useState} from "react";

function SearchBox({query, onQueryChange}) {
  return (
    <input
      value={query}
      onChange={event => onQueryChange(event.target.value)}
      placeholder="Търси курс..."
      style={{padding: 8, width: 220}}
    />
  );
}

function ResultCount({count}) {
  return <p style={{color: "#666", fontSize: 13}}>Намерени: {count}</p>;
}

function CourseList({courses}) {
  if (courses.length === 0) return <p style={{color: "#999"}}>Нищо не съвпада.</p>;

  return (
    <ul style={{paddingLeft: 18}}>
      {courses.map(course => <li key={course.id}>{course.title}</li>)}
    </ul>
  );
}

const COURSES = [
  {id: 1, title: "HTML + CSS"},
  {id: 2, title: "JavaScript"},
  {id: 3, title: "React и Next.js"},
  {id: 4, title: "Дизайн с Figma"}
];

export default function App() {
  const [query, setQuery] = useState("");

  const visible = COURSES.filter(course =>
    course.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <SearchBox query={query} onQueryChange={setQuery} />
      <ResultCount count={visible.length} />
      <CourseList courses={visible} />
    </div>
  );
}
```

`query` живее в `App` — най-близкия общ родител на трите компонента. Полето получава стойността и функция за промяна; списъкът получава вече филтрираните данни.

```steps
{"title":"Схемата, която ще повтаряш постоянно"}
---
Родителят държи състоянието.
---
Детето, което **показва** стойността, я получава като prop.
---
Детето, което **променя** стойността, получава функция като prop.
---
Резултатът се изчислява при рисуването — не се пази в отделно състояние.
```

## Контролирано срещу неконтролирано дете

Един и същи компонент може да управлява себе си или да бъде управляван отвън:

```sandbox
{"title":"Един акордеон, две поведения","height":560}
---
import {useState} from "react";

function PanelOwn({title, children}) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{border: "1px solid #ddd", borderRadius: 8, marginBottom: 8}}>
      <button onClick={() => setOpen(!open)} style={{width: "100%", textAlign: "left", padding: 10, border: "none", background: "none", cursor: "pointer"}}>
        {open ? "▾" : "▸"} {title}
      </button>
      {open && <div style={{padding: "0 10px 10px"}}>{children}</div>}
    </div>
  );
}

function PanelControlled({title, isOpen, onToggle, children}) {
  return (
    <div style={{border: "1px solid #ddd", borderRadius: 8, marginBottom: 8}}>
      <button onClick={onToggle} style={{width: "100%", textAlign: "left", padding: 10, border: "none", background: "none", cursor: "pointer"}}>
        {isOpen ? "▾" : "▸"} {title}
      </button>
      {isOpen && <div style={{padding: "0 10px 10px"}}>{children}</div>}
    </div>
  );
}

export default function App() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <h4>Всеки сам за себе си</h4>
      <PanelOwn title="Първи">Може да са отворени едновременно.</PanelOwn>
      <PanelOwn title="Втори">И този също.</PanelOwn>

      <h4 style={{marginTop: 20}}>Управлявани отвън (само един отворен)</h4>
      {["Условия", "Плащане", "Доставка"].map((title, index) => (
        <PanelControlled
          key={title}
          title={title}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        >
          Съдържание на „{title}“.
        </PanelControlled>
      ))}
    </div>
  );
}
```

Щом правилото „само един отворен" засяга няколко панела, то не може да живее в нито един от тях. Качва се при родителя.

```callout
{"type":"tip","title":"Кога да вдигаш"}
---
Вдигай състоянието само когато **две или повече** места се нуждаят от него. Преждевременното вдигане превръща родителя в склад за чужди данни и прави децата безсмислени.
```

```callout
{"type":"warn","title":"Пробиване през много нива"}
---
Ако едно и също prop минава през четири компонента, само за да стигне до петия, това е сигнал. Решението се казва Context и идва в секция 5 — не преди това.
```

```quiz
{"id":"react-3-06-q1","question":"Къде трябва да живее състояние, нужно на две съседни деца?","options":["Във всяко от тях поотделно","В най-близкия общ родител","В глобална променлива","В най-външния компонент на приложението"],"answer":1,"explanation":"Най-близкият общ родител държи данните и ги подава надолу. Най-външният компонент би работил, но трупа ненужно състояние високо в дървото."}
```

```quiz
{"id":"react-3-06-q2","question":"Как дете променя състояние, което живее в родителя?","options":["Като го присвои директно","Като извика функция, подадена му като prop","През Context","Не може"],"answer":1,"explanation":"Данните вървят надолу, промените — нагоре през функции. Родителят решава какво прави с подадената стойност."}
```

```takeaways
- Състояние, нужно на повече от един компонент, се качва при общия им родител.
- Надолу вървят данни, нагоре — функции за промяна.
- Едно и също дете може да е самостоятелно или управлявано отвън.
- Не вдигай предварително; вдигни, когато втори компонент има нужда.
