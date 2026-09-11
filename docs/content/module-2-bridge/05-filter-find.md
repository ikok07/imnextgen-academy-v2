---
module: "Модул 2: JavaScript"
section: "Модерен JavaScript: мостът към React"
sectionId: "69179597-4a79-4f8a-bbaf-0f79c5c6213d"
sectionOrder: 8
title: "filter и find: избиране от масив"
label: "js-bridge-05-filter-find"
---

`map` преобразува. `filter` избира. Разликата е в дължината на резултата: `map` винаги връща толкова елемента, колкото е получил, а `filter` връща толкова, колкото са издържали проверката.

## filter

Функцията, която подаваш, връща `true` или `false`. Елементите с `true` влизат в новия масив.

```run
{"title":"Само активните"}
---
const users = [
  {name: "Ива", active: true, age: 28},
  {name: "Георги", active: false, age: 35},
  {name: "Мария", active: true, age: 22}
];

const active = users.filter(user => user.active);
console.log(active.length, active.map(u => u.name));

const young = users.filter(user => user.age < 30);
console.log(young.map(u => u.name));
```

```callout
{"type":"warn","title":"Връщай условие, не стойност"}
---
`users.filter(user => user.age)` ще пропусне всички с възраст 0 и ще задържи останалите, защото числото се превръща в булева стойност. Пиши условието изрично: `user => user.age > 0`.
```

## find: първото съвпадение

`find` търси същото като `filter`, но връща **самия елемент**, а не масив — и спира при първото попадение.

```run
{"title":"find срещу filter"}
---
const products = [
  {id: 1, name: "Лаптоп"},
  {id: 2, name: "Мишка"},
  {id: 3, name: "Клавиатура"}
];

console.log(products.find(p => p.id === 2));
console.log(products.filter(p => p.id === 2));
console.log(products.find(p => p.id === 99));
```

Три различни резултата: обект, масив с един обект, и `undefined`. Ако търсиш един конкретен запис — `find`. Ако търсиш всички, които отговарят на условие — `filter`.

```callout
{"type":"tip","title":"В React това е ежедневие"}
---
`find` е начинът да намериш избрания продукт по id от URL адреса. `filter` е начинът да покажеш само резултатите, които отговарят на търсенето в полето. Ще ги пишеш всеки ден.
```

## Роднините: some, every, includes

```run
{"title":"Въпроси с да/не"}
---
const scores = [45, 78, 92, 60];

console.log("има ли отличен:", scores.some(score => score > 90));
console.log("всички ли са над 40:", scores.every(score => score > 40));
console.log("има ли точно 60:", scores.includes(60));
console.log("индекс на първия под 50:", scores.findIndex(score => score < 50));
```

Четирите връщат прост отговор вместо масив. `some` пита "поне един?", `every` пита "всички?", `includes` търси точна стойност, `findIndex` връща позиция (или -1).

## Верижно свързване

Тъй като `filter` и `map` връщат масиви, можеш да ги свържеш. Това е най-често срещаният шаблон в реален код:

```run
{"title":"Филтрирай, после преобразувай"}
---
const orders = [
  {id: 1, total: 120, paid: true},
  {id: 2, total: 45, paid: false},
  {id: 3, total: 310, paid: true}
];

const paidLabels = orders
  .filter(order => order.paid)
  .map(order => `Поръчка #${order.id}: ${order.total} лв.`);

console.log(paidLabels);
```

Прочети го отгоре надолу като изречение: вземи поръчките, задръж платените, направи от тях етикети. Точно затова тези методи изместиха циклите.

```quiz
{"id":"bridge-05-q1","question":"Какво връща `[1, 2, 3].find(n => n > 5)`?","options":["[]","undefined","null","-1"],"answer":1,"explanation":"`find` връща `undefined`, когато нищо не отговаря на условието. `filter` в същия случай би върнал празен масив, а `findIndex` би върнал -1."}
```

```quiz
{"id":"bridge-05-q2","question":"Кое е вярно за `filter`?","options":["Връща нов масив, който може да е по-къс от оригинала","Променя оригиналния масив на място","Връща винаги масив със същата дължина","Връща един елемент"],"answer":0,"explanation":"`filter` създава нов масив с елементите, издържали проверката. Оригиналът остава непроменен."}
```

## Твой ред

```task
{"id":"bridge-05-task-1","title":"Налични и евтини","tests":[{"call":"cheapInStock([{name:\"А\",price:10,stock:3},{name:\"Б\",price:80,stock:1},{name:\"В\",price:20,stock:0}], 50)","expect":["А"],"label":"Само наличните под лимита"},{"call":"cheapInStock([{name:\"А\",price:10,stock:2}], 5)","expect":[],"label":"Нищо под лимита"},{"call":"cheapInStock([], 50)","expect":[],"label":"Празен масив"}],"hint":"Първо filter с две условия (цена под лимита И наличност над нула), после map за имената."}
---
// Върни имената на продуктите, които са в наличност (stock > 0)
// и струват по-малко от limit.
function cheapInStock(products, limit) {

}
---
function cheapInStock(products, limit) {
  return products
    .filter(product => product.stock > 0 && product.price < limit)
    .map(product => product.name);
}
```

```task
{"id":"bridge-05-task-2","title":"Намери по id","tests":[{"call":"findName([{id:1,name:\"Ива\"},{id:2,name:\"Го\"}], 2)","expect":"Го","label":"Намира съществуващ"},{"call":"findName([{id:1,name:\"Ива\"}], 9)","expect":"Няма такъв","label":"Връща текст при липса"},{"call":"findName([], 1)","expect":"Няма такъв","label":"Празен масив"}],"hint":"`find` връща undefined при липса. Провери резултата, преди да вземеш `.name` от него - иначе кодът гърми."}
---
// Върни името на потребителя с даденото id,
// а ако няма такъв - текста "Няма такъв".
function findName(users, id) {

}
---
function findName(users, id) {
  const user = users.find(item => item.id === id);
  return user ? user.name : "Няма такъв";
}
```

```takeaways
- `filter` връща нов масив с издържалите проверката; дължината може да е различна.
- `find` връща първия съвпаднал елемент или `undefined`.
- `some`, `every`, `includes`, `findIndex` отговарят на прости въпроси, без да правят масив.
- Веригата `filter().map()` е основният начин да подготвиш данни за екрана.
