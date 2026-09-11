---
module: "Модул 3: React & NextJS"
section: "Мислене в React: ефекти и данни"
sectionOrder: 3
title: "Зависимости и чистене"
label: "react-4-03-deps-cleanup"
---

Две неща превръщат `useEffect` от опасен в предвидим: правилният списък със зависимости и чистенето след себе си.

## Чистенето

Всеки ефект, който **започва нещо продължаващо**, трябва да го спре. Таймер, абонамент, отворена връзка.

```sandbox
{"title":"Таймер, който се спира","height":480}
---
import {useState, useEffect} from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSeconds(current => current + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return <p style={{fontSize: 22, margin: "8px 0"}}>Секунди: {seconds}</p>;
}

export default function App() {
  const [visible, setVisible] = useState(true);

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <button onClick={() => setVisible(!visible)}>
        {visible ? "Скрий таймера" : "Покажи таймера"}
      </button>
      {visible && <Timer />}
      <p style={{fontSize: 13, color: "#666"}}>
        Без `clearInterval` таймерът щеше да продължи да работи след скриването и да пише в несъществуващ компонент.
      </p>
    </div>
  );
}
```

Забележи и `setSeconds(current => current + 1)`. С `setSeconds(seconds + 1)` ефектът щеше да помни снимката от първото рисуване и броячът щеше да засяда на 1.

```sandbox
{"title":"Абонамент за размера на прозореца","height":460}
---
import {useState, useEffect} from "react";

export default function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <p style={{fontSize: 20}}>Ширина: {width}px</p>
      <p>{width < 500 ? "Тесен екран" : "Широк екран"}</p>
      <p style={{fontSize: 13, color: "#666"}}>Провлачи границата между редактора и прегледа.</p>
    </div>
  );
}
```

Схемата е винаги една: **закачи в тялото, откачи в чистенето**.

## Списъкът със зависимости

Правилото е кратко: **всичко, което ефектът чете отвън и може да се промени, влиза в списъка.**

```sandbox
{"title":"Липсваща зависимост","height":520,"showConsole":true}
---
import {useState, useEffect} from "react";

export default function App() {
  const [userId, setUserId] = useState(1);
  const [log, setLog] = useState([]);

  useEffect(() => {
    setLog(current => [...current, `Зареждам данни за потребител ${userId}`]);
  }, [userId]);

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <button onClick={() => setUserId(1)}>Потребител 1</button>
      <button onClick={() => setUserId(2)} style={{marginLeft: 6}}>Потребител 2</button>
      <button onClick={() => setUserId(3)} style={{marginLeft: 6}}>Потребител 3</button>

      <ul style={{fontSize: 13}}>
        {log.map((line, index) => <li key={index}>{line}</li>)}
      </ul>
    </div>
  );
}
```

Махни `userId` от масива и ефектът ще зарежда вечно първия потребител. Именно затова ESLint правилото `react-hooks/exhaustive-deps` предупреждава — и почти винаги е право.

```callout
{"type":"danger","title":"Не заглушавай предупреждението"}
---
Изкушението е да сложиш коментар, който изключва правилото. Това не поправя нищо — само скрива бъга. Ако ефектът не бива да се изпълнява при промяна на нещо, значи структурата е грешна: извади логиката навън или ползвай функционална форма.
```

## Безкрайният цикъл

```steps
{"title":"Как се получава"}
---
Ефектът мени състояние.
---
Промяната предизвиква ново рисуване.
---
Новото рисуване изпълнява ефекта пак, защото зависимостта се е променила.
---
Приложението замръзва. Най-често причината е обект или масив в зависимостите, който се създава наново при всяко рисуване.
```

```callout
{"type":"warn","title":"Обект в зависимостите"}
---
`useEffect(..., [options])`, където `const options = {id: 1}` се създава вътре в компонента, се изпълнява всеки път — новият обект никога не е равен на стария. Слагай в зависимостите примитивни стойности: `[options.id]`.
```

```quiz
{"id":"react-4-03-q1","question":"Кога се изпълнява функцията, върната от useEffect?","options":["Веднага след тялото","Преди следващото изпълнение на ефекта и при премахване на компонента","Само при грешка","При всяко рисуване"],"answer":1,"explanation":"Чистенето върви преди всяко следващо изпълнение на ефекта и веднъж накрая, когато компонентът се маха от екрана."}
```

```quiz
{"id":"react-4-03-q2","question":"Ефект чете `userId` и мени състояние. Какво трябва да има в зависимостите?","options":["Празен масив","`[userId]`","Нищо, без втори аргумент","`[userId, setState]`"],"answer":1,"explanation":"Всичко, което ефектът чете отвън и може да се промени, влиза в списъка. Функциите за промяна на състояние са стабилни и не е нужно да се изброяват."}
```

```takeaways
- Ефект, който започва нещо продължаващо, го спира в чистенето.
- Закачи в тялото, откачи в чистенето — винаги в двойка.
- В зависимостите влиза всичко, което ефектът чете отвън.
- Обект или масив, създаден при рисуването, в зависимостите означава безкраен цикъл.
