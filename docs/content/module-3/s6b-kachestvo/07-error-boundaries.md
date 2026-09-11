---
module: "Модул 3: React & NextJS"
section: "Качество: производителност, достъпност и тестове"
sectionOrder: 6
title: "Error Boundaries: когато нещо гръмне"
label: "react-q-07-error-boundaries"
---

React има едно безкомпромисно правило: грешка при рисуване, която никой не хване, събаря **цялото** приложение. Не компонента — приложението. Екранът става бял.

```javascript
function ProductPrice({product}) {
  return <p>{product.price.toFixed(2)} лв.</p>;
}
```

Един продукт без `price` и целият магазин изчезва.

## Границата за грешки

Error boundary е компонент, който хваща грешките от поддървото под себе си и показва нещо вместо белия екран.

```sandbox
{"title":"Със и без граница","height":680}
---
import {useState, Component} from "react";

class ErrorBoundary extends Component {
  state = {error: null};

  static getDerivedStateFromError(error) {
    return {error};
  }

  componentDidCatch(error, info) {
    console.error("Хванато от границата:", error.message, info.componentStack?.slice(0, 80));
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{border: "1px solid #fecaca", background: "#fef2f2", color: "#b91c1c", borderRadius: 8, padding: 12}}>
          <strong>Тази част не можа да се зареди.</strong>
          <p style={{margin: "6px 0", fontSize: 13}}>{this.state.error.message}</p>
          <button onClick={() => this.setState({error: null})}>Опитай пак</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function Broken({shouldBreak}) {
  if (shouldBreak) {
    const product = {name: "Лаптоп"};
    return <p>{product.price.toFixed(2)} лв.</p>;
  }
  return <p style={{color: "#16a34a"}}>Всичко е наред.</p>;
}

export default function App() {
  const [broken, setBroken] = useState(false);

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <button onClick={() => setBroken(!broken)}>
        {broken ? "Поправи" : "Счупи компонента"}
      </button>

      <div style={{marginTop: 12}}>
        <p style={{fontSize: 13, color: "#666", marginBottom: 4}}>Останалата част от страницата продължава да работи:</p>
        <ErrorBoundary>
          <Broken shouldBreak={broken} />
        </ErrorBoundary>
      </div>

      <p style={{marginTop: 12, fontSize: 13, color: "#666"}}>
        Без границата белият екран щеше да е целият преглед.
      </p>
    </div>
  );
}
```

```callout
{"type":"info","title":"Защо е клас"}
---
Това е единственото място в модерния React, където още се пише клас: няма hook, който да хваща грешки от рисуването. В реални проекти се ползва готовият пакет `react-error-boundary`, който дава същото с по-приятен интерфейс.
```

## Къде се слагат границите

```steps
---
**Около цялото приложение** — последната мрежа, за да не се стига до бял екран никога.
---
**Около всяка страница** — една счупена страница не бива да събаря навигацията.
---
**Около рискови части** — графики, вградени плейъри, редактори, всичко, което рисува чужди данни.
---
**Около всеки елемент от списък**, ако един счупен ред не бива да скрива останалите.
```

Границите се влагат: най-близката хваща грешката.

## Какво НЕ хваща

```steps
---
**Грешки в обработчици на събития.** `onClick`, който гърми, не минава през границата — там ползваш `try/catch`.
---
**Асинхронен код.** Грешка в `setTimeout` или в `.then()` не се хваща.
---
**Грешки при рисуване на сървъра.**
---
**Грешки в самата граница.**
```

```javascript
function DeleteButton({id}) {
  async function handleClick() {
    try {
      await deleteItem(id);
    } catch (error) {
      toast.error("Изтриването не успя.");
    }
  }

  return <button onClick={handleClick}>Изтрий</button>;
}
```

Затова `useQuery` и `useMutation` връщат `error` като стойност — асинхронните грешки се обработват там, не от границата.

## Съобщението има значение

```callout
{"type":"danger","title":"Не показвай техническата грешка"}
---
`Cannot read properties of undefined (reading 'price')` не значи нищо за потребителя и подсказва повече, отколкото трябва. Покажи човешко изречение и бутон за повторен опит, а истинската грешка изпрати в конзолата или в системата за наблюдение.
```

В Next.js `error.jsx` е точно този механизъм, само че готов — получава `error` и `reset` и покрива своя клон от маршрутите.

```quiz
{"id":"react-q-07-q1","question":"Какво се случва при неуловена грешка по време на рисуване?","options":["Само този компонент изчезва","React сваля цялото приложение и екранът остава празен","Грешката се изписва само в конзолата","React показва предишната версия"],"answer":1,"explanation":"React предпочита празен екран пред интерфейс в неизвестно състояние. Затова границите за грешки не са екзотика, а нормална част от приложението."}
```

```quiz
{"id":"react-q-07-q2","question":"Кое НЕ се хваща от error boundary?","options":["Грешка при рисуване на дете","Грешка в onClick обработчик","Грешка в дълбоко вложен компонент","Грешка при четене на несъществуващо поле в JSX"],"answer":1,"explanation":"Обработчиците на събития не са част от рисуването. Там се ползва `try/catch` и съобщение към потребителя."}
```

```takeaways
- Неуловена грешка при рисуване събаря цялото приложение.
- Error boundary е клас компонент, който хваща поддървото под себе си.
- Слагай граници около приложението, около страниците и около рисковите части.
- Събития и асинхронен код се хващат с `try/catch`, не от границата.
- Показвай човешко съобщение, а техническото пращай в лог.
