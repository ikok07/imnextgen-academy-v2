---
module: "Модул 2: JavaScript"
section: "Модерен JavaScript: мостът към React"
sectionId: "69179597-4a79-4f8a-bbaf-0f79c5c6213d"
sectionOrder: 8
title: "bind и изгубеното this"
label: "js-bridge-02-bind"
---

В предишната секция видя `call` и `apply` — двата начина да извикаш функция, като сам ѝ подадеш `this`. Остана третият, най-полезният: `bind`.

Разликата е една дума: `call` и `apply` **извикват** функцията веднага. `bind` не я извиква — **връща нова функция**, на която `this` е залепен завинаги.

## Проблемът, който bind решава

Погледни този код и се опитай да отгатнеш какво ще се случи, преди да го изпълниш.

```run
{"title":"Изгубеният this"}
---
const store = {
  name: "Магазин Ромфея",
  greet: function () {
    console.log("Здравей от " + this.name);
  }
};

store.greet();

const greetAlone = store.greet;
greetAlone();
```

Първото извикване работи. Второто изписва `undefined` (или гърми).

Защо? Защото `this` в JavaScript **не се определя от това къде е написана функцията, а от това как е извикана**. При `store.greet()` вляво от точката стои `store`, значи `this` е `store`. При `greetAlone()` няма нищо вляво от скобите — няма и `this`.

```callout
{"type":"danger","title":"Най-честата клопка"}
---
Това не е екзотичен случай. Точно така губиш `this` всеки път, когато подадеш метод като callback: `setTimeout(store.greet, 1000)`, `button.addEventListener("click", store.greet)`. Подаваш функцията, но оставяш обекта зад себе си.
```

## Решението: bind

```run
{"title":"bind залепя this"}
---
const store = {
  name: "Магазин Ромфея",
  greet: function () {
    console.log("Здравей от " + this.name);
  }
};

const boundGreet = store.greet.bind(store);

boundGreet();
setTimeout(boundGreet, 100);
```

`bind` връща **нова функция**. Оригиналната остава непокътната. Новата функция помни `this` завинаги — дори ако я подадеш през пет други функции.

## bind може да залепи и аргументи

Второто приложение на `bind` се среща по-рядко в учебниците, но по-често в реален код: предварително подадени аргументи.

```run
{"title":"Частично прилагане"}
---
function addVat(rate, price) {
  return price + price * rate;
}

const withBgVat = addVat.bind(null, 0.20);

console.log(withBgVat(100));
console.log(withBgVat(250));
```

`null` е за `this` (функцията не го ползва), а `0.20` се залепя като първи аргумент. Получаваш нова, по-специализирана функция.

## Стрелковите функции нямат собствен this

Ето защо тази тема опира до React. Стрелковата функция **не създава собствен `this`** — тя взема този на мястото, където е написана.

```run
{"title":"Обикновена функция срещу стрелкова"}
---
const timer = {
  label: "Таймер",
  startBroken: function () {
    setTimeout(function () {
      console.log("счупено:", this.label);
    }, 10);
  },
  startWorking: function () {
    setTimeout(() => {
      console.log("работи:", this.label);
    }, 10);
  }
};

timer.startBroken();
timer.startWorking();
```

Заради това в модерен код почти не пишеш `bind`: пишеш стрелкова функция и проблемът не се появява. Но трябва да разпознаваш `bind`, защото ще го срещнеш във всеки по-стар React проект и в много библиотеки.

```quiz
{"id":"bridge-02-q1","question":"Каква е разликата между `fn.call(obj)` и `fn.bind(obj)`?","options":["Няма разлика, `bind` е по-новият синтаксис","`call` извиква функцията веднага, `bind` връща нова функция за по-късно","`bind` работи само с обекти, `call` работи и с масиви","`call` променя оригиналната функция, `bind` не я променя"],"answer":1,"explanation":"`call` изпълнява функцията на място и връща резултата ѝ. `bind` не изпълнява нищо — връща нова функция със залепен `this`, която извикваш когато решиш."}
```

```quiz
{"id":"bridge-02-q2","question":"Какво ще изпише този код?\n\n```javascript\nconst user = {\n  name: \"Ива\",\n  hi: () => console.log(this.name)\n};\nuser.hi();\n```","options":["Ива","undefined или празно","Грешка: this не е дефиниран","Функцията не се изпълнява"],"answer":1,"explanation":"Стрелковата функция няма собствен `this`, а взема този на обкръжаващия код — а там `this` не е обектът `user`. Затова методи на обекти НЕ се пишат със стрелкови функции."}
```

## Твой ред

```task
{"id":"bridge-02-task-1","title":"Залепи контекста","tests":[{"call":"typeof describeAlone","expect":"function","label":"describeAlone е функция"},{"call":"describeAlone()","expect":"Лаптоп струва 1200 лв.","label":"describeAlone() връща правилния текст"},{"call":"product.describe()","expect":"Лаптоп струва 1200 лв.","label":"Оригиналният метод още работи"}],"hint":"Използвай `product.describe.bind(product)`. Внимавай: методът трябва да **връща** текста с `return`, не да го логва."}
---
const product = {
  name: "Лаптоп",
  price: 1200,
  describe: function () {
    // Върни текст във вида: Лаптоп струва 1200 лв.
  }
};

// Създай функция describeAlone, която работи и извън обекта
const describeAlone = null;
---
const product = {
  name: "Лаптоп",
  price: 1200,
  describe: function () {
    return `${this.name} струва ${this.price} лв.`;
  }
};

const describeAlone = product.describe.bind(product);
```

```task
{"id":"bridge-02-task-2","title":"Направи специализирана функция","tests":[{"call":"applyDiscount(0.5, 100)","expect":50,"label":"applyDiscount работи правилно"},{"call":"halfPrice(100)","expect":50,"label":"halfPrice(100) е 50"},{"call":"halfPrice(31)","expect":15.5,"label":"halfPrice(31) е 15.5"}],"hint":"`applyDiscount.bind(null, 0.5)` залепя първия аргумент. `null` е за `this`, който тук не ни трябва."}
---
function applyDiscount(discount, price) {
  // Върни цената след намалението.
  // Например: discount 0.5 и price 100 дава 50
}

// Създай halfPrice - функция с едно число, която маха 50%
const halfPrice = null;
---
function applyDiscount(discount, price) {
  return price - price * discount;
}

const halfPrice = applyDiscount.bind(null, 0.5);
```

```takeaways
- `this` зависи от **как** е извикана функцията, не от къде е написана.
- `call` и `apply` извикват веднага; `bind` връща нова функция със залепен `this`.
- `bind` може да залепи и аргументи — така правиш специализирани функции от общи.
- Стрелковите функции нямат собствен `this` — затова вършат работа като callback, но не стават за методи на обект.
