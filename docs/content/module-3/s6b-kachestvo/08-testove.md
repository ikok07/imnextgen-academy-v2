---
module: "Модул 3: React & NextJS"
section: "Качество: производителност, достъпност и тестове"
sectionOrder: 6
title: "Тестове с Vitest и Testing Library"
label: "react-q-08-testing"
---

Тестовете са нещото, което най-често липсва на junior кандидатите — и най-бързо се научава. Не е нужно да покриваш всичко. Нужно е да можеш да напишеш тест и да знаеш какво да тестваш.

## Настройка

```
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/setupTests.js"
  }
});
```

```javascript
// src/setupTests.js
import "@testing-library/jest-dom";
```

Плюс `"test": "vitest"` в `package.json`. Толкова.

## Първият тест

```javascript
// Counter.test.jsx
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

test("увеличава брояча при натискане", async () => {
  const user = userEvent.setup();
  render(<Counter />);

  expect(screen.getByText("0")).toBeInTheDocument();

  await user.click(screen.getByRole("button", {name: "+1"}));

  expect(screen.getByText("1")).toBeInTheDocument();
});
```

Прочети го като изречение: нарисувай компонента, намери бутона, натисни го, провери какво пише на екрана.

## Правилото, което променя всичко

```callout
{"type":"tip","title":"Тествай каквото вижда потребителят"}
---
Не тествай състояние, вътрешни функции или имена на класове. Тествай това, което човек би видял и направил. Тогава можеш да пренапишеш целия компонент отвътре и тестът пак да минава — а точно това е смисълът му.
```

Затова елементите се търсят така, както ги намира човек:

| Търсене | Кога |
| --- | --- |
| `getByRole("button", {name: "Изпрати"})` | почти винаги — така го вижда и екранният четец |
| `getByLabelText("Имейл")` | полета във форма |
| `getByText("Няма резултати")` | текст на екрана |
| `getByPlaceholderText(...)` | когато няма етикет |
| `getByTestId(...)` | последна възможност |

```callout
{"type":"info","title":"Достъпността се отплаща и тук"}
---
`getByRole` работи само ако елементите са семантични. Компонент с `<div onClick>` вместо `<button>` е труден за тестване по същата причина, по която е труден за ползване с клавиатура.
```

## Три вида проверка

```steps
---
`getBy...` — трябва да съществува сега, иначе тестът пада веднага.
---
`queryBy...` — може и да го няма; връща `null`. За проверка, че нещо **не** е на екрана.
---
`findBy...` — ще се появи след малко. Връща обещание, ползва се с `await` за асинхронни неща.
```

```javascript
expect(screen.queryByText("Грешка")).not.toBeInTheDocument();

expect(await screen.findByText("Ива Петрова")).toBeInTheDocument();
```

## Тест на форма

```javascript
test("показва грешка при празно име", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();

  render(<JobForm onSubmit={onSubmit} />);

  await user.click(screen.getByRole("button", {name: /публикувай/i}));

  expect(await screen.findByText(/заглавието трябва/i)).toBeInTheDocument();
  expect(onSubmit).not.toHaveBeenCalled();
});

test("изпраща при валидни данни", async () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();

  render(<JobForm onSubmit={onSubmit} />);

  await user.type(screen.getByLabelText("Заглавие"), "Frontend разработчик");
  await user.click(screen.getByRole("button", {name: /публикувай/i}));

  expect(onSubmit).toHaveBeenCalledTimes(1);
});
```

`vi.fn()` е фалшива функция, която помни дали и с какво е била извикана.

## Какво да тестваш

```steps
---
**Чистите функции** — филтри, форматиране, сметки. Най-евтините и най-полезни тестове; точно това писа в проекта „Банка“.
---
**Компоненти с логика** — формата с валидация, филтърът, брояча.
---
**Пътищата, в които се греши** — празно състояние, грешка, липсващи данни.
---
**Не тествай** прости компоненти без логика. Тест, че `<Badge>` показва текста си, не хваща никакъв бъг.
```

```callout
{"type":"warn","title":"Сто процента покритие не е цел"}
---
Проект с 40% покритие на правилните места е по-здрав от проект със 100% покритие на тривиални компоненти. Мери стойност, не процент.
```

```quiz
{"id":"react-q-08-q1","question":"Защо `getByRole` е предпочитаният начин за намиране на елемент?","options":["Най-бърз е","Намира елемента така, както го намира и потребителят с екранен четец","Работи с всякакви елементи","Не изисква настройка"],"answer":1,"explanation":"Тества се достъпният интерфейс. Като бонус, тест, който не намира ролята, обикновено сочи и реален проблем с достъпността."}
```

```quiz
{"id":"react-q-08-q2","question":"Кое се ползва за нещо, което ще се появи след заявка?","options":["`getByText`","`queryByText`","`await findByText`","`expect.toExist`"],"answer":2,"explanation":"`findBy` връща обещание и изчаква появата. `getBy` би паднал веднага, а `queryBy` би върнал null."}
```

```takeaways
- Vitest плюс Testing Library се настройват за десет минути.
- Тествай каквото потребителят вижда и прави, не вътрешното състояние.
- `getBy` за налично, `queryBy` за липсващо, `await findBy` за асинхронно.
- Най-ценни са тестовете на чиста логика и на пътищата с грешки.
