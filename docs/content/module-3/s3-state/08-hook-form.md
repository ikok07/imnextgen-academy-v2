---
module: "Модул 3: React & NextJS"
section: "State и събития"
sectionOrder: 2
title: "Форми на практика с react-hook-form"
label: "react-3-08-hook-form"
---

Контролираните полета от урок 4 работят и трябваше да минеш през тях. Но щом формата стане на осем полета с проверки, ръчният вариант омръзва — и има още един проблем, който още не си видял.

## Проблемът с ръчната форма

```sandbox
{"title":"Всяка буква пречертава цялата форма","height":620,"showConsole":true}
---
import {useState} from "react";

function Field({label, value, onChange}) {
  console.log("рисува се поле:", label);
  return (
    <div style={{marginBottom: 8}}>
      <label style={{display: "block", fontSize: 13}}>{label}</label>
      <input value={value} onChange={onChange} style={{padding: 8, width: "100%"}} />
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState({name: "", email: "", city: ""});

  return (
    <div style={{fontFamily: "system-ui", padding: 16, maxWidth: 300}}>
      <Field label="Име" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
      <Field label="Имейл" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
      <Field label="Град" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
      <p style={{fontSize: 13, color: "#666"}}>Пиши в едно поле и виж конзолата: рисуват се и трите.</p>
    </div>
  );
}
```

При три полета няма значение. При двайсет, с проверки на всяка буква, формата започва да заяква.

## Същото с react-hook-form

```
npm install react-hook-form
```

```sandbox
{"title":"Само полето, в което пишеш","height":700,"dependencies":{"react-hook-form":"7.53.0"},"showConsole":true}
---
import {useForm} from "react-hook-form";

export default function App() {
  const {register, handleSubmit, formState: {errors, isSubmitting}, reset} = useForm({
    defaultValues: {name: "", email: "", city: "sofia"}
  });

  async function onSubmit(data) {
    await new Promise(resolve => setTimeout(resolve, 600));
    console.log("изпратено:", data);
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{fontFamily: "system-ui", padding: 16, maxWidth: 320}}>
      <div style={{marginBottom: 10}}>
        <label style={{display: "block", fontSize: 13}}>Име</label>
        <input
          {...register("name", {required: "Името е задължително", minLength: {value: 2, message: "Поне 2 знака"}})}
          style={{padding: 8, width: "100%"}}
        />
        {errors.name && <span style={{color: "#dc2626", fontSize: 12}}>{errors.name.message}</span>}
      </div>

      <div style={{marginBottom: 10}}>
        <label style={{display: "block", fontSize: 13}}>Имейл</label>
        <input
          {...register("email", {
            required: "Имейлът е задължителен",
            pattern: {value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Невалиден имейл"}
          })}
          style={{padding: 8, width: "100%"}}
        />
        {errors.email && <span style={{color: "#dc2626", fontSize: 12}}>{errors.email.message}</span>}
      </div>

      <div style={{marginBottom: 12}}>
        <label style={{display: "block", fontSize: 13}}>Град</label>
        <select {...register("city")} style={{padding: 8, width: "100%"}}>
          <option value="sofia">София</option>
          <option value="plovdiv">Пловдив</option>
          <option value="varna">Варна</option>
        </select>
      </div>

      <button disabled={isSubmitting}>{isSubmitting ? "Изпращам..." : "Изпрати"}</button>
      <p style={{fontSize: 13, color: "#666"}}>Натисни празна форма и виж грешките. После попълни и изпрати.</p>
    </form>
  );
}
```

```steps
{"title":"Какво прави всяко нещо"}
---
**`register("name", правила)`** закача полето към формата и описва проверките му. Разпръснато в `<input>`, защото връща `name`, `onChange`, `onBlur` и `ref`.
---
**`handleSubmit(onSubmit)`** спира стандартното изпращане, проверява всичко и вика функцията ти само ако няма грешки — вече с готов обект с данните.
---
**`formState.errors`** носи съобщенията, които сам си описал в правилата.
---
**`isSubmitting`** заключва бутона по време на изпращането, без отделно състояние.
---
**`reset()`** изчиства формата след успех.
```

Библиотеката не пази стойностите в състояние — чете ги направо от полетата. Затова писането в едно поле не пречертава останалите.

```callout
{"type":"tip","title":"Не забравяй наученото"}
---
`react-hook-form` е удобство, не заместител на разбирането. Контролираното поле остава правилният избор, когато стойността трябва да се вижда другаде на екрана в реално време — например търсачка, която филтрира списък, докато пишеш.
```

## Проверка по схема

При по-сериозни форми правилата се описват отделно със `zod`, вместо да висят из полетата:

```javascript
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(2, "Поне 2 знака"),
  email: z.string().email("Невалиден имейл"),
  salaryMin: z.coerce.number().min(0)
});

const {register, handleSubmit, formState: {errors}} = useForm({
  resolver: zodResolver(schema)
});
```

Печалбата е, че същата схема пази и сървъра — в Server Action или в API адрес. Едно описание на правилата, проверено и от двете страни.

```callout
{"type":"danger","title":"Клиентската проверка не е защита"}
---
Каквото и да ползваш, проверката в браузъра е за удобство на потребителя. Сървърът проверява наново, винаги.
```

```quiz
{"id":"react-3-08-q1","question":"Защо react-hook-form не пречертава цялата форма при писане?","options":["Ползва memo на всяко поле","Чете стойностите направо от полетата, вместо да ги държи в състояние","Забавя обновяванията","Рисува на сървъра"],"answer":1,"explanation":"Полетата остават неконтролирани, а библиотеката се закача за тях с ref. Няма промяна на състояние, значи няма рисуване."}
```

```quiz
{"id":"react-3-08-q2","question":"Кога контролираното поле е по-подходящо?","options":["Винаги","Когато стойността трябва да се отразява другаде на екрана веднага","При повече от 10 полета","Когато има проверки"],"answer":1,"explanation":"Търсачка, която филтрира списък на всяка буква, има нужда стойността да е в състояние. За обикновена форма за изпращане това е излишна работа."}
```

```takeaways
- Ръчната контролирана форма пречертава всичко при всяка буква.
- `register` закача полето, `handleSubmit` проверява и подава готовите данни.
- `zod` изнася правилата в схема, която пази и сървъра.
- Проверката в браузъра е удобство; сървърът проверява наново.
