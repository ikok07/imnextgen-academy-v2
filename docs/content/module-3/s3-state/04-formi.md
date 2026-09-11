---
module: "Модул 3: React & NextJS"
section: "State и събития"
sectionOrder: 2
title: "Форми и контролирани полета"
label: "react-3-04-forms"
---

В React полето за въвеждане обикновено не пази стойността си само. Пази я състоянието, а полето само я показва. Това се нарича **контролирано поле**.

```sandbox
{"title":"Стойността идва от състоянието","height":420}
---
import {useState} from "react";

export default function App() {
  const [text, setText] = useState("");

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <input
        value={text}
        onChange={event => setText(event.target.value)}
        placeholder="напиши нещо"
        style={{padding: 8, width: 220}}
      />
      <p>Написа: {text || <em style={{color: "#999"}}>нищо</em>}</p>
      <p>Дължина: {text.length}</p>
      <button onClick={() => setText("")}>Изчисти</button>
      <button onClick={() => setText(text.toUpperCase())} style={{marginLeft: 6}}>Главни букви</button>
    </div>
  );
}
```

Кръгът е: състояние → `value` → потребителят пише → `onChange` → ново състояние → ново рисуване. Понеже стойността минава през теб, можеш да я промениш, проверяваш или ограничиш в движение.

```callout
{"type":"danger","title":"value без onChange"}
---
`<input value={text} />` без `onChange` прави полето нередактируемо — потребителят пише, а нищо не се появява, защото React връща стойността от състоянието. React изписва предупреждение в конзолата. Двете винаги вървят заедно.
```

## Различните видове полета

```sandbox
{"title":"Текст, число, избор, отметка","height":560}
---
import {useState} from "react";

export default function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(18);
  const [city, setCity] = useState("plovdiv");
  const [agreed, setAgreed] = useState(false);
  const [note, setNote] = useState("");

  return (
    <div style={{fontFamily: "system-ui", padding: 16, display: "grid", gap: 10, maxWidth: 320}}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Име" />

      <input type="number" value={age} onChange={e => setAge(Number(e.target.value))} />

      <select value={city} onChange={e => setCity(e.target.value)}>
        <option value="sofia">София</option>
        <option value="plovdiv">Пловдив</option>
        <option value="varna">Варна</option>
      </select>

      <label>
        <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
        {" "}Съгласен съм с условията
      </label>

      <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="Бележка" />

      <pre style={{background: "#f5f5f5", padding: 10, fontSize: 12}}>
{JSON.stringify({name, age, city, agreed, note}, null, 2)}
      </pre>
    </div>
  );
}
```

Отметката ползва `checked` и `event.target.checked`, а не `value`. Числовото поле връща текст — затова `Number(...)`.

## Изпращане

```sandbox
{"title":"Форма с проверка","height":520}
---
import {useState} from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.includes("@")) {
      setError("Имейлът изглежда грешен.");
      return;
    }

    setError("");
    setSent(true);
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} style={{fontFamily: "system-ui", padding: 16, display: "grid", gap: 10, maxWidth: 300}}>
      <input
        value={email}
        onChange={event => { setEmail(event.target.value); setSent(false); }}
        placeholder="имейл"
        style={{padding: 8, borderColor: error ? "#dc2626" : "#ccc"}}
      />
      {error && <span style={{color: "#dc2626", fontSize: 13}}>{error}</span>}
      {sent && <span style={{color: "#16a34a", fontSize: 13}}>Записахме те.</span>}
      <button disabled={email.length === 0}>Изпрати</button>
    </form>
  );
}
```

Обърни внимание на `disabled={email.length === 0}` — състоянието управлява и бутона, не само полето.

```callout
{"type":"tip","title":"Големите форми"}
---
При пет-шест полета с проверки ръчното писане омръзва. Тогава екипите слагат `react-hook-form`. Но първо трябва да разбираш какво прави той вместо теб — затова тук е на ръка.
```

```quiz
{"id":"react-3-04-q1","question":"Какво е контролирано поле?","options":["Поле с валидация","Поле, чиято стойност идва от състоянието и се променя през onChange","Поле, което не може да се редактира","Поле вътре във форма"],"answer":1,"explanation":"Истината е в състоянието; полето само я показва. Затова стойността може да се чете, променя и проверява по всяко време."}
```

```quiz
{"id":"react-3-04-q2","question":"Кое свойство се ползва за отметка (checkbox)?","options":["`value` и `event.target.value`","`checked` и `event.target.checked`","`selected`","`on`"],"answer":1,"explanation":"Отметките имат булево състояние: `checked={agreed}` и `onChange={e => setAgreed(e.target.checked)}`."}
```

```takeaways
- Контролирано поле: `value` от състоянието + `onChange`, който го обновява.
- `value` без `onChange` заключва полето.
- Отметки: `checked` / `event.target.checked`. Числа: `Number(event.target.value)`.
- Състоянието управлява и бутоните, съобщенията за грешка и всичко останало.
