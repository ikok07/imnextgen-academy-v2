---
module: "Модул 3: React & NextJS"
section: "Качество: производителност, достъпност и тестове"
sectionOrder: 6
title: "Портали, модали и капанът на фокуса"
label: "react-q-06-portals"
---

Модалът изглежда като най-простия компонент на света и е един от най-сбърканите. Има три отделни проблема и всеки се решава поотделно.

## Проблем 1: родителят реже детето

Модал, нарисуван вътре в компонент с `overflow: hidden` или `transform`, се отрязва или застава под съседен елемент, колкото и да вдигаш `z-index`.

`createPortal` рисува съдържанието другаде в документа, но го оставя в React дървото — състояние, контекст и събития работят както преди.

```sandbox
{"title":"Портал изважда модала от рязането","height":640}
---
import {useState} from "react";
import {createPortal} from "react-dom";

function Modal({open, onClose, children}) {
  if (!open) return null;

  return createPortal(
    <div
      onClick={onClose}
      style={{position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", display: "grid", placeItems: "center", zIndex: 50}}
    >
      <div
        onClick={event => event.stopPropagation()}
        style={{background: "white", color: "#111", borderRadius: 10, padding: 20, width: 260}}
      >
        {children}
        <button onClick={onClose} style={{marginTop: 12}}>Затвори</button>
      </div>
    </div>,
    document.body
  );
}

export default function App() {
  const [openInside, setOpenInside] = useState(false);
  const [openPortal, setOpenPortal] = useState(false);

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <div style={{border: "1px dashed #bbb", borderRadius: 8, padding: 12, overflow: "hidden", height: 120}}>
        <p style={{marginTop: 0, fontSize: 13}}>Контейнер с overflow: hidden</p>

        <button onClick={() => setOpenInside(!openInside)}>Модал вътре в контейнера</button>
        {openInside && (
          <div style={{position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", display: "grid", placeItems: "center"}}>
            <div style={{background: "white", color: "#111", padding: 20, borderRadius: 10}}>
              Този се рисува вътре в контейнера.
              <div><button onClick={() => setOpenInside(false)} style={{marginTop: 10}}>Затвори</button></div>
            </div>
          </div>
        )}
      </div>

      <button onClick={() => setOpenPortal(true)} style={{marginTop: 12}}>Модал през портал</button>
      <Modal open={openPortal} onClose={() => setOpenPortal(false)}>
        <strong>През портал</strong>
        <p style={{margin: "6px 0 0", fontSize: 14}}>Рисува се в body, но живее в React дървото.</p>
      </Modal>
    </div>
  );
}
```

## Проблем 2: клавиатурата

Отворен модал, при който Tab продължава да обикаля страницата отзад, е счупен. Потребителят с клавиатура се изгубва напълно.

```steps
{"title":"Какво дължи един модал"}
---
**Фокусът влиза** в модала при отваряне — обикновено на първия елемент или на самия панел.
---
**Фокусът не излиза** от него, докато е отворен. Tab от последния елемент се връща на първия.
---
**Escape затваря.**
---
**Фокусът се връща** на бутона, който го е отворил, след затваряне.
---
**Страницата отдолу не скролира**, докато модалът е отворен.
```

```sandbox
{"title":"Модал с Escape и връщане на фокуса","height":660}
---
import {useState, useRef, useEffect} from "react";
import {createPortal} from "react-dom";

function Modal({open, onClose, title, children}) {
  const panelRef = useRef(null);
  const previouslyFocused = useRef(null);

  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement;
    panelRef.current?.focus();

    function onKeyDown(event) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      previouslyFocused.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div style={{position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", display: "grid", placeItems: "center", zIndex: 50}}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        style={{background: "white", color: "#111", borderRadius: 10, padding: 20, width: 280, outline: "none"}}
      >
        <h3 id="modal-title" style={{margin: "0 0 8px"}}>{title}</h3>
        {children}
        <button onClick={onClose} style={{marginTop: 12}}>Затвори</button>
      </div>
    </div>,
    document.body
  );
}

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <button onClick={() => setOpen(true)}>Отвори</button>
      <Modal open={open} onClose={() => setOpen(false)} title="Потвърждение">
        <p style={{margin: 0, fontSize: 14}}>Натисни Escape или бутона. Фокусът се връща на „Отвори“.</p>
      </Modal>
      <p style={{fontSize: 13, color: "#666", marginTop: 12}}>
        Отвори с Tab и Enter, затвори с Escape и виж къде отива фокусът.
      </p>
    </div>
  );
}
```

Остана едно: пълният капан за фокуса — Tab от последния елемент да се връща на първия. Пише се на ръка с около двайсет реда или се взима наготово.

## Проблем 3: не пиши това сам

```callout
{"type":"tip","title":"Достъпен модал е решен проблем"}
---
**Radix UI**, **React Aria** и **Headless UI** дават модали, падащи менюта, табове и тултипи с готова клавиатурна навигация и ARIA, но без наложен дизайн — стилизираш ги както решиш. `shadcn/ui` е точно Radix плюс Tailwind.

Знанието какво дължи един модал остава задължително. Писането му от нула за трети път — не.
```

```javascript
import * as Dialog from "@radix-ui/react-dialog";

<Dialog.Root>
  <Dialog.Trigger>Отвори</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="fixed inset-0 bg-black/50" />
    <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6">
      <Dialog.Title>Потвърждение</Dialog.Title>
      <Dialog.Close>Затвори</Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

Портал, капан за фокуса, Escape, връщане на фокуса, ARIA — всичко е вътре.

```quiz
{"id":"react-q-06-q1","question":"Какво прави `createPortal`?","options":["Рисува съдържанието другаде в документа, но го оставя в React дървото","Създава нов React корен","Зарежда компонента мързеливо","Премества състоянието в родителя"],"answer":0,"explanation":"Затова модалът не се реже от `overflow: hidden` на родителя, а контекстът и събитията продължават да работят както преди."}
```

```quiz
{"id":"react-q-06-q2","question":"Кое НЕ дължи един модал?","options":["Да се затваря с Escape","Да върне фокуса на бутона, който го е отворил","Да задържа фокуса вътре, докато е отворен","Да се зарежда мързеливо"],"answer":3,"explanation":"Мързеливото зареждане е оптимизация и е по избор. Останалите три са условие модалът изобщо да работи с клавиатура."}
```

```takeaways
- `createPortal` изнася съдържанието от рязащия родител, без да го вади от React дървото.
- Модалът дължи: фокус вътре, Escape, върнат фокус, заключен скрол и `role="dialog"`.
- Пълен капан за фокуса се пише трудно и се греши лесно.
- Radix, React Aria и Headless UI решават това; ти решаваш как изглежда.
