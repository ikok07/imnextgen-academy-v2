---
module: "Модул 2: JavaScript"
section: "Модерен JavaScript: мостът към React"
sectionId: "69179597-4a79-4f8a-bbaf-0f79c5c6213d"
sectionOrder: 8
title: "async/await и грешките"
label: "js-bridge-11-async-await"
---

`then` работи, но веригите стават трудни за четене. `async`/`await` е същото нещо, написано така, че да се чете отгоре надолу.

## Същият код, два начина

```run
{"title":"then срещу await","waitMs":3000}
---
function withThen() {
  return fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => response.json())
    .then(user => console.log("then:", user.name));
}

async function withAwait() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users/2");
  const user = await response.json();
  console.log("await:", user.name);
}

withThen();
withAwait();
```

Две правила и знаеш всичко:

```steps
---
`await` спира изпълнението на функцията, докато обещанието се изпълни, и ти дава направо стойността — не обещанието.
---
`await` работи само вътре във функция, обявена с `async`. Всяка `async` функция връща обещание, дори да връщаш обикновено число.
```

```run
{"title":"async функцията винаги връща обещание"}
---
async function getNumber() {
  return 42;
}

console.log(getNumber());
getNumber().then(value => console.log("стойността:", value));
```

## Грешките: try/catch

При `await` грешките се хващат с познатия `try/catch`, а не с `.catch()`.

```run
{"title":"Хващане на грешка","waitMs":2500}
---
async function loadUser(id) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    if (!response.ok) throw new Error("Сървърът върна " + response.status);

    const user = await response.json();
    return user.name;
  } catch (error) {
    console.log("нещо се обърка:", error.message);
    return null;
  } finally {
    console.log("край на заявката за id", id);
  }
}

loadUser(1).then(name => console.log("резултат:", name));
loadUser(99999).then(name => console.log("резултат:", name));
```

`finally` се изпълнява и при успех, и при провал — там се гаси индикаторът "зарежда се".

```callout
{"type":"danger","title":"Забравеният await"}
---
Без `await` получаваш обещание вместо стойност и после се чудиш защо `user.name` е `undefined`. Ако в конзолата видиш `Promise { <pending> }`, значи някъде липсва `await`.
```

## Едновременно вместо едно по едно

```run
{"title":"Две заявки наведнъж","waitMs":3500}
---
async function sequential() {
  const start = Date.now();
  const a = await fetch("https://jsonplaceholder.typicode.com/users/1").then(r => r.json());
  const b = await fetch("https://jsonplaceholder.typicode.com/users/2").then(r => r.json());
  console.log("едно по едно:", Date.now() - start, "мс", a.name, b.name);
}

async function parallel() {
  const start = Date.now();
  const [a, b] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users/1").then(r => r.json()),
    fetch("https://jsonplaceholder.typicode.com/users/2").then(r => r.json())
  ]);
  console.log("наведнъж:", Date.now() - start, "мс", a.name, b.name);
}

sequential().then(parallel);
```

Ако двете заявки не зависят една от друга, `Promise.all` ги пуска заедно. Ако едната се провали, се проваля цялото — за по-щадящ вариант има `Promise.allSettled`.

```quiz
{"id":"bridge-11-q1","question":"Какво връща `async function f() { return 1; }` при извикване?","options":["Числото 1","Promise, който се изпълнява с 1","undefined","Грешка, защото няма await"],"answer":1,"explanation":"Всяка `async` функция опакова резултата си в обещание. За да стигнеш до 1, трябва `await f()` или `f().then(...)`."}
```

```quiz
{"id":"bridge-11-q2","question":"Как се хваща грешка при `await`?","options":["С `.catch()` след await","С `try/catch` около него","Грешките при await не могат да се хващат","С `finally`"],"answer":1,"explanation":"`await` хвърля изключение при отхвърлено обещание, затова се хваща с обикновен `try/catch`. `finally` само подрежда след себе си — не хваща."}
```

## Твой ред

```task
{"id":"bridge-11-task-1","title":"Пренапиши с async/await","tests":[{"call":"getTotal(1)","expect":250,"label":"Връща сумата на съществуваща поръчка"},{"call":"getTotal(99)","expect":0,"label":"При липса връща 0 вместо да гърми"}],"hint":"Обяви функцията като `async`, използвай `await loadOrder(id)` в `try`, а в `catch` върни 0."}
---
const ORDERS = [{id: 1, total: 250}, {id: 2, total: 90}];

function loadOrder(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = ORDERS.find(item => item.id === id);
      order ? resolve(order) : reject(new Error("Няма такава поръчка"));
    }, 10);
  });
}

// Върни сумата на поръчката, а при грешка - 0.
function getTotal(id) {

}
---
const ORDERS = [{id: 1, total: 250}, {id: 2, total: 90}];

function loadOrder(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = ORDERS.find(item => item.id === id);
      order ? resolve(order) : reject(new Error("Няма такава поръчка"));
    }, 10);
  });
}

async function getTotal(id) {
  try {
    const order = await loadOrder(id);
    return order.total;
  } catch (error) {
    return 0;
  }
}
```

```task
{"id":"bridge-11-task-2","title":"Заредѝ няколко наведнъж","tests":[{"call":"loadAll([1, 2])","expect":[250,90],"label":"Връща сумите в същия ред"},{"call":"loadAll([])","expect":[],"label":"Празен списък дава празен масив"}],"hint":"`Promise.all` приема масив от обещания. Направи го с `map`, после изтегли `total` от всяка поръчка."}
---
const ORDERS = [{id: 1, total: 250}, {id: 2, total: 90}];

function loadOrder(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve(ORDERS.find(item => item.id === id)), 10);
  });
}

// Върни масив със сумите на подадените поръчки, заредени едновременно.
function loadAll(ids) {

}
---
const ORDERS = [{id: 1, total: 250}, {id: 2, total: 90}];

function loadOrder(id) {
  return new Promise(resolve => {
    setTimeout(() => resolve(ORDERS.find(item => item.id === id)), 10);
  });
}

async function loadAll(ids) {
  const orders = await Promise.all(ids.map(id => loadOrder(id)));
  return orders.map(order => order.total);
}
```

## Финална задача на моста

```submit
{"id":"bridge-11-final","title":"Мини приложение с реални данни","requirements":["Функция `loadUserCard(id)`, която тегли потребител от `https://jsonplaceholder.typicode.com/users/{id}` и връща обект с `name`, `city` и `company`.","Проверявай `response.ok` и хвърляй ясна грешка при лош статус.","Функция `loadCards(ids)`, която зарежда няколко потребителя **едновременно** с `Promise.all`.","При несъществуващ потребител приложението да не гърми — върни `null` за него и продължи с останалите.","Използвай `async`/`await` и `try/catch`, без вериги от `then`."],"askForLink":true}
---
async function loadUserCard(id) {

}

async function loadCards(ids) {

}

loadCards([1, 2, 99999]).then(cards => console.log(cards));
```

```callout
{"type":"tip","title":"С това мостът приключва"}
---
Вече имаш всичко, което React приема за даденост: `this` и `bind`, closures, `map`/`filter`/`reduce`, неизменяемост, модули и асинхронен код. Следващата спирка е Модул 3 — и там нищо няма да ти изглежда като магия.
```

```takeaways
- `await` изчаква обещанието и връща стойността; работи само в `async` функция.
- Всяка `async` функция връща обещание.
- Грешките се хващат с `try/catch`, а `finally` подрежда след себе си.
- Независимите заявки вървят заедно с `Promise.all`, не една след друга.
