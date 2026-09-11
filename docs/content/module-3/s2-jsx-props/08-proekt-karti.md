---
module: "Модул 3: React & NextJS"
section: "Компоненти, JSX и props"
sectionOrder: 1
title: "Мини-проект: каталог с карти"
label: "react-2-07-project"
---

Първата ти задача за преглед в този модул. Всичко, което ти трябва, вече мина през предишните шест урока: компоненти, props, `children`, списъци с `key`, условно рендиране и стилове.

Още няма състояние — нищо не се променя след първото рисуване. Това е нарочно: искаме да видим как разделяш интерфейса на парчета.

## Какво строим

Каталог с курсове. Заглавие, брой, карти с данни, значка за нивото, празно състояние.

```sandbox
{"title":"Ето докъде трябва да стигнеш (опитай да не подглеждаш кода преди да опиташ сам)","height":520}
---
const COURSES = [
  {id: "c1", title: "HTML + CSS", level: "начинаещ", lessons: 92, price: 0, tags: ["основи", "дизайн"]},
  {id: "c2", title: "JavaScript", level: "среден", lessons: 102, price: 199, tags: ["език", "проекти"]},
  {id: "c3", title: "React & Next.js", level: "напреднал", lessons: 60, price: 249, tags: ["рамки"]}
];

const LEVELS = {
  "начинаещ": {background: "#dcfce7", color: "#15803d"},
  "среден": {background: "#fef3c7", color: "#b45309"},
  "напреднал": {background: "#fee2e2", color: "#b91c1c"}
};

function Badge({level}) {
  const style = LEVELS[level] ?? {background: "#eee", color: "#555"};
  return <span style={{...style, padding: "2px 10px", borderRadius: 12, fontSize: 12}}>{level}</span>;
}

function Card({children}) {
  return <article style={{border: "1px solid #ddd", borderRadius: 10, padding: 16, width: 210}}>{children}</article>;
}

function CourseCard({course}) {
  return (
    <Card>
      <h3 style={{margin: "0 0 8px", fontSize: 17}}>{course.title}</h3>
      <Badge level={course.level} />
      <p style={{color: "#666", fontSize: 13, margin: "10px 0 4px"}}>{course.lessons} урока</p>
      <p style={{fontWeight: 600, margin: "0 0 10px"}}>
        {course.price === 0 ? "Безплатен" : `${course.price} лв.`}
      </p>
      <div style={{display: "flex", gap: 6, flexWrap: "wrap"}}>
        {course.tags.map(tag => (
          <span key={tag} style={{fontSize: 11, color: "#5C45FD", border: "1px solid #5C45FD", borderRadius: 10, padding: "1px 8px"}}>
            {tag}
          </span>
        ))}
      </div>
    </Card>
  );
}

function CourseList({courses}) {
  if (courses.length === 0) return <p style={{color: "#777"}}>Няма курсове за показване.</p>;

  return (
    <div style={{display: "flex", gap: 14, flexWrap: "wrap"}}>
      {courses.map(course => <CourseCard key={course.id} course={course} />)}
    </div>
  );
}

export default function App() {
  return (
    <main style={{fontFamily: "system-ui", padding: 16}}>
      <h2 style={{marginBottom: 2}}>Курсове</h2>
      <p style={{color: "#666", marginTop: 0}}>{COURSES.length} налични</p>
      <CourseList courses={COURSES} />
      <h4>Празен каталог</h4>
      <CourseList courses={[]} />
    </main>
  );
}
```

## Задачата

```submit
{"id":"react-2-07-final","title":"Каталог с карти","language":"jsx","requirements":["Поне четири отделни компонента: списък, карта, значка и универсална обвивка (`Card`), която приема `children`.","Списъкът се рисува с `map` и стабилен `key` от данните — не индекс.","Безплатните курсове показват „Безплатен“ вместо цена (условно рендиране).","Празен списък показва съобщение вместо празно място.","Нивото се превежда в цвят през обект, а не през стълба от `if`.","Нито един компонент не променя подадените му props."],"askForLink":true,"linkLabel":"Линк към GitHub или StackBlitz (по желание)"}
---
const COURSES = [
  {id: "c1", title: "HTML + CSS", level: "начинаещ", lessons: 92, price: 0, tags: ["основи", "дизайн"]},
  {id: "c2", title: "JavaScript", level: "среден", lessons: 102, price: 199, tags: ["език", "проекти"]},
  {id: "c3", title: "React & Next.js", level: "напреднал", lessons: 60, price: 249, tags: ["рамки"]}
];

// Твоите компоненти тук.

export default function App() {
  return null;
}
```

```callout
{"type":"tip","title":"Как да я подходиш"}
---
Първо напиши всичко в един компонент и го накарай да изглежда правилно. Чак после реж на парчета. Обратният ред — да измислиш компонентите предварително — почти винаги ражда грешните граници.
```

```callout
{"type":"info","title":"Какво гледа менторът"}
---
Границите между компонентите, стабилните ключове, липсата на копиран код и дали празното състояние е обмислено. Не гледаме дизайн — може да е съвсем семпъл.
```

```takeaways
- Компонент се изрязва от работещ код, не се измисля предварително.
- Данните влизат отгоре, компонентите не ги променят.
- Празното състояние е част от задачата, не добавка.
