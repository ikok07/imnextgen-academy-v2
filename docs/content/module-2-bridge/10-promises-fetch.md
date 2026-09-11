---
module: "Модул 2: JavaScript"
section: "Модерен JavaScript: мостът към React"
sectionId: "69179597-4a79-4f8a-bbaf-0f79c5c6213d"
sectionOrder: 8
title: "Promises и fetch: приложението говори със сървър"
label: "js-bridge-10-promises"
---

Досега целият ти код се изпълняваше веднага. Но истинските данни идват отвън — от сървър, който отговаря след 300 милисекунди или изобщо не отговаря.

JavaScript не чака. Той тръгва нататък и се връща, когато отговорът дойде. Механизмът се казва **Promise**.

## Какво е Promise

Обещание за стойност, която още я няма. Има три състояния: чака, изпълнено, отхвърлено.

```run
{"title":"Обещание, което се сбъдва след половин секунда","waitMs":900}
---
const promise = new Promise((resolve) => {
  setTimeout(() => resolve("Готово!"), 500);
});

console.log("1. Пуснахме заявката");

promise.then(result => console.log("3. Отговор:", result));

console.log("2. Кодът продължи нататък");
```

Виж реда на числата в конзолата. Ред 2 се изпълнява преди ред 3, макар че е написан след него. Това е цялата идея: докато чакаш, нищо не блокира.

## then и catch

```run
{"title":"Успех и провал","waitMs":700}
---
function loadUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id === 1) resolve({id: 1, name: "Ива"});
      else reject(new Error("Няма такъв потребител"));
    }, 300);
  });
}

loadUser(1)
  .then(user => console.log("намерен:", user.name))
  .catch(error => console.log("грешка:", error.message));

loadUser(42)
  .then(user => console.log("намерен:", user.name))
  .catch(error => console.log("грешка:", error.message));
```

`then` хваща успеха, `catch` хваща провала. Без `catch` грешката изчезва тихо — а тихите грешки са най-скъпите.

## fetch

`fetch` е вградената функция за заявки към сървър. Тя връща Promise.

```run
{"title":"Истинска заявка към публично API","waitMs":2500}
---
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(response => response.json())
  .then(user => {
    console.log("Име:", user.name);
    console.log("Град:", user.address.city);
  })
  .catch(error => console.log("Нещо се обърка:", error.message));
```

Забележи двата `then`. Първият дава отговора (заглавия, статус), вторият — вече разчетеното тяло. `response.json()` също връща Promise, защото тялото пристига на части.

```callout
{"type":"danger","title":"fetch не гърми при 404"}
---
`fetch` отхвърля обещанието само при мрежов проблем. Ако сървърът отговори "404 Няма такава страница", това за `fetch` е успешен отговор. Проверявай сам:

`if (!response.ok) throw new Error("Сървърът върна " + response.status)`
```

```run
{"title":"Правилна проверка на отговора","waitMs":2500}
---
fetch("https://jsonplaceholder.typicode.com/users/99999")
  .then(response => {
    console.log("статус:", response.status, "ok:", response.ok);
    if (!response.ok) throw new Error("Сървърът върна " + response.status);
    return response.json();
  })
  .then(user => console.log(user.name))
  .catch(error => console.log("хванато:", error.message));
```

## Верига от заявки

Всеки `then` връща ново обещание, така че можеш да нижеш стъпки:

```run
{"title":"Едно след друго","waitMs":3000}
---
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(response => response.json())
  .then(user => fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`))
  .then(response => response.json())
  .then(posts => console.log("брой публикации:", posts.length))
  .catch(error => console.log("грешка:", error.message));
```

```quiz
{"id":"bridge-10-q1","question":"Какво ще изпише този код?\n\n```javascript\nconsole.log(\"A\");\nPromise.resolve().then(() => console.log(\"B\"));\nconsole.log(\"C\");\n```","options":["A, B, C","A, C, B","B, A, C","C, A, B"],"answer":1,"explanation":"Синхронният код върви докрай (A и C), а функцията в `then` изчаква реда си, дори когато обещанието е готово веднага."}
```

```quiz
{"id":"bridge-10-q2","question":"Сървърът връща 404. Какво прави `fetch`?","options":["Отива в `catch`","Изпълнява се успешно, а `response.ok` е false","Хвърля изключение и спира скрипта","Повтаря заявката автоматично"],"answer":1,"explanation":"За `fetch` дори 404 и 500 са получен отговор. В `catch` се влиза само при мрежова грешка — затова проверката на `response.ok` е задължителна."}
```

## Твой ред

```task
{"id":"bridge-10-task-1","title":"Направи собствено обещание","tests":[{"call":"delay(10).then(() => \"готово\")","expect":"готово","label":"delay връща обещание, което се изпълнява"},{"call":"typeof delay(1).then","expect":"function","label":"Върнатото е Promise"}],"hint":"Върни `new Promise(resolve => setTimeout(resolve, ms))`."}
---
// delay(ms) връща обещание, което се изпълнява след ms милисекунди.
function delay(ms) {

}
---
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
```

```task
{"id":"bridge-10-task-2","title":"Обработи успех и провал","tests":[{"call":"loadOrder(1).then(order => order.total)","expect":250,"label":"Намира поръчка 1"},{"call":"loadOrder(99).catch(error => error.message)","expect":"Поръчка 99 не съществува","label":"Отхвърля с ясно съобщение"}],"hint":"Използвай `resolve` при намерена поръчка и `reject(new Error(...))`, когато я няма. Съобщението трябва да съдържа номера."}
---
const ORDERS = [
  {id: 1, total: 250},
  {id: 2, total: 90}
];

// Върни обещание: изпълнено с поръчката или отхвърлено
// с Error("Поръчка <id> не съществува").
function loadOrder(id) {

}
---
const ORDERS = [
  {id: 1, total: 250},
  {id: 2, total: 90}
];

function loadOrder(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const order = ORDERS.find(item => item.id === id);
      if (order) resolve(order);
      else reject(new Error(`Поръчка ${id} не съществува`));
    }, 10);
  });
}
```

```takeaways
- Promise е обещание за стойност, която идва по-късно; кодът не спира да я чака.
- `then` хваща успеха, `catch` хваща грешката. Без `catch` грешките изчезват.
- `fetch` връща Promise и не гърми при 404 — проверявай `response.ok` сам.
- Всеки `then` връща ново обещание, затова стъпките се нижат.
