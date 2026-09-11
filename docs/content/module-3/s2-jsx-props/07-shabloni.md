---
module: "Модул 3: React & NextJS"
section: "Компоненти, JSX и props"
sectionOrder: 1
title: "Съставни компоненти и гъвкав интерфейс"
label: "react-2-07-patterns"
---

Всеки компонент, който преживее няколко месеца, минава по един и същ път: започва с два props, а след половин година има четиринайсет. Този урок е за това как да не стигаш дотам.

## Как изглежда проблемът

```javascript
<Card
  title="Профил"
  subtitle="Основни данни"
  icon="user"
  showHeader={true}
  headerAlign="left"
  footerText="Запази"
  onFooterClick={save}
  variant="bordered"
  compact={false}
/>
```

Всеки нов екран добавя по един prop. Компонентът вътре се превръща в стълба от условия, а никой не смее да го пипне.

## Съставни компоненти

Вместо един компонент с четиринайсет настройки — няколко малки, които се сглобяват.

```sandbox
{"title":"Card със свободна структура","height":620}
---
function Card({children}) {
  return <section style={{border: "1px solid #ddd", borderRadius: 10, overflow: "hidden", marginBottom: 12}}>{children}</section>;
}

Card.Header = function CardHeader({children}) {
  return <div style={{padding: "10px 14px", borderBottom: "1px solid #eee", fontWeight: 600}}>{children}</div>;
};

Card.Body = function CardBody({children}) {
  return <div style={{padding: 14}}>{children}</div>;
};

Card.Footer = function CardFooter({children}) {
  return <div style={{padding: "10px 14px", borderTop: "1px solid #eee", display: "flex", justifyContent: "flex-end", gap: 8}}>{children}</div>;
};

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <Card>
        <Card.Header>Профил</Card.Header>
        <Card.Body>Ива Петрова, ментор от 2024.</Card.Body>
        <Card.Footer><button>Запази</button></Card.Footer>
      </Card>

      <Card>
        <Card.Body>Тази карта няма нито заглавие, нито подвал — и не ѝ трябва prop за това.</Card.Body>
      </Card>
    </div>
  );
}
```

Няма `showHeader`, няма `footerText`. Не ти трябва подвал — не го пишеш. Структурата се вижда на мястото, където се ползва, вместо да е скрита в условия.

```callout
{"type":"tip","title":"Защо се закача върху функцията"}
---
`Card.Header = ...` е обикновено присвояване на свойство. Групира свързаните компоненти под едно име, подсказва как се ползват и не изисква нищо специално от React.
```

## Споделено състояние между частите

Когато частите трябва да си говорят — табове, акордеон, падащо меню — състоянието живее в родителя и пътува през контекст. Отвън това остава невидимо.

```sandbox
{"title":"Табове, сглобени отвън","height":640}
---
import {createContext, useContext, useState} from "react";

const TabsContext = createContext(null);

function Tabs({defaultValue, children}) {
  const [value, setValue] = useState(defaultValue);
  return <TabsContext.Provider value={{value, setValue}}>{children}</TabsContext.Provider>;
}

Tabs.List = function TabsList({children}) {
  return <div style={{display: "flex", gap: 4, borderBottom: "1px solid #ddd"}}>{children}</div>;
};

Tabs.Tab = function Tab({value, children}) {
  const context = useContext(TabsContext);
  const active = context.value === value;

  return (
    <button
      onClick={() => context.setValue(value)}
      style={{
        border: "none",
        background: "none",
        padding: "8px 14px",
        cursor: "pointer",
        fontWeight: active ? 700 : 400,
        borderBottom: active ? "2px solid #5C45FD" : "2px solid transparent",
        color: active ? "#5C45FD" : "#555"
      }}
    >
      {children}
    </button>
  );
};

Tabs.Panel = function TabsPanel({value, children}) {
  const context = useContext(TabsContext);
  if (context.value !== value) return null;
  return <div style={{padding: 14}}>{children}</div>;
};

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <Tabs defaultValue="profile">
        <Tabs.List>
          <Tabs.Tab value="profile">Профил</Tabs.Tab>
          <Tabs.Tab value="security">Сигурност</Tabs.Tab>
          <Tabs.Tab value="billing">Плащания</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile">Име, имейл и снимка.</Tabs.Panel>
        <Tabs.Panel value="security">Парола и двуфакторна защита.</Tabs.Panel>
        <Tabs.Panel value="billing">Абонамент и фактури.</Tabs.Panel>
      </Tabs>
    </div>
  );
}
```

Точно така изглеждат интерфейсите на Radix и Headless UI. Вече не са магия.

## Компонент, който дава данни, но не вид

Друг похват: компонентът върши логиката, а какво се рисува решава този, който го ползва.

```sandbox
{"title":"Едни данни, два различни изгледа","height":620}
---
import {useState} from "react";

function Toggle({children}) {
  const [on, setOn] = useState(false);
  return children({on, toggle: () => setOn(!on)});
}

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16, display: "grid", gap: 14}}>
      <Toggle>
        {({on, toggle}) => (
          <button onClick={toggle}>{on ? "Включено" : "Изключено"}</button>
        )}
      </Toggle>

      <Toggle>
        {({on, toggle}) => (
          <div
            onClick={toggle}
            style={{width: 46, height: 26, borderRadius: 999, background: on ? "#16a34a" : "#ccc", cursor: "pointer", padding: 3, transition: "background 150ms"}}
          >
            <div style={{width: 20, height: 20, borderRadius: "50%", background: "white", marginLeft: on ? 20 : 0, transition: "margin 150ms"}} />
          </div>
        )}
      </Toggle>
    </div>
  );
}
```

```callout
{"type":"info","title":"Днес това по-често е custom hook"}
---
Същото се постига с `const {on, toggle} = useToggle()` и обикновено е по-четимо. Похватът с функция за дете ще го срещаш в по-стар код и в библиотеки — затова трябва да го разпознаваш.
```

## Кога да не усложняваш

```callout
{"type":"warn","title":"Два props не са проблем"}
---
Съставните компоненти имат цена: повече файлове, повече понятия, скрит контекст. Използвай ги, когато компонентът наистина се ползва на много места с различна структура. За карта, която се появява на едно място, обикновените props са по-добри.
```

```quiz
{"id":"react-2-07-q1","question":"Какъв проблем решават съставните компоненти?","options":["Производителността","Разрастването на props за всяка нова нужда","Управлението на състоянието","Стилизирането"],"answer":1,"explanation":"Вместо да описваш структурата чрез булеви props, я сглобяваш отвън от малки части. Компонентът спира да расте с всеки нов случай."}
```

```quiz
{"id":"react-2-07-q2","question":"Как `Tabs.Tab` разбира кой таб е активен?","options":["През props от родителя","През контекст, създаден в `Tabs`","Чете от адреса","През глобална променлива"],"answer":1,"explanation":"Родителят държи състоянието и го подава през контекст, затова частите могат да стоят на произволна дълбочина, без да си подават props."}
```

```takeaways
- Компонент, който расте с по един prop на екран, иска друга форма.
- Съставните компоненти преместват структурата там, където се ползва.
- Общото състояние между частите върви през контекст — отвън това не се вижда.
- Похватът има цена; за прост компонент обикновените props печелят.
