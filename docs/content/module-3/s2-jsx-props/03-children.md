---
module: "Модул 3: React & NextJS"
section: "Компоненти, JSX и props"
sectionOrder: 1
title: "children и композиция"
label: "react-2-03-children"
---

Има един специален prop, който не подаваш с име: всичко, което сложиш между отварящия и затварящия етикет, пристига като `children`.

```sandbox
{"title":"Обвивка, която не знае какво обвива","height":420}
---
function Card({title, children}) {
  return (
    <section style={{border: "1px solid #ddd", borderRadius: 8, padding: 16, marginBottom: 12}}>
      <h3 style={{marginTop: 0}}>{title}</h3>
      {children}
    </section>
  );
}

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <Card title="Профил">
        <p>Ива Петрова</p>
        <p>ментор от 2024</p>
      </Card>

      <Card title="Настройки">
        <label><input type="checkbox" /> Известия по имейл</label>
      </Card>
    </div>
  );
}
```

`Card` няма представа какво има вътре. Това е силата ѝ — работи с всичко.

## Защо това е важно

Алтернативата е компонент, който се опитва да предвиди всеки случай:

```javascript
<Card title="Профил" text="Ива" secondText="ментор" hasCheckbox={false} icon="user" />
```

Всяка нова нужда добавя нов prop, а компонентът се превръща в конфигурационен файл. С `children` подаваш направо това, което искаш да се покаже.

```callout
{"type":"tip","title":"Правилото"}
---
Когато се хванеш да добавяш четвърти prop от типа „покажи ли това", спри и се запитай дали не трябва да е `children`.
```

## Няколко "дупки" в един компонент

`children` е една дупка. Ако ти трябват няколко, подавай JSX като обикновени props:

```sandbox
{"title":"Layout с три области","height":460}
---
function Page({header, sidebar, children}) {
  return (
    <div style={{fontFamily: "system-ui"}}>
      <header style={{background: "#5C45FD", color: "white", padding: 12}}>{header}</header>
      <div style={{display: "flex", gap: 16, padding: 16}}>
        <aside style={{width: 140, background: "#f5f5f5", padding: 12, borderRadius: 6}}>{sidebar}</aside>
        <main style={{flex: 1}}>{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Page
      header={<strong>Академия</strong>}
      sidebar={<ul style={{margin: 0, paddingLeft: 16}}><li>Уроци</li><li>Задачи</li></ul>}
    >
      <h3 style={{marginTop: 0}}>Съдържание</h3>
      <p>Основната част на страницата.</p>
    </Page>
  );
}
```

JSX е стойност — значи може да пътува като всеки друг prop.

## Композиция вместо наследяване

В React не наследяваш компоненти. Слагаш ги един в друг.

```sandbox
{"title":"Слоеве от компоненти","height":420}
---
function Panel({children}) {
  return <div style={{border: "1px solid #ddd", borderRadius: 8, padding: 12}}>{children}</div>;
}

function Warning({children}) {
  return (
    <Panel>
      <div style={{borderLeft: "4px solid #f59e0b", paddingLeft: 12}}>
        <strong style={{color: "#b45309"}}>Внимание</strong>
        <div>{children}</div>
      </div>
    </Panel>
  );
}

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <Warning>Срокът за предаване изтича утре.</Warning>
    </div>
  );
}
```

`Warning` не наследява `Panel` — използва я. Ако утре панелът си смени вида, предупреждението го получава наготово.

```quiz
{"id":"react-2-03-q1","question":"Какво е `children`?","options":["Списък с дъщерните компоненти в дървото","Prop със съдържанието между отварящия и затварящия етикет","Вградена функция на React","Масив от всички props"],"answer":1,"explanation":"`children` е обикновен prop, който React попълва автоматично със съдържанието между етикетите."}
```

```quiz
{"id":"react-2-03-q2","question":"Кога е по-добре да подадеш JSX като именуван prop вместо през children?","options":["Когато съдържанието е дълго","Когато компонентът има повече от едно място за вмъкване","Когато съдържанието е текст","Никога - children винаги е по-добре"],"answer":1,"explanation":"`children` е една дупка. За layout с хедър, сайдбар и основна част подаваш останалите области като отделни props."}
```

```takeaways
- Съдържанието между етикетите пристига като `children`.
- `children` спестява безкрайното добавяне на конфигурационни props.
- За няколко области подавай JSX като именувани props.
- В React се композира, не се наследява.
