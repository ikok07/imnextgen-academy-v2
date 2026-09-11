---
module: "Модул 3: React & NextJS"
section: "Големи приложения: reducer, context, маршрути"
sectionOrder: 4
title: "Динамични маршрути и параметри в адреса"
label: "react-5-06-params"
---

Адресът не е само навигация. Той е състояние, което може да се сподели, да се отбележи и да се презареди. Всичко, което трябва да оцелее при копиране на линка, живее в адреса.

## Параметър в пътя

```sandbox
{"title":"Списък и страница за детайли","height":620,"dependencies":{"react-router-dom":"6.26.2"}}
---
import {BrowserRouter, Routes, Route, Link, useParams, useNavigate} from "react-router-dom";

const COURSES = [
  {id: "html-css", title: "HTML + CSS", lessons: 92, level: "начинаещ"},
  {id: "javascript", title: "JavaScript", lessons: 102, level: "среден"},
  {id: "react", title: "React и Next.js", lessons: 60, level: "напреднал"}
];

function CourseList() {
  return (
    <div>
      <h3 style={{marginTop: 0}}>Курсове</h3>
      <ul style={{paddingLeft: 18}}>
        {COURSES.map(course => (
          <li key={course.id} style={{marginBottom: 4}}>
            <Link to={`/courses/${course.id}`}>{course.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CourseDetail() {
  const {courseId} = useParams();
  const navigate = useNavigate();
  const course = COURSES.find(item => item.id === courseId);

  if (!course) {
    return (
      <div>
        <p style={{color: "#b91c1c"}}>Няма курс с адрес „{courseId}“.</p>
        <button onClick={() => navigate("/courses")}>Към списъка</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Назад</button>
      <h3>{course.title}</h3>
      <p>Ниво: {course.level}</p>
      <p>Уроци: {course.lessons}</p>
      <p style={{fontSize: 13, color: "#666"}}>Адресът съдържа id-то — линкът може да се сподели.</p>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div style={{fontFamily: "system-ui", padding: 16}}>
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
```

```steps
---
`:courseId` в пътя обявява променлива част.
---
`useParams()` я връща: `const {courseId} = useParams()`.
---
Параметърът е **винаги текст**. За число: `Number(id)`.
---
Липсващият запис е задължителен случай — адресът може да бъде въведен ръчно или записът да е изтрит.
```

## Програмна навигация

`useNavigate` премества потребителя от код — след успешно записване, след вход, при отказ:

```steps
---
`navigate("/courses")` — отива на адрес.
---
`navigate(-1)` — назад, като бутона на браузъра.
---
`navigate("/login", {replace: true})` — заменя текущия запис в историята, вместо да добавя нов. Така „назад" не връща на страница, която вече не важи.
```

## Търсене в адреса

За филтри и търсене не се ползва параметър в пътя, а низ със запитване: `?q=react&level=easy`.

```sandbox
{"title":"Филтри, които оцеляват при презареждане","height":620,"dependencies":{"react-router-dom":"6.26.2"}}
---
import {BrowserRouter, useSearchParams} from "react-router-dom";

const COURSES = [
  {id: 1, title: "HTML + CSS", level: "начинаещ"},
  {id: 2, title: "JavaScript", level: "среден"},
  {id: 3, title: "React и Next.js", level: "напреднал"},
  {id: 4, title: "Дизайн с Figma", level: "начинаещ"}
];

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const level = searchParams.get("level") ?? "all";

  const visible = COURSES.filter(course => {
    const matchesQuery = course.title.toLowerCase().includes(query.toLowerCase());
    const matchesLevel = level === "all" || course.level === level;
    return matchesQuery && matchesLevel;
  });

  function update(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  }

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <input
        value={query}
        onChange={event => update("q", event.target.value)}
        placeholder="Търси"
        style={{padding: 8, marginRight: 8}}
      />

      <select value={level} onChange={event => update("level", event.target.value === "all" ? "" : event.target.value)}>
        <option value="all">всички нива</option>
        <option value="начинаещ">начинаещ</option>
        <option value="среден">среден</option>
        <option value="напреднал">напреднал</option>
      </select>

      <p style={{fontSize: 13, color: "#666"}}>Адресът се променя — презареди прегледа и филтрите остават.</p>

      <ul style={{paddingLeft: 18}}>
        {visible.map(course => <li key={course.id}>{course.title} <span style={{color: "#888"}}>({course.level})</span></li>)}
      </ul>

      {visible.length === 0 && <p style={{color: "#999"}}>Нищо не съвпада.</p>}
    </div>
  );
}

export default function App() {
  return <BrowserRouter><Search /></BrowserRouter>;
}
```

Филтърът не е в `useState` — той е в адреса. Значи оцелява при презареждане, може да се сподели и бутонът „назад" работи както очаква потребителят.

```callout
{"type":"tip","title":"Кое къде"}
---
**В пътя** (`/courses/react`) — кое нещо гледаме. **В запитването** (`?q=...&page=2`) — как го гледаме: филтри, търсене, страница, подредба.
```

```quiz
{"id":"react-5-06-q1","question":"Какъв тип е стойността от `useParams()`?","options":["Какъвто е в данните","Винаги текст","Число, ако прилича на число","Зависи от маршрута"],"answer":1,"explanation":"Адресът е текст, значи и параметрите са текст. Сравнение с числов id иска `Number(id)` или сравнение като низ."}
```

```quiz
{"id":"react-5-06-q2","question":"Къде е най-доброто място за текущия филтър на списък?","options":["В useState","В низа със запитване в адреса","В Context","В localStorage"],"answer":1,"explanation":"Така състоянието оцелява при презареждане, линкът може да се сподели и бутонът „назад“ връща предишния филтър."}
```

```takeaways
- `:param` в пътя + `useParams()` за динамични страници; стойността е текст.
- `useNavigate` за навигация от код; `replace: true`, когато връщането назад няма смисъл.
- Филтри и търсене живеят в низа със запитване, не в състояние.
- Липсващият запис е задължителен случай за всяка страница с детайли.
