---
module: "Модул 3: React & NextJS"
section: "Компоненти, JSX и props"
sectionOrder: 1
title: "JSX: HTML вътре в JavaScript"
label: "react-2-01-jsx"
---

JSX изглежда като HTML, написан насред JavaScript. Не е нито едното, нито другото — той е синтактична украса върху обикновени извиквания на функции.

## Какво е всъщност

Този JSX:

```javascript
const element = <h1 className="title">Здравей</h1>;
```

се превръща в това:

```javascript
const element = React.createElement("h1", {className: "title"}, "Здравей");
```

Тоест JSX е **израз** — стойност като всяка друга. Може да се сложи в променлива, да се върне от функция, да се сложи в масив.

```sandbox
{"title":"JSX е просто стойност","height":340}
---
export default function App() {
  const greeting = <h2>Здравей от променлива</h2>;

  const items = [
    <li key="a">Първо</li>,
    <li key="b">Второ</li>
  ];

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      {greeting}
      <ul>{items}</ul>
    </div>
  );
}
```

## Правилата, които ще нарушиш поне веднъж

```steps
---
**Един корен.** Компонентът връща един елемент. Ако ти трябват няколко на едно ниво, обвий ги в `<div>` или в празен етикет `<>...</>` (фрагмент), който не оставя следа в HTML.
---
**`className`, не `class`.** `class` е запазена дума в JavaScript. Същото важи за `htmlFor` вместо `for`.
---
**Всеки етикет се затваря.** `<img />`, `<br />`, `<input />` — със затваряща наклонена черта.
---
**Атрибутите са camelCase.** `onClick`, `tabIndex`, `onChange` — не `onclick`.
---
**Фигурните скоби вкарват JavaScript.** Между `{` и `}` пишеш израз — променлива, извикване на функция, тернарен оператор.
```

```sandbox
{"title":"Изрази в скоби","height":380}
---
export default function App() {
  const user = {name: "Ива", visits: 7};
  const now = new Date();

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <h3>Здравей, {user.name.toUpperCase()}</h3>
      <p>Посещения: {user.visits}</p>
      <p>Удвоени: {user.visits * 2}</p>
      <p>Днес е {now.toLocaleDateString("bg-BG")}</p>
      <p>{user.visits > 5 ? "Редовен клиент" : "Нов клиент"}</p>
    </div>
  );
}
```

```callout
{"type":"warn","title":"Израз, не блок"}
---
В скобите влиза само нещо, което **има стойност**. `if` и `for` нямат — те са конструкции, не изрази. Затова в JSX се ползват тернарен оператор и `map`, а не `if` и цикъл.
```

## Какво React показва и какво пропуска

```sandbox
{"title":"Кое се вижда и кое не","height":360}
---
export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <p>Число: {42}</p>
      <p>Текст: {"здравей"}</p>
      <p>Масив: {[1, 2, 3]}</p>
      <p>null: {null}</p>
      <p>undefined: {undefined}</p>
      <p>false: {false}</p>
      <p>Нула: {0}</p>
    </div>
  );
}
```

`null`, `undefined` и `false` не се показват — това е удобно за условно рендиране. Но `0` се показва, и точно оттам идва един от най-честите бъгове в React, който ще срещнеш след няколко урока.

## Стилове в JSX

```javascript
<div style={{color: "red", fontSize: 18, marginTop: 12}}>Текст</div>
```

Двойните скоби не са специален синтаксис: външните вкарват JavaScript, вътрешните са обект. Имената на свойствата са camelCase, а числата се приемат за пиксели.

```quiz
{"id":"react-2-01-q1","question":"Защо в JSX се пише `className` вместо `class`?","options":["React е решил така за четимост","`class` е запазена дума в JavaScript","За да работи с CSS модули","Няма разлика, и двете работят"],"answer":1,"explanation":"JSX се превръща в JavaScript обекти, а `class` е запазена дума в езика. Затова атрибутът се казва `className`, също както в DOM API-то."}
```

```quiz
{"id":"react-2-01-q2","question":"Кое НЕ може да стои между фигурни скоби в JSX?","options":["`user.name`","`items.map(...)`","`if (x) {...}`","`x > 5 ? \"да\" : \"не\"`"],"answer":2,"explanation":"В скобите влизат само изрази — нещо със стойност. `if` е конструкция без стойност, затова в JSX се ползва тернарен оператор."}
```

```takeaways
- JSX е израз, който се превръща в `React.createElement`.
- Един корен на компонент; за няколко елемента — фрагмент `<>...</>`.
- `className`, `htmlFor`, camelCase атрибути, самозатварящи се етикети.
- В `{}` влизат изрази, не конструкции. `null`, `undefined` и `false` не се показват, но `0` се показва.
