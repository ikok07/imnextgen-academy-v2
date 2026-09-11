---
module: "Модул 2: JavaScript"
section: "Модерен JavaScript: мостът към React"
sectionId: "69179597-4a79-4f8a-bbaf-0f79c5c6213d"
sectionOrder: 8
title: "map: от масив към масив"
label: "js-bridge-04-map"
---

Ако трябва да избереш един метод, който да научиш перфектно преди React, това е `map`. Всеки списък, който някога ще покажеш на екран — продукти, коментари, редове в таблица — минава през него.

## Какво прави

`map` взема масив, прекарва всеки елемент през функция и връща **нов масив със същата дължина**.

```run
{"title":"От цени в лева към цени в евро"}
---
const pricesBgn = [19.55, 39.10, 97.75];

const pricesEur = pricesBgn.map(price => price / 1.95583);

console.log(pricesEur);
console.log(pricesBgn);
```

Обърни внимание на втория ред от изхода: оригиналният масив е непокътнат. `map` никога не променя това, върху което работи — прави копие.

## Как изглежда без map

```run
{"title":"Същото с цикъл"}
---
const names = ["ива", "георги", "мария"];

const withLoop = [];
for (let i = 0; i < names.length; i++) {
  withLoop.push(names[i].toUpperCase());
}

const withMap = names.map(name => name.toUpperCase());

console.log(withLoop);
console.log(withMap);
```

Един и същи резултат. Разликата е, че при `map` не пишеш брояч, не пишеш `push`, не можеш да сбъркаш индекса и нямаш междинна променлива, която някой по-късно да промени по невнимание.

## Обекти вместо числа

Реалните данни не са числа, а обекти. Тук `map` става наистина полезен:

```run
{"title":"Извличане и преобразуване"}
---
const users = [
  {name: "Ива", age: 28, city: "Пловдив"},
  {name: "Георги", age: 35, city: "София"},
  {name: "Мария", age: 22, city: "Варна"}
];

const names = users.map(user => user.name);
console.log(names);

const labels = users.map(user => `${user.name} (${user.city})`);
console.log(labels);
```

```callout
{"type":"danger","title":"Клопката със скобите"}
---
Когато връщаш обект от стрелкова функция, обвий го в скоби: `user => ({...user, active: true})`. Без тях JavaScript чете `{` като начало на тяло на функция, а не като обект. В най-добрия случай получаваш масив от `undefined`, в най-лошия — синтактична грешка.
```

```run
{"title":"Виж разликата на живо"}
---
const users = [{name: "Ива"}, {name: "Георги"}];

const broken = users.map(user => {
  const copy = {...user, active: true};
});
console.log("тяло без return:", broken);

const correct = users.map(user => ({...user, active: true}));
console.log("обект в скоби:", correct);
```

Щом отвориш фигурни скоби след стрелката, пишеш тяло на функция — и трябва изрично `return`. Скобите около обекта казват "това е стойност, а не блок".

## Вторият аргумент: индексът

Функцията в `map` получава и индекса на елемента:

```run
{"title":"Номерирана класация"}
---
const top = ["React", "Vue", "Svelte"];

const ranked = top.map((name, index) => `${index + 1}. ${name}`);

console.log(ranked);
```

В React този индекс се среща често — макар че, когато стигнеш дотам, ще научиш защо да не го използваш за `key`.

```quiz
{"id":"bridge-04-q1","question":"Какво връща `[1, 2, 3].map(n => n * 2)`?","options":["[1, 2, 3] - оригиналът е променен на място","[2, 4, 6] - нов масив","6 - сумата на удвоените","undefined"],"answer":1,"explanation":"`map` винаги връща нов масив със същата дължина. Оригиналът остава непроменен."}
```

```quiz
{"id":"bridge-04-q2","question":"Кой запис е правилен, ако искаш масив от обекти?","options":["`items.map(item => {id: item.id})`","`items.map(item => ({id: item.id}))`","`items.map(item => [id: item.id])`","`items.map({id: item.id})`"],"answer":1,"explanation":"Скобите около обекта казват на JavaScript, че `{` започва обект, а не тяло на функция. Без тях резултатът е масив от `undefined`."}
```

## Твой ред

```task
{"id":"bridge-04-task-1","title":"Етикети за продукти","tests":[{"call":"toLabels([{name:\"Лаптоп\",price:1200}])","expect":["Лаптоп - 1200 лв."],"label":"Един продукт"},{"call":"toLabels([{name:\"Мишка\",price:30},{name:\"Клавиатура\",price:75}])","expect":["Мишка - 30 лв.","Клавиатура - 75 лв."],"label":"Два продукта"},{"call":"toLabels([])","expect":[],"label":"Празен масив връща празен масив"}],"hint":"Върни шаблонен литерал вътре в map: името, тире, цената и накрая лв."}
---
// Върни масив от текстове във вида: Лаптоп - 1200 лв.
function toLabels(products) {

}
---
function toLabels(products) {
  return products.map(product => `${product.name} - ${product.price} лв.`);
}
```

```task
{"id":"bridge-04-task-2","title":"Добави поле, без да чупиш оригинала","tests":[{"call":"withDiscount([{name:\"Стол\",price:200}], 0.5)","expect":[{"name":"Стол","price":200,"finalPrice":100}],"label":"Добавя finalPrice"},{"call":"(() => { const items = [{name:\"Стол\",price:200}]; withDiscount(items, 0.5); return typeof items[0].finalPrice; })()","expect":"undefined","label":"Оригиналът остава непроменен"}],"hint":"Разпръсни стария обект и добави новото поле: `({...product, finalPrice: ...})`. Не забравяй скобите."}
---
// Върни нов масив, в който всеки продукт има допълнително поле finalPrice
// (цената след намалението), без да променяш подадените обекти.
function withDiscount(products, discount) {

}
---
function withDiscount(products, discount) {
  return products.map(product => ({
    ...product,
    finalPrice: product.price - product.price * discount
  }));
}
```

```takeaways
- `map` връща нов масив със същата дължина; оригиналът не се пипа.
- Функцията получава `(element, index)`.
- Обект от стрелкова функция винаги в скоби: `item => ({...item})`.
- Всеки списък в React се ражда от `map`.
