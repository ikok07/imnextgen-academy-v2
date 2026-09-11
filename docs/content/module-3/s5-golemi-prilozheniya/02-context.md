---
module: "Модул 3: React & NextJS"
section: "Големи приложения: reducer, context, маршрути"
sectionOrder: 4
title: "Context: край на пробиването през нивата"
label: "react-5-02-context"
---

Данните вървят надолу през props. Това е добре, докато стойността не трябва да измине пет нива, през компоненти, които не се интересуват от нея.

```steps
{"title":"Пробиване през нивата (prop drilling)"}
---
`App` знае кой е влезлият потребител.
---
Подава го на `Layout`, който не го ползва.
---
`Layout` го подава на `Header`, който не го ползва.
---
`Header` го подава на `UserMenu`, който най-накрая го ползва.
---
Три компонента носят prop, който не им трябва. Утре, ако добавиш още едно поле, пипаш пак трите.
```

Context е пряк канал от върха до който и да е компонент под него.

## Трите стъпки

```sandbox
{"title":"Тема на приложението през Context","height":620}
---
import {createContext, useContext, useState} from "react";

// 1. Създаваме контекста
const ThemeContext = createContext(null);

// Помощен hook - така потребителите не пипат контекста директно
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme работи само вътре в ThemeProvider");
  return context;
}

// 2. Доставчик, който държи състоянието
function ThemeProvider({children}) {
  const [dark, setDark] = useState(false);
  const value = {dark, toggle: () => setDark(current => !current)};

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// 3. Потребители - на произволна дълбочина
function ThemeButton() {
  const {dark, toggle} = useTheme();
  return <button onClick={toggle}>Превключи на {dark ? "светла" : "тъмна"}</button>;
}

function Card() {
  const {dark} = useTheme();
  return (
    <div style={{
      background: dark ? "#1f2937" : "#f9fafb",
      color: dark ? "#f9fafb" : "#111827",
      padding: 16, borderRadius: 8, marginTop: 12
    }}>
      Картата чете темата, без никой да ѝ я подава.
    </div>
  );
}

function Header() {
  return <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
    <strong>Академия</strong>
    <ThemeButton />
  </div>;
}

function Layout() {
  return <div><Header /><Card /></div>;
}

export default function App() {
  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <ThemeProvider>
        <Layout />
      </ThemeProvider>
    </div>
  );
}
```

`Layout` и `Header` вече не носят нищо. Стойността пътува направо.

```steps
{"title":"Рецептата"}
---
`const XContext = createContext(null)` — създаваш канала.
---
Компонент-доставчик държи състоянието и го подава през `<XContext.Provider value={...}>`.
---
`useContext(XContext)` чете стойността навсякъде под доставчика.
---
Собствен hook `useX()` с проверка — за по-ясна грешка, когато някой го ползва извън доставчика.
```

## За какво е подходящ

```steps
---
**Темата** (светла/тъмна) — рядко се мени, нужна е навсякъде.
---
**Влезлият потребител** — същото.
---
**Езикът** на интерфейса.
---
**Количката** в магазин — достъпна от карта на продукт, от хедъра, от страницата на количката.
```

```callout
{"type":"danger","title":"Context не е заместител на props"}
---
Ако стойността минава едно-две нива, props са по-ясни: гледаш повикването и виждаш какво получава компонентът. Context крие връзките. Използвай го, когато алтернативата е да пробиваш през три и повече нива.
```

## Капанът с производителността

Всеки компонент, който чете контекста, се пречертава при промяна на стойността. Ако сложиш всичко в един контекст, смяната на темата ще пречертае и компонентите, които се интересуват само от количката.

```callout
{"type":"warn","title":"Нов обект при всяко рисуване"}
---
`value={{user, logout}}` създава нов обект на всяко рисуване на доставчика — значи всички потребители се пречертават всеки път. Решението е `useMemo` около стойността. Прави го, когато има реален проблем, не предварително.
```

Практиката е: **отделен контекст за всяка независима тема** — `ThemeContext`, `AuthContext`, `CartContext`, вместо един голям `AppContext`.

```quiz
{"id":"react-5-02-q1","question":"Кога Context е правилният избор?","options":["Винаги, вместо props","Когато стойност трябва да мине през три и повече нива до компонентите, които я ползват","Когато състоянието е голямо","Когато има много компоненти"],"answer":1,"explanation":"Context решава пробиването през нивата. На едно-две нива props са по-ясни, защото връзката се вижда в кода."}
```

```quiz
{"id":"react-5-02-q2","question":"Какво се случва при промяна на стойността в Provider?","options":["Нищо, докато не се извика useContext","Всички компоненти, които четат този контекст, се пречертават","Пречертава се цялото приложение","Само доставчикът се пречертава"],"answer":1,"explanation":"Затова отделните теми стоят в отделни контексти — иначе промяна в едното пречертава компонентите, които четат само другото."}
```

```takeaways
- Context премахва пробиването на props през нива, които не ги ползват.
- Рецепта: `createContext` → доставчик със състояние → `useContext` през собствен hook.
- Подходящ за тема, потребител, език, количка — неща, нужни навсякъде.
- Отделни контексти за отделни теми; един голям контекст пречертава всичко.
