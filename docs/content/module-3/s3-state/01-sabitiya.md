---
module: "Модул 3: React & NextJS"
section: "State и събития"
sectionOrder: 2
title: "Събития в React"
label: "react-3-01-events"
---

В чист JavaScript закачаше слушател: `button.addEventListener("click", handler)`. В React подаваш функцията направо на елемента.

```sandbox
{"title":"Първите събития","height":420,"showConsole":true}
---
export default function App() {
  function handleClick() {
    console.log("Натиснато");
  }

  return (
    <div style={{fontFamily: "system-ui", padding: 16, display: "grid", gap: 10}}>
      <button onClick={handleClick}>Подадена функция</button>

      <button onClick={() => console.log("В движение")}>Стрелкова на място</button>

      <input
        placeholder="пиши тук"
        onChange={event => console.log("стойност:", event.target.value)}
      />

      <div
        onMouseEnter={() => console.log("влязохме")}
        style={{border: "1px dashed #ccc", padding: 10}}
      >
        Мини курсора отгоре
      </div>
    </div>
  );
}
```

## Трите правила

```steps
---
**Името е camelCase**: `onClick`, `onChange`, `onSubmit`, `onMouseEnter`.
---
**Подаваш функция, не извикване.** `onClick={handleClick}` — без скоби. Със скоби извикваш функцията още при рисуването.
---
**Аргументите изискват обвивка**: `onClick={() => remove(item.id)}`. Стрелковата функция се създава сега, но се изпълнява при клик.
```

```callout
{"type":"danger","title":"Безкраен цикъл от една двойка скоби"}
---
`onClick={setCount(count + 1)}` изпълнява промяната при рисуването, което предизвиква ново рисуване, което пак я изпълнява. Приложението замръзва. Правилно: `onClick={() => setCount(count + 1)}`.
```

## Обектът на събитието

React ти подава събитие, което работи еднакво във всички браузъри:

```sandbox
{"title":"Какво има в event","height":440,"showConsole":true}
---
export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16, display: "grid", gap: 10}}>
      <input
        placeholder="въведи нещо"
        onChange={event => console.log("value:", event.target.value)}
      />

      <input
        placeholder="натисни Enter"
        onKeyDown={event => {
          if (event.key === "Enter") console.log("Enter при:", event.target.value);
        }}
      />

      <form onSubmit={event => {
        event.preventDefault();
        console.log("формата не презареди страницата");
      }}>
        <button>Изпрати</button>
      </form>
    </div>
  );
}
```

`event.target.value` е стойността на полето, `event.key` е натиснатият клавиш, `event.preventDefault()` спира стандартното поведение на браузъра.

```callout
{"type":"warn","title":"Формите презареждат страницата"}
---
Без `event.preventDefault()` в `onSubmit` браузърът изпраща формата по стария начин и презарежда всичко. Състоянието изчезва. Това е първото нещо, което се пише във всеки `onSubmit`.
```

## Изкачване на събитието

Кликът върху дете стига и до родителя. Понякога това е добре, понякога — не:

```sandbox
{"title":"stopPropagation","height":420,"showConsole":true}
---
export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <div
        onClick={() => console.log("кликнат е редът")}
        style={{border: "1px solid #ddd", padding: 14, borderRadius: 8, cursor: "pointer"}}
      >
        Ред от списък

        <button onClick={() => console.log("само бутонът")} style={{marginLeft: 10}}>
          без спиране
        </button>

        <button
          onClick={event => {
            event.stopPropagation();
            console.log("само бутонът, спряно");
          }}
          style={{marginLeft: 6}}
        >
          със спиране
        </button>
      </div>
    </div>
  );
}
```

Натисни двата бутона и сравни какво влиза в конзолата. Първият задейства и реда, и себе си. Вторият спира събитието при себе си.

```quiz
{"id":"react-3-01-q1","question":"Каква е разликата между `onClick={remove}` и `onClick={remove()}`?","options":["Няма разлика","Първото подава функцията, второто я извиква веднага при рисуването","Второто е по-новият синтаксис","Първото работи само без аргументи"],"answer":1,"explanation":"Скобите извикват. `onClick={remove()}` изпълнява функцията при рисуването и подава резултата ѝ на onClick — а ако тя мени състояние, получаваш безкраен цикъл."}
```

```quiz
{"id":"react-3-01-q2","question":"Защо в `onSubmit` се пише `event.preventDefault()`?","options":["За да спре изкачването на събитието","За да не презареди браузърът страницата при изпращане на формата","За да изчисти полетата","Не е задължително"],"answer":1,"explanation":"Стандартното поведение на формата е да изпрати заявка и да презареди страницата, при което цялото състояние на приложението изчезва."}
```

```takeaways
- Слушателите се подават като props: `onClick`, `onChange`, `onSubmit`.
- Подавай функция, не извикване; за аргументи ползвай стрелкова обвивка.
- `event.preventDefault()` във всяка форма; `event.stopPropagation()`, когато не искаш родителят да разбере.
