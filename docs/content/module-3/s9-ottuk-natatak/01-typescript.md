---
module: "Модул 3: React & NextJS"
section: "Оттук нататък"
sectionOrder: 8
title: "TypeScript: какво е и защо ще го срещнеш веднага"
label: "react-9-01-typescript"
---

Този модул е на чист JavaScript нарочно — два нови езика наведнъж е лош начин да се учи React. Но в първия ден на първата работа ще видиш TypeScript. Ето достатъчно, за да не се стреснеш.

## Какво прави

TypeScript е JavaScript с описание на типовете. Проверява се при писане, не при изпълнение.

```javascript
// JavaScript - грешката се появява при изпълнение, ако изобщо се появи
function getFullName(user) {
  return user.firstName + " " + user.lastName;
}

getFullName({name: "Ива"});   // "undefined undefined"
```

```typescript
// TypeScript - редакторът подчертава грешката, докато пишеш
type User = {
  firstName: string;
  lastName: string;
  age?: number;        // въпросителната значи "може да липсва"
};

function getFullName(user: User): string {
  return user.firstName + " " + user.lastName;
}

getFullName({name: "Ива"});   // грешка още в редактора
```

```callout
{"type":"info","title":"Изчезва при сглобяване"}
---
Типовете не съществуват в браузъра. При сглобяване се махат и остава обикновен JavaScript. Затова TypeScript не прави приложението нито по-бързо, нито по-бавно — помага на човека, който пише кода.
```

## Как изглежда в React

```typescript
type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  disabled?: boolean;
};

export default function Button({children, variant = "primary", onClick, disabled}: ButtonProps) {
  return <button onClick={onClick} disabled={disabled}>{children}</button>;
}
```

Най-полезното е в третия ред: `"primary" | "secondary"` значи, че друга стойност просто не се приема. Редакторът ти предлага двете при писане, а опечатка като `"primry"` се вижда веднага.

```typescript
// състояние
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<string[]>([]);

// данни от сървър
async function getJob(slug: string): Promise<Job | null> {
  const response = await fetch(`/api/jobs/${slug}`);
  if (!response.ok) return null;
  return response.json();
}
```

`User | null` казва нещо важно: стойността може да липсва. Оттам нататък TypeScript няма да ти позволи да напишеш `user.name`, без да си проверил — и цял клас грешки „cannot read property of null" изчезва.

## Защо си заслужава

```steps
---
**Редакторът знае какво има в обекта.** Допълва полетата и не бъркаш имена.
---
**Преименуването е безопасно.** Смениш ли поле, редакторът показва всички места, които се чупят.
---
**Типовете са документация**, която не остарява — защото кодът спира да се сглобява, ако тя е лъжа.
---
**Големите промени стават възможни.** В голям JavaScript проект никой не смее да пипне централен обект.
```

## Ако искаш да пробваш утре

```steps
---
Създай проект с `--typescript` и преименувай файловете на `.tsx`.
---
Опиши типовете само на props и на данните от сървъра. Останалото TypeScript го отгатва сам.
---
Ползвай `any` временно, когато нещо те бави, и се върни към него после.
---
Не гони перфектна типизация. 80% от ползата идва от 20% от работата.
```

```callout
{"type":"tip","title":"Учи го в проект, не от документация"}
---
TypeScript отделно е скучен и абстрактен. Взет върху вече работещ React проект, типовете се учат почти незабелязано за седмица.
```

```quiz
{"id":"react-9-01-q1","question":"Какво се случва с типовете при сглобяване?","options":["Превръщат се в проверки по време на изпълнение","Премахват се - в браузъра остава обикновен JavaScript","Стават документация","Забавят приложението"],"answer":1,"explanation":"TypeScript проверява при писане и сглобяване. В браузъра типове няма — затова данните от сървъра пак се проверяват на ръка."}
```

```quiz
{"id":"react-9-01-q2","question":"Какво значи `useState<User | null>(null)`?","options":["Състоянието е винаги User","Състоянието е User или липсва — и TypeScript ще иска проверка преди достъп до полетата","Състоянието е незадължително","Грешен синтаксис"],"answer":1,"explanation":"Вертикалната черта значи „едно от двете\". Оттам нататък редакторът настоява да провериш за null, преди да четеш полета."}
```

```takeaways
- TypeScript е JavaScript с типове, които изчезват при сглобяване.
- Най-полезни са типовете на props и на данните от сървъра.
- `A | null` те принуждава да провериш липсващата стойност — и маха цял клас грешки.
- Учи се върху съществуващ проект, не от документация.
