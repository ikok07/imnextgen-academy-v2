---
module: "Модул 3: React & NextJS"
section: "Големи приложения: reducer, context, маршрути"
sectionOrder: 4
title: "Context и reducer заедно"
label: "react-5-03-context-reducer"
---

`useReducer` държи правилата на едно място. Context доставя състоянието навсякъде. Заедно дават малък, разбираем магазин за състояние — без външна библиотека.

## Количка, достъпна отвсякъде

```sandbox
{"title":"Пълна количка с reducer в context","height":700}
---
import {createContext, useContext, useReducer} from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "added": {
      const existing = state.items.find(item => item.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.product.id ? {...item, qty: item.qty + 1} : item
          )
        };
      }
      return {...state, items: [...state.items, {...action.product, qty: 1}]};
    }

    case "removed":
      return {...state, items: state.items.filter(item => item.id !== action.id)};

    case "qtyChanged":
      return {
        ...state,
        items: state.items
          .map(item => item.id === action.id ? {...item, qty: item.qty + action.delta} : item)
          .filter(item => item.qty > 0)
      };

    case "cleared":
      return {...state, items: []};

    default:
      throw new Error("Непознато действие: " + action.type);
  }
}

function CartProvider({children}) {
  const [state, dispatch] = useReducer(cartReducer, {items: []});
  return <CartContext.Provider value={{state, dispatch}}>{children}</CartContext.Provider>;
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart работи само вътре в CartProvider");

  const {state, dispatch} = context;
  const total = state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = state.items.reduce((sum, item) => sum + item.qty, 0);

  return {
    items: state.items,
    total,
    count,
    add: product => dispatch({type: "added", product}),
    remove: id => dispatch({type: "removed", id}),
    changeQty: (id, delta) => dispatch({type: "qtyChanged", id, delta}),
    clear: () => dispatch({type: "cleared"})
  };
}

const PRODUCTS = [
  {id: 1, name: "Лаптоп", price: 1200},
  {id: 2, name: "Мишка", price: 30},
  {id: 3, name: "Клавиатура", price: 75}
];

function Header() {
  const {count, total} = useCart();
  return (
    <div style={{display: "flex", justifyContent: "space-between", borderBottom: "1px solid #eee", paddingBottom: 8}}>
      <strong>Магазин</strong>
      <span>Кошница: {count} бр. · {total} лв.</span>
    </div>
  );
}

function ProductList() {
  const {add} = useCart();
  return (
    <div style={{display: "flex", gap: 8, margin: "12px 0", flexWrap: "wrap"}}>
      {PRODUCTS.map(product => (
        <div key={product.id} style={{border: "1px solid #ddd", borderRadius: 8, padding: 10, width: 140}}>
          <p style={{margin: "0 0 4px", fontWeight: 600}}>{product.name}</p>
          <p style={{margin: "0 0 8px", color: "#666"}}>{product.price} лв.</p>
          <button onClick={() => add(product)}>Добави</button>
        </div>
      ))}
    </div>
  );
}

function Cart() {
  const {items, total, remove, changeQty, clear} = useCart();

  if (items.length === 0) return <p style={{color: "#999"}}>Кошницата е празна.</p>;

  return (
    <div>
      {items.map(item => (
        <div key={item.id} style={{display: "flex", alignItems: "center", gap: 8, padding: "4px 0"}}>
          <span style={{flex: 1}}>{item.name}</span>
          <button onClick={() => changeQty(item.id, -1)}>−</button>
          <span>{item.qty}</span>
          <button onClick={() => changeQty(item.id, 1)}>+</button>
          <span style={{width: 70, textAlign: "right"}}>{item.price * item.qty} лв.</span>
          <button onClick={() => remove(item.id)}>×</button>
        </div>
      ))}
      <p style={{fontWeight: 700}}>Общо: {total} лв.</p>
      <button onClick={clear}>Изпразни</button>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <div style={{fontFamily: "system-ui", padding: 16}}>
        <Header />
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
}
```

## Какво прави тази структура добра

```steps
---
**Компонентите не знаят за reducer-а.** Викат `add(product)` и `remove(id)` — четими имена вместо обекти с действия.
---
**Изчислените стойности са в hook-а.** `total` и `count` се смятат на едно място, не във всеки компонент.
---
**Правилата са в reducer-а.** „Ако продуктът вече е в количката, увеличи количеството" се пише веднъж.
---
**Количество нула маха реда.** Правилото живее в reducer-а, не в бутона.
```

```callout
{"type":"tip","title":"Издай навън функции, не dispatch"}
---
Ако hook-ът връща `dispatch`, всеки компонент трябва да знае имената и формата на действията. Върнеш ли `add`, `remove`, `clear`, компонентите виждат чист интерфейс, а ти можеш да смениш вътрешностите, без да ги пипаш.
```

## Кога това не стига

```steps
---
Състоянието идва от сървър и трябва кеш, повторно зареждане и обновяване във фонов режим → **React Query** (следващата секция).
---
Много компоненти четат различни части от голямо състояние и рисуванията стават проблем → **Zustand** или **Redux Toolkit**.
---
Всичко останало → това, което току-що написа, е напълно достатъчно.
```

```quiz
{"id":"react-5-03-q1","question":"Защо hook-ът връща `add` и `remove`, вместо направо `dispatch`?","options":["Защото dispatch не работи в context","За да не се налага компонентите да знаят формата на действията","За по-добра производителност","Защото React го препоръчва"],"answer":1,"explanation":"Компонентите получават четим интерфейс, а вътрешната реализация може да се смени, без да се пипа нито един компонент."}
```

```quiz
{"id":"react-5-03-q2","question":"Къде е правилното място за правилото „количество 0 маха реда“?","options":["В бутона минус","В reducer-а","В компонента Cart","В useEffect"],"answer":1,"explanation":"Правилата за промяна на състоянието живеят в reducer-а. Иначе същото правило трябва да се повтори на всяко място, което мени количеството."}
```

```takeaways
- Reducer + Context = малък магазин за състояние без библиотека.
- Hook-ът излага функции с ясни имена, не `dispatch`.
- Изчислените стойности се смятат в hook-а, не във всеки компонент.
- Правилата стоят в reducer-а — на едно място.
