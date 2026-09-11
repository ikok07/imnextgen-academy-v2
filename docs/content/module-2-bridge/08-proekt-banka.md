---
module: "Модул 2: JavaScript"
section: "Модерен JavaScript: мостът към React"
sectionId: "69179597-4a79-4f8a-bbaf-0f79c5c6213d"
sectionOrder: 8
title: "Проект \"Банка\": всичко научено на едно място"
label: "js-bridge-08-bank-project"
---

Време е за първата задача, която прилича на реална работа. Ще напишеш логиката на банково приложение — същата, която после стои зад екрана в React.

Работим с тези данни:

```javascript
const accounts = [
  {
    owner: "Ива Петрова Георгиева",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111
  },
  {
    owner: "Георги Стоянов Динев",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222
  }
];
```

Положителните числа са преводи навътре, отрицателните — навън. Всяка стъпка по-долу е отделно парче от логиката и се проверява автоматично. Накрая сглобяваш всичко в един отчет и го предаваш за преглед.

## Стъпка 1: потребителски имена

```task
{"id":"bridge-08-task-1","title":"Стъпка 1: инициали от името","tests":[{"call":"createUsername(\"Ива Петрова Георгиева\")","expect":"ипг","label":"Три имена дават три букви"},{"call":"createUsername(\"Георги Стоянов Динев\")","expect":"гсд","label":"Второ име"},{"call":"createUsername(\"Мария Илиева\")","expect":"ми","label":"Две имена"}],"hint":"Разбий текста на думи, вземи първата буква на всяка и ги залепи. Не забравяй малки букви."}
---
// От "Ива Петрова Георгиева" прави "ипг"
function createUsername(owner) {

}
---
function createUsername(owner) {
  return owner
    .toLowerCase()
    .split(" ")
    .map(word => word[0])
    .join("");
}
```

## Стъпка 2: баланс

```task
{"id":"bridge-08-task-2","title":"Стъпка 2: текущ баланс","tests":[{"call":"calcBalance([200, -100, 50])","expect":150,"label":"Смята с положителни и отрицателни"},{"call":"calcBalance([])","expect":0,"label":"Празна сметка е 0"},{"call":"calcBalance([5000, 3400, -150, -790, -3210, -1000, 8500, -30])","expect":11720,"label":"Сметката на Георги"}],"hint":"Едно reduce с начална стойност 0."}
---
// Върни сумата на всички движения.
function calcBalance(movements) {

}
---
function calcBalance(movements) {
  return movements.reduce((sum, movement) => sum + movement, 0);
}
```

## Стъпка 3: обобщение

```task
{"id":"bridge-08-task-3","title":"Стъпка 3: приходи, разходи и лихва","tests":[{"call":"calcSummary([200, -100, 50], 1)","expect":{"in":250,"out":100,"interest":2.5},"label":"Основен случай"},{"call":"calcSummary([100, -20], 2).interest","expect":2,"label":"Лихвата се смята от приходите"},{"call":"calcSummary([], 1)","expect":{"in":0,"out":0,"interest":0},"label":"Празни движения"}],"hint":"`in` е сумата на положителните, `out` е сумата на отрицателните, взета като положително число. Лихвата е приходите по процента, делено на 100."}
---
// Върни обект {in, out, interest}:
// in - сумата на входящите, out - сумата на изходящите (положително число),
// interest - лихва върху входящите по подадения процент (rate).
function calcSummary(movements, rate) {

}
---
function calcSummary(movements, rate) {
  const income = movements
    .filter(movement => movement > 0)
    .reduce((sum, movement) => sum + movement, 0);

  const outcome = movements
    .filter(movement => movement < 0)
    .reduce((sum, movement) => sum + Math.abs(movement), 0);

  return {
    in: income,
    out: outcome,
    interest: (income * rate) / 100
  };
}
```

## Стъпка 4: подреждане без мутация

```task
{"id":"bridge-08-task-4","title":"Стъпка 4: подреди движенията","tests":[{"call":"sortMovements([200, -400, 70])","expect":[-400,70,200],"label":"Подрежда възходящо"},{"call":"sortMovements([200, -400, 70], true)","expect":[200,70,-400],"label":"Подрежда низходящо"},{"call":"(() => { const m = [3, 1, 2]; sortMovements(m); return m; })()","expect":[3,1,2],"label":"Оригиналът не се променя"}],"hint":"Копие с разпръскване, после sort със сравнение. При низходящо размени двата операнда."}
---
// Върни НОВ подреден масив. При descending = true - от голямо към малко.
function sortMovements(movements, descending = false) {

}
---
function sortMovements(movements, descending = false) {
  return [...movements].sort((a, b) => descending ? b - a : a - b);
}
```

## Стъпка 5: намиране на сметка

```task
{"id":"bridge-08-task-5","title":"Стъпка 5: вход в сметката","tests":[{"call":"login([{username:\"ипг\",pin:1111,owner:\"Ива\"}], \"ипг\", 1111).owner","expect":"Ива","label":"Правилни данни"},{"call":"login([{username:\"ипг\",pin:1111}], \"ипг\", 9999)","expect":null,"label":"Грешен пин"},{"call":"login([{username:\"ипг\",pin:1111}], \"няма\", 1111)","expect":null,"label":"Несъществуващо име"}],"hint":"`find` по потребителско име, после провери пина. При неуспех върни null, не undefined."}
---
// Върни сметката при съвпадение на username и pin, иначе null.
function login(accounts, username, pin) {

}
---
function login(accounts, username, pin) {
  const account = accounts.find(item => item.username === username);
  return account && account.pin === pin ? account : null;
}
```

```callout
{"type":"tip","title":"Дотук направи цялото ядро"}
---
Петте функции горе са реалната логика на банково приложение. Останалото е екран. Когато стигнеш до React, ще вземеш точно тези функции и ще ги вържеш за бутони — нито ред от тях няма да се промени.
```

## Задачата за преглед

Сглоби всичко в една функция `bankReport(account)`, която връща готов отчет.

```submit
{"id":"bridge-08-final","title":"Проект \"Банка\": пълен отчет","requirements":["`bankReport(account)` връща обект с полета: `username`, `balance`, `summary` (със `in`, `out`, `interest`), `sorted` (движенията от голямо към малко) и `biggest` (най-голямото постъпление).","Използвай `map`, `filter`, `reduce` и `sort` — поне по веднъж.","Нито една от функциите да не променя подадения обект или масив.","Ако сметката няма движения, отчетът да не гърми: баланс 0, `biggest` да е `null`.","Добави кратък коментар над всяка функция — какво прави и какво връща."],"askForLink":true,"linkLabel":"Линк към GitHub (по желание)"}
---
const accounts = [
  {
    owner: "Ива Петрова Георгиева",
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2,
    pin: 1111
  },
  {
    owner: "Георги Стоянов Динев",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222
  }
];

// Тук сглоби решението си.
function bankReport(account) {

}

console.log(bankReport(accounts[0]));
```

```callout
{"type":"info","title":"Как се оценява"}
---
Ментор преглежда решението и го приема или го връща с бележки. Гледаме три неща: работи ли, използвани ли са методите вместо цикли, и променя ли се входът. Ако задачата се върне, поправяш и предаваш пак — колкото пъти е нужно.
```

```takeaways
- Логиката на приложението се пише отделно от екрана. Така се пренася без промяна в React.
- `map` за преобразуване, `filter` за избиране, `reduce` за свиване, копие преди `sort`.
- Функция, която не променя входа си, се тества лесно и не изненадва никого.
