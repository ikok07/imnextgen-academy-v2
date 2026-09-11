---
module: "Модул 2: JavaScript"
section: "Модерен JavaScript: мостът към React"
sectionId: "69179597-4a79-4f8a-bbaf-0f79c5c6213d"
sectionOrder: 8
title: "Модули и npm: как изглежда истински проект"
label: "js-bridge-09-modules"
---

Дотук целият ти код живееше в един файл, закачен с `<script>`. Никой реален проект не работи така. В React всеки компонент е отделен файл, който изнася нещо и внася нещо от други файлове.

## export и import

Файлът решава какво да покаже навън. Всичко останало си остава негово.

```sandbox
{"template":"vanilla","title":"Три файла, които си говорят","height":320}
---
// file: /index.js
import {formatPrice, VAT} from "./utils.js";
import calcTotal from "./cart.js";

const cart = [
  {name: "Лаптоп", price: 1200, qty: 1},
  {name: "Мишка", price: 30, qty: 2}
];

document.getElementById("app").innerHTML = `
  <h3>Количка</h3>
  <p>ДДС: ${VAT * 100}%</p>
  <p>Общо: ${formatPrice(calcTotal(cart))}</p>
`;
---
// file: /utils.js
export const VAT = 0.2;

export function formatPrice(value) {
  return `${value.toFixed(2)} лв.`;
}
---
// file: /cart.js
export default function calcTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}
---
// file: /index.html
<div id="app"></div>
```

Отвори трите файла в редактора горе и ги промени — резултатът вдясно се обновява веднага.

## Двата вида износ

```steps
{"title":"export и export default"}
---
**Именуван износ**: `export const VAT = 0.2`. Един файл може да има колкото искаш. Внася се с къдрави скоби: `import {VAT} from "./utils.js"` — и името трябва да съвпада.
---
**Износ по подразбиране**: `export default function calcTotal() {}`. Най-много един на файл. Внася се без скоби и можеш да го кръстиш както решиш: `import total from "./cart.js"`.
```

```callout
{"type":"tip","title":"Кое кога"}
---
В React ще срещаш `export default` за самия компонент (файлът е "за" него) и именуван износ за помощните неща около него. Не е закон, но е конвенцията, която всички следват.
```

## npm: чуждият код

`npm` е хранилището, от което взимаш готови пакети. Три команди вършат 95% от работата:

| Команда | Какво прави |
| --- | --- |
| `npm init -y` | създава `package.json` — картата на проекта |
| `npm install име-на-пакет` | сваля пакет и го записва като зависимост |
| `npm run dev` | пуска скрипт, описан в `package.json` |

Свалените пакети лежат в `node_modules` — папка, която **никога** не се качва в Git. В Git отиват само `package.json` и `package-lock.json`; от тях всеки може да възстанови точно същите зависимости с `npm install`.

```callout
{"type":"warn","title":"node_modules в .gitignore"}
---
Папката е стотици мегабайти и се възстановява с една команда. Ако я качиш в хранилището, всеки колега ще те помни с лошо. Провери, че я има в `.gitignore`, преди първия commit.
```

## Защо ти трябва инструмент за сглобяване

Браузърът не може да отвори `import` от `node_modules` сам, нито разбира JSX. Затова има инструменти като **Vite**, които сглобяват всичко и вдигат локален сървър с моментално обновяване.

```steps
{"title":"Нов React проект от нулата"}
---
`npm create vite@latest my-app -- --template react` — създава папката и файловете.
---
`cd my-app && npm install` — сваля зависимостите.
---
`npm run dev` — вдига сървъра на `localhost:5173`.
```

Това са трите реда, с които започва всеки React проект в следващия модул.

```quiz
{"id":"bridge-09-q1","question":"Как се внася `export default function calcTotal() {}` от файла `cart.js`?","options":["`import {calcTotal} from \"./cart.js\"`","`import calcTotal from \"./cart.js\"`","`import * as calcTotal from \"./cart.js\"`","`require(\"./cart.js\")`"],"answer":1,"explanation":"Износът по подразбиране се внася без къдрави скоби и може да се кръсти както решиш — името при внасянето няма нужда да съвпада."}
```

```quiz
{"id":"bridge-09-q2","question":"Кое НЕ влиза в Git хранилището?","options":["package.json","package-lock.json","node_modules","src"],"answer":2,"explanation":"`node_modules` се възстановява от `package.json` и `package-lock.json` с една команда `npm install`, затова стои в `.gitignore`."}
```

```takeaways
- Всеки файл е модул: изнася това, което другите ползват, и крие останалото.
- Именуван износ - с къдрави скоби и точното име; `export default` - най-много един на файл, с произволно име при внасяне.
- `package.json` описва проекта, `node_modules` не влиза в Git.
- Vite сглобява проекта и вдига локален сървър — с него започва React модулът.
