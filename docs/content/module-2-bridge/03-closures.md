---
module: "Модул 2: JavaScript"
section: "Модерен JavaScript: мостът към React"
sectionId: "69179597-4a79-4f8a-bbaf-0f79c5c6213d"
sectionOrder: 8
title: "Closures без мистика"
label: "js-bridge-03-closures"
---

Closure е думата, на която се спъват най-много хора — обикновено защото им я обясняват с термини вместо с примери. Затова започваме от примера.

```run
{"title":"Функция, която помни"}
---
function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const next = createCounter();

console.log(next());
console.log(next());
console.log(next());
```

Спри за секунда и виж какво стана. `createCounter` приключи още на първия ред. Локалната ѝ променлива `count` би трябвало да е изчезнала. А тя не само е жива — тя помни стойността си между извикванията.

**Това е closure: функция плюс средата, в която е родена.** Вътрешната функция носи със себе си достъп до променливите на функцията, която я е създала — дори след като външната отдавна е приключила.

## Всяка нова "фабрика" прави отделна памет

```run
{"title":"Два независими броя"}
---
function createCounter() {
  let count = 0;
  return function () {
    count++;
    return count;
  };
}

const a = createCounter();
const b = createCounter();

console.log("a:", a(), a(), a());
console.log("b:", b());
```

`a` и `b` не си пречат. Всяко извикване на `createCounter` създава ново `count`. Оттук идва и практическата полза: closure е начинът да имаш частно състояние, до което външният свят няма достъп.

```callout
{"type":"tip","title":"Защо това те засяга"}
---
`useState` в React е точно това. Компонентът се изпълнява отново и отново, но стойността ти оцелява между изпълненията, защото живее в closure, а не в самия компонент. Когато стигнеш до hooks, тази статия ще ти изглежда като спойлер.
```

## Частни данни

Класически пример: нещо, което може да се променя само по правилата, които ти си написал.

```run
{"title":"Банкова сметка със заключен баланс"}
---
function createAccount(owner, startBalance) {
  let balance = startBalance;

  return {
    deposit(amount) {
      if (amount <= 0) return "Сумата трябва да е положителна";
      balance += amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createAccount("Ива", 100);

console.log(account.deposit(50));
console.log(account.getBalance());
console.log(account.balance);
```

Последният ред извежда `undefined`. Няма `balance` върху обекта — има само две функции, които знаят за него. Отвън не можеш да го смениш на 1 000 000, колкото и да ти се иска.

## Класическата клопка с цикъл

```run
{"title":"var срещу let в цикъл"}
---
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log("var:", i), 10);
}

for (let j = 1; j <= 3; j++) {
  setTimeout(() => console.log("let:", j), 20);
}
```

С `var` и трите функции виждат **една и съща** променлива, която в момента на изпълнение вече е 4. С `let` всяка обиколка на цикъла получава собствена променлива — и собствено closure. Това е една от най-важните причини `var` да е изхвърлен от модерния код.

```quiz
{"id":"bridge-03-q1","question":"Какво ще върне `second()` тук?\n\n```javascript\nfunction make() {\n  let n = 10;\n  return () => ++n;\n}\nconst first = make();\nconst second = make();\nfirst();\nfirst();\nsecond();\n```","options":["13","11","12","undefined"],"answer":1,"explanation":"`first` и `second` са създадени от две различни извиквания на `make`, значи имат две различни `n`. Двете извиквания на `first` вдигат само неговото `n` до 12. `second()` вдига своето от 10 на 11."}
```

```quiz
{"id":"bridge-03-q2","question":"Какво е closure с една дума?","options":["Функция, която се извиква сама","Функция, която помни променливите от мястото, където е създадена","Функция без име","Функция, която връща друга функция"],"answer":1,"explanation":"Връщането на функция е само най-честият начин да се направи closure, не самото определение. Closure е връзката между функцията и средата, в която е родена."}
```

## Твой ред

```task
{"id":"bridge-03-task-1","title":"Направи ограничител","tests":[{"call":"typeof createLimiter","expect":"function","label":"createLimiter е функция"},{"call":"(() => { const f = createLimiter(2); return [f(), f(), f()]; })()","expect":[true,true,false],"label":"При лимит 2: true, true, false"},{"call":"(() => { const f = createLimiter(1); const g = createLimiter(1); return [f(), g()]; })()","expect":[true,true],"label":"Два ограничителя не си пречат"}],"hint":"Дръж брояча в променлива на външната функция. Вътрешната проверява дали броячът е стигнал лимита, преди да го увеличи."}
---
// createLimiter(limit) връща функция.
// Първите `limit` извиквания връщат true, следващите - false.
function createLimiter(limit) {

}
---
function createLimiter(limit) {
  let used = 0;

  return function () {
    if (used >= limit) return false;
    used++;
    return true;
  };
}
```

```task
{"id":"bridge-03-task-2","title":"Частна кошница","tests":[{"call":"(() => { const c = createCart(); c.add(\"хляб\"); c.add(\"мляко\"); return c.list(); })()","expect":["хляб","мляко"],"label":"Добавя и връща стоките"},{"call":"(() => { const c = createCart(); c.add(\"хляб\"); return c.count(); })()","expect":1,"label":"count() брои правилно"},{"call":"typeof createCart().items","expect":"undefined","label":"Няма публично поле items"}],"hint":"Върни обект с три метода. Масивът със стоките остава в closure — не го слагай като поле на обекта. Върни обект точно с `add`, `list` и `count` — нищо повече."}
---
// createCart() връща обект с методи add(item), list() и count().
// Масивът със стоките не трябва да е достъпен отвън.
function createCart() {

}
---
function createCart() {
  const items = [];

  return {
    add(item) {
      items.push(item);
      return items.length;
    },
    list() {
      return [...items];
    },
    count() {
      return items.length;
    }
  };
}
```

```takeaways
- Closure = функция + средата, в която е създадена. Тя помни, дори когато външната функция отдавна е приключила.
- Всяко извикване на "фабриката" създава отделна памет.
- Closure дава частно състояние: достъпно само през функциите, които ти си позволил.
- `let` в цикъл прави ново обвързване на всяка обиколка, `var` не прави.
