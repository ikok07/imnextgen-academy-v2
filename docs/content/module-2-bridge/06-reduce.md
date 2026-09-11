---
module: "Модул 2: JavaScript"
section: "Модерен JavaScript: мостът към React"
sectionId: "69179597-4a79-4f8a-bbaf-0f79c5c6213d"
sectionOrder: 8
title: "reduce: свиване до една стойност"
label: "js-bridge-06-reduce"
---

`reduce` има лоша слава — незаслужено. Изглежда сложен само защото приема два аргумента, а повечето хора виждат само първия.

Идеята: обхождаш масива и носиш със себе си една стойност, която се променя на всяка стъпка. Накрая връщаш нея.

## Най-простият случай

```run
{"title":"Сума"}
---
const prices = [12, 30, 8, 50];

const total = prices.reduce((sum, price) => sum + price, 0);

console.log(total);
```

Разчети го:

```steps
---
`0` накрая е **началната стойност**. Оттам тръгва `sum`.
---
`sum` е това, което носиш. На всяка стъпка функцията връща новата му стойност.
---
`price` е текущият елемент от масива.
---
Резултатът от последната стъпка е резултатът на целия `reduce`.
```

```run
{"title":"Виж всяка стъпка"}
---
const prices = [12, 30, 8];

const total = prices.reduce((sum, price) => {
  console.log(`носим ${sum}, добавяме ${price}`);
  return sum + price;
}, 0);

console.log("накрая:", total);
```

```callout
{"type":"danger","title":"Забравената начална стойност"}
---
Ако пропуснеш `0` накрая, `reduce` взема първия елемент за начална стойност. При сума от числа резултатът е същият, но при празен масив кодът гърми, а при обект като акумулатор получаваш пълна каша. Пиши началната стойност винаги.
```

## Не само числа

Акумулаторът може да е какъвто решиш — включително обект. Тук `reduce` става наистина силен:

```run
{"title":"Групиране по категория"}
---
const products = [
  {name: "Лаптоп", category: "техника"},
  {name: "Мишка", category: "техника"},
  {name: "Стол", category: "мебели"}
];

const byCategory = products.reduce((acc, product) => {
  if (!acc[product.category]) acc[product.category] = [];
  acc[product.category].push(product.name);
  return acc;
}, {});

console.log(byCategory);
```

Същият шаблон брои, сумира по ключ, прави речник по id — всичко, което в SQL би било `GROUP BY`.

```run
{"title":"Речник по id"}
---
const users = [
  {id: "u1", name: "Ива"},
  {id: "u2", name: "Георги"}
];

const byId = users.reduce((acc, user) => ({...acc, [user.id]: user}), {});

console.log(byId);
console.log(byId.u2.name);
```

## Кога да не го използваш

```callout
{"type":"tip","title":"Правилото на четимостта"}
---
Ако едно `reduce` ти отнема повече от 30 секунди, за да го прочетеш, напиши го с обикновен цикъл. `reduce` е за свиване до една стойност — не е състезание кой ще натъпче повече логика в един израз.
```

```quiz
{"id":"bridge-06-q1","question":"Какво връща `[1, 2, 3, 4].reduce((a, b) => a + b, 10)`?","options":["10","20","1234","Грешка"],"answer":1,"explanation":"Началната стойност е 10, към нея се добавят 1+2+3+4 = 10, което прави 20."}
```

```quiz
{"id":"bridge-06-q2","question":"Кой от трите метода може да върне обект вместо масив?","options":["Само map","Само filter","reduce","И трите връщат само масиви"],"answer":2,"explanation":"`map` и `filter` винаги връщат масив. `reduce` връща каквото сложиш за начална стойност — число, текст, обект, Map."}
```

## Твой ред

```task
{"id":"bridge-06-task-1","title":"Стойност на количката","tests":[{"call":"cartTotal([{price:10,qty:2},{price:5,qty:3}])","expect":35,"label":"Смята цена по количество"},{"call":"cartTotal([])","expect":0,"label":"Празна количка е 0"},{"call":"cartTotal([{price:19.99,qty:1}])","expect":19.99,"label":"Един артикул"}],"hint":"Началната стойност е 0, а на всяка стъпка добавяш price * qty."}
---
// Върни общата стойност на количката (цена по количество за всеки ред).
function cartTotal(items) {

}
---
function cartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}
```

```task
{"id":"bridge-06-task-2","title":"Преброй по град","tests":[{"call":"countByCity([{city:\"София\"},{city:\"Пловдив\"},{city:\"София\"}])","expect":{"София":2,"Пловдив":1},"label":"Брои правилно"},{"call":"countByCity([])","expect":{},"label":"Празен масив дава празен обект"}],"hint":"Акумулаторът е обект `{}`. За всеки елемент: ако градът още го няма, сложи 0, после увеличи с 1 и върни акумулатора."}
---
// Върни обект, в който ключът е град, а стойността - колко потребители има в него.
function countByCity(users) {

}
---
function countByCity(users) {
  return users.reduce((acc, user) => {
    acc[user.city] = (acc[user.city] ?? 0) + 1;
    return acc;
  }, {});
}
```

```takeaways
- `reduce(callback, начална стойност)` свива масив до една стойност.
- Винаги подавай начална стойност.
- Акумулаторът може да е число, текст, масив или обект — оттам идва силата му.
- Ако станеш нечетим, върни се на цикъл. Четимостта побеждава елегантността.
