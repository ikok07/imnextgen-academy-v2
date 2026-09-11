---
module: "Модул 3: React & NextJS"
section: "Next.js: App Router"
sectionOrder: 7
title: "Middleware: кодът преди страницата"
label: "react-7-11-middleware"
---

Middleware е функция, която се изпълнява **преди** заявката да стигне до страница или API адрес. Може да пренасочи, да върне отговор, да добави заглавие или да пусне заявката нататък.

Файлът е един и стои в корена на проекта, до `app/`.

```javascript
// middleware.js
import {NextResponse} from "next/server";

export function middleware(request) {
  const {pathname} = request.nextUrl;

  if (pathname === "/dashboard") {
    return NextResponse.redirect(new URL("/dashboard/overview", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"]
};
```

```steps
{"title":"Трите неща, които може да върне"}
---
**`NextResponse.next()`** — продължи нормално.
---
**`NextResponse.redirect(url)`** — прати потребителя другаде.
---
**`NextResponse.rewrite(url)`** — покажи друго съдържание, без адресът да се променя.
```

## matcher: къде да се изпълнява

Без `config.matcher` middleware-ът тича при **всяка** заявка — включително за изображения, шрифтове и вътрешните файлове на Next. Това е хабене.

```javascript
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg).*)"
  ]
};
```

Изразът значи „всичко освен изброеното". Ще срещаш точно този шаблон в почти всеки Next проект.

## Най-честата употреба: защита

```javascript
export async function middleware(request) {
  const token = request.cookies.get("session")?.value;
  const {pathname} = request.nextUrl;

  const isProtected = pathname.startsWith("/dashboard");
  const isAuthPage = pathname.startsWith("/login");

  if (isProtected && !token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
```

Непознат посетител не стига до защитената страница изобщо — сървърът дори не я рисува. А влезлият не вижда страницата за вход.

```callout
{"type":"danger","title":"Наличието на бисквитка не е проверка"}
---
Middleware-ът върви преди всичко и трябва да е бърз, затова там обикновено се проверява само дали **има** сесия, не дали е валидна. Истинската проверка — кой е потребителят и какво му е позволено — остава в страницата, в Server Action-а и в API адреса. Middleware-ът е портиер, не охрана.
```

## Други приложения

```steps
---
**Език по подразбиране** — пренасочване от `/` към `/bg` според заглавието `Accept-Language`.
---
**Пренасочвания при промяна на адреси** — старите линкове да не се чупят след преработка на сайта.
---
**Заглавия за сигурност** — CSP, `X-Frame-Options` и подобни, добавени на едно място.
---
**A/B тестове** — половината посетители получават друга версия чрез `rewrite`, без да го забележат.
---
**Кирилски адреси** — `rewrite` от красив адрес към вътрешния маршрут.
```

```javascript
export function middleware(request) {
  const response = NextResponse.next();

  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}
```

## Какво НЕ може

```callout
{"type":"warn","title":"Средата е ограничена"}
---
Middleware-ът върви в облекчена среда (Edge runtime) преди рисуването. Там няма достъп до базата през обикновен драйвер, няма Node модули като `fs`, няма тежки библиотеки. Дълга работа на това място забавя **всяка** заявка към сайта.

Държи се къс: чете бисквитка, сравнява адрес, пренасочва.
```

```quiz
{"id":"react-7-11-q1","question":"Кога се изпълнява middleware?","options":["След рисуването на страницата","Преди заявката да стигне до страницата или API адреса","Само при първо зареждане","При сглобяване на проекта"],"answer":1,"explanation":"Затова може да пренасочи, преди сървърът изобщо да е започнал да рисува страницата."}
```

```quiz
{"id":"react-7-11-q2","question":"Достатъчна ли е проверката в middleware за защита на данни?","options":["Да","Не — там се проверява само наличието на сесия; правата се проверяват в страницата и действията","Да, ако ползваш matcher","Зависи от доставчика"],"answer":1,"explanation":"Middleware-ът е портиер за навигацията. Server Actions и API адресите се викат директно и всеки проверява самоличност и права за себе си."}
```

```takeaways
- `middleware.js` в корена се изпълнява преди страниците и API адресите.
- Връща `next()`, `redirect()` или `rewrite()`.
- Без `matcher` тича при всяка заявка, включително за статични файлове.
- Дръж го къс: проверка на бисквитка и пренасочване, не работа с база.
- Портиер, не охрана — истинските проверки остават по-навътре.
