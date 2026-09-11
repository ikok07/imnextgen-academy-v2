---
module: "Модул 3: React & NextJS"
section: "Компоненти, JSX и props"
sectionOrder: 1
title: "props: данните идват отгоре"
label: "react-2-02-props"
---

Компонентът е функция. Props са нейните аргументи — единственият начин родителят да подаде данни на детето.

## Подаване и получаване

```sandbox
{"title":"Един компонент, три различни карти","height":420}
---
function UserCard({name, role, active}) {
  return (
    <div style={{border: "1px solid #ddd", borderRadius: 8, padding: 12, marginBottom: 8}}>
      <strong>{name}</strong> — {role}
      <span style={{marginLeft: 8, color: active ? "green" : "#999"}}>
        {active ? "активен" : "неактивен"}
      </span>
    </div>
  );
}

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <UserCard name="Ива" role="ментор" active={true} />
      <UserCard name="Георги" role="курсист" active={false} />
      <UserCard name="Мария" role="курсист" active />
    </div>
  );
}
```

Три неща за отбелязване:

```steps
---
**Текст се подава в кавички**, всичко останало — в скоби: `age={28}`, `tags={["а", "б"]}`, `user={userObject}`.
---
**Само име на prop** значи `true`. `active` е същото като `active={true}`.
---
**Деструктурирането в аргументите** (`{name, role}`) е конвенцията. Алтернативата е `props.name` — работи, но е по-шумно.
```

## Стойности по подразбиране

```sandbox
{"title":"Резервни стойности","height":360}
---
function Button({label = "Изпрати", variant = "primary", disabled = false}) {
  const colors = {
    primary: {background: "#5C45FD", color: "white"},
    ghost: {background: "transparent", color: "#5C45FD", border: "1px solid #5C45FD"}
  };

  return (
    <button
      disabled={disabled}
      style={{...colors[variant], border: "none", borderRadius: 6, padding: "8px 16px", marginRight: 8, opacity: disabled ? 0.5 : 1}}
    >
      {label}
    </button>
  );
}

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <Button />
      <Button label="Откажи" variant="ghost" />
      <Button label="Изчакай" disabled />
    </div>
  );
}
```

## Props са само за четене

```callout
{"type":"danger","title":"Не пипай props"}
---
`props.name = "друго"` е забранено. React разчита, че компонентът не променя входа си — това е предпоставката, върху която стъпва цялата система за обновяване. Ако трябва да промениш стойност, тя не е props, а state (следващата секция).
```

Посоката на данните е винаги **отгоре надолу**. Родителят решава какво да види детето. Детето не може да промени родителя — може само да му се обади чрез функция, подадена като prop:

```sandbox
{"title":"Функция като prop","height":400,"showConsole":true}
---
function DeleteButton({onDelete, label}) {
  return <button onClick={onDelete} style={{marginLeft: 8}}>{label}</button>;
}

export default function App() {
  function handleDelete(name) {
    console.log("Изтриване на " + name);
  }

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <span>Ива</span>
      <DeleteButton label="Изтрий" onDelete={() => handleDelete("Ива")} />
      <p style={{fontSize: 13, color: "#666"}}>Натисни бутона и виж конзолата долу.</p>
    </div>
  );
}
```

Детето не знае какво прави `onDelete`. Знае само кога да го извика. Това е основният начин информацията да тръгне нагоре.

```callout
{"type":"warn","title":"Извикване вместо подаване"}
---
`onClick={handleDelete()}` извиква функцията веднага при рисуването и подава резултата ѝ. Правилно е `onClick={handleDelete}` (подаваш функцията) или `onClick={() => handleDelete("Ива")}` (подаваш нова функция, която ще я извика).
```

## Разпръскване на props

Когато данните вече са в обект:

```javascript
const user = {name: "Ива", role: "ментор", active: true};

<UserCard {...user} />
```

Удобно, но пести четимост: гледайки повикването, не виждаш какво получава компонентът. Ползвай го за препращане на много props, не за скриване на небрежност.

```quiz
{"id":"react-2-02-q1","question":"Какво прави `<Button onClick={handleClick()} />`?","options":["Подава функцията за по-късно","Извиква handleClick веднага при рисуването и подава резултата ѝ","Същото като onClick={handleClick}","Грешка при компилиране"],"answer":1,"explanation":"Скобите извикват функцията на място. На `onClick` отива върнатата стойност — обикновено `undefined`. Подавай самата функция или я обвий в стрелкова."}
```

```quiz
{"id":"react-2-02-q2","question":"Как дете съобщава нещо на родителя си?","options":["Като промени props","Като извика функция, която родителят му е подал като prop","Като промени глобална променлива","Не може"],"answer":1,"explanation":"Данните вървят надолу, събитията — нагоре, през функции-props. Това държи потока предвидим."}
```

```takeaways
- Props са аргументите на компонента; текст в кавички, всичко друго в скоби.
- Стойности по подразбиране се задават при деструктурирането.
- Props са само за четене — данните текат отгоре надолу.
- Нагоре се съобщава с функция-prop; подавай функцията, не резултата ѝ.
