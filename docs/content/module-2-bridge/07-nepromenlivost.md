---
module: "Модул 2: JavaScript"
section: "Модерен JavaScript: мостът към React"
sectionId: "69179597-4a79-4f8a-bbaf-0f79c5c6213d"
sectionOrder: 8
title: "Неизменяемост: защо React не търпи промяна на място"
label: "js-bridge-07-immutability"
---

Има едно правило, което ще ти спести седмици объркване в React: **не променяй съществуващи масиви и обекти — прави нови**.

Звучи разточително. Всъщност е причината React изобщо да работи бързо.

## Защо

React решава дали да пречертае екрана, като сравнява старата стойност с новата. Сравнението е плитко — проверява дали това е **същият обект**, не дали съдържанието е същото.

```run
{"title":"Сравнението, което React прави"}
---
const a = [1, 2, 3];
const b = a;
b.push(4);

console.log("а и б са един и същи обект:", a === b);
console.log("а сега е:", a);

const c = [1, 2, 3];
const d = [...c, 4];

console.log("в и г са различни обекти:", c === d);
console.log("в остана:", c);
```

В първия случай променяш масива и React вижда същия обект — за него нищо не се е случило и екранът не се обновява. Във втория случай имаш нов обект и React разбира, че има промяна.

## Методите, които променят, и техните заместители

```run
{"title":"Мутиращите методи"}
---
const items = ["а", "б", "в"];

items.push("г");
items.splice(0, 1);
items.sort();
items.reverse();

console.log("оригиналът е неузнаваем:", items);
```

Ето таблицата, която трябва да ти е в главата:

| Вместо това (променя) | Пиши това (прави нов) |
| --- | --- |
| `arr.push(x)` | `[...arr, x]` |
| `arr.unshift(x)` | `[x, ...arr]` |
| `arr.pop()` | `arr.slice(0, -1)` |
| `arr.splice(i, 1)` | `arr.filter((_, index) => index !== i)` |
| `arr.sort()` | `[...arr].sort()` |
| `arr.reverse()` | `[...arr].reverse()` |
| `obj.key = value` | `{...obj, key: value}` |
| `delete obj.key` | деструктуриране с rest |

```run
{"title":"Същите операции, но безопасно"}
---
const items = ["б", "а", "в"];

const added = [...items, "г"];
const withoutFirst = items.slice(1);
const sorted = [...items].sort();

console.log("оригинал:", items);
console.log("добавен:", added);
console.log("без първия:", withoutFirst);
console.log("подреден:", sorted);
```

```callout
{"type":"danger","title":"sort е най-коварният"}
---
`sort` изглежда невинно, защото връща масив — и хората решават, че е като `map`. Но той връща **същия** масив, вече пренареден. Затова винаги: `[...arr].sort(...)`.
```

## Обекти

```run
{"title":"Промяна на поле"}
---
const user = {name: "Ива", city: "Пловдив", age: 28};

const older = {...user, age: 29};

console.log(user);
console.log(older);

const {age, ...withoutAge} = user;
console.log("без age:", withoutAge);
```

Разпръскваш стария обект и после изброяваш това, което сменяш. Редът има значение: каквото е след разпръскването, печели.

## Вложени структури

Разпръскването е плитко — копира само първото ниво.

```run
{"title":"Клопката с вложения обект"}
---
const settings = {theme: "dark", notifications: {email: true, sms: false}};

const copy = {...settings};
copy.notifications.email = false;

console.log("оригиналът също се промени:", settings.notifications.email);

const safeCopy = {
  ...settings,
  notifications: {...settings.notifications, email: false}
};
console.log("безопасно:", settings.notifications.email, safeCopy.notifications.email);
```

За всяко ниво, което променяш, трябва ново разпръскване. Затова в React се стараеш състоянието да е плоско.

```quiz
{"id":"bridge-07-q1","question":"Кой запис НЕ променя оригиналния масив?","options":["`arr.sort()`","`arr.push(5)`","`[...arr].sort()`","`arr.splice(0, 1)`"],"answer":2,"explanation":"`sort`, `push` и `splice` работят върху оригинала. Разпръскването първо прави копие и едва то се подрежда."}
```

```quiz
{"id":"bridge-07-q2","question":"Какво е `{...user, age: 29}`, ако user вече има age: 28?","options":["Грешка - полето се повтаря","Нов обект с age: 29","Нов обект с age: 28","Променя user на място"],"answer":1,"explanation":"Полетата се прилагат отляво надясно, така че последното записване печели. Оригиналът остава непроменен."}
```

## Твой ред

```task
{"id":"bridge-07-task-1","title":"Добави, без да чупиш","tests":[{"call":"(() => { const base = [\"а\"]; const next = addItem(base, \"б\"); return [base, next]; })()","expect":[["а"],["а","б"]],"label":"Оригиналът остава, новият е с добавения"},{"call":"addItem([], \"едно\")","expect":["едно"],"label":"Работи и с празен масив"}],"hint":"Разпръсни стария масив и добави новия елемент накрая."}
---
// Върни НОВ масив с добавен елемент накрая.
function addItem(items, item) {

}
---
function addItem(items, item) {
  return [...items, item];
}
```

```task
{"id":"bridge-07-task-2","title":"Подреди по цена, без да пипаш оригинала","tests":[{"call":"sortByPrice([{n:\"а\",price:30},{n:\"б\",price:10}]).map(p => p.n)","expect":["б","а"],"label":"Подрежда възходящо"},{"call":"(() => { const list = [{n:\"а\",price:30},{n:\"б\",price:10}]; sortByPrice(list); return list.map(p => p.n); })()","expect":["а","б"],"label":"Оригиналът остава непроменен"}],"hint":"Първо копие с разпръскване, после sort с функция за сравнение: `(a, b) => a.price - b.price`."}
---
// Върни НОВ масив, подреден по цена възходящо.
function sortByPrice(products) {

}
---
function sortByPrice(products) {
  return [...products].sort((a, b) => a.price - b.price);
}
```

```task
{"id":"bridge-07-task-3","title":"Превключи едно поле във вложен обект","tests":[{"call":"toggleEmail({theme:\"dark\",notifications:{email:true,sms:false}}).notifications.email","expect":false,"label":"Обръща стойността"},{"call":"toggleEmail({theme:\"dark\",notifications:{email:true,sms:false}}).notifications.sms","expect":false,"label":"Не пипа другите полета"},{"call":"(() => { const s = {theme:\"dark\",notifications:{email:true,sms:false}}; toggleEmail(s); return s.notifications.email; })()","expect":true,"label":"Оригиналът остава непроменен"}],"hint":"Две нива разпръскване: външният обект и вложеният notifications."}
---
// Върни НОВ обект, в който notifications.email е обърнат на обратното.
function toggleEmail(settings) {

}
---
function toggleEmail(settings) {
  return {
    ...settings,
    notifications: {
      ...settings.notifications,
      email: !settings.notifications.email
    }
  };
}
```

```takeaways
- React сравнява препратки, не съдържание — затова променен на място масив изглежда като "нищо не се е случило".
- `push`, `splice`, `sort`, `reverse` променят; `[...arr]`, `slice`, `filter`, `map` правят нов.
- `{...obj, key: value}` е начинът да смениш поле.
- Разпръскването е плитко: за всяко вложено ниво ти трябва ново разпръскване.
