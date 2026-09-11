---
module: "Модул 3: React & NextJS"
section: "Големи приложения: reducer, context, маршрути"
sectionOrder: 4
title: "Защитени маршрути и подредба на проекта"
label: "react-5-07-protected"
---

Последният урок от секцията събира трите теми: context държи кой е влезлият потребител, router-ът решава къде може да отиде, а структурата на папките държи всичко това намираемо.

## Защитен маршрут

```sandbox
{"title":"Вход, изход и страница само за влезли","height":680,"dependencies":{"react-router-dom":"6.26.2"}}
---
import {createContext, useContext, useState} from "react";
import {BrowserRouter, Routes, Route, Navigate, Link, useNavigate, useLocation, Outlet} from "react-router-dom";

const AuthContext = createContext(null);

function AuthProvider({children}) {
  const [user, setUser] = useState(null);

  const value = {
    user,
    login: name => setUser({name}),
    logout: () => setUser(null)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth работи само вътре в AuthProvider");
  return context;
}

function RequireAuth() {
  const {user} = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" state={{from: location.pathname}} replace />;

  return <Outlet />;
}

function Layout() {
  const {user, logout} = useAuth();

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <nav style={{borderBottom: "1px solid #eee", paddingBottom: 8, marginBottom: 12}}>
        <Link to="/" style={{marginRight: 12}}>Начало</Link>
        <Link to="/dashboard" style={{marginRight: 12}}>Табло</Link>
        {user
          ? <span>{user.name} · <button onClick={logout}>изход</button></span>
          : <Link to="/login">вход</Link>}
      </nav>
      <Outlet />
    </div>
  );
}

function Login() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from ?? "/dashboard";

  return (
    <div>
      <h3 style={{marginTop: 0}}>Вход</h3>
      <button onClick={() => { login("Ива"); navigate(from, {replace: true}); }}>
        Влез като Ива
      </button>
      <p style={{fontSize: 13, color: "#666"}}>След вход отиваш на: {from}</p>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<p>Публична начална страница.</p>} />
            <Route path="/login" element={<Login />} />

            <Route element={<RequireAuth />}>
              <Route path="/dashboard" element={<p>Таблото е видимо само за влезли.</p>} />
              <Route path="/settings" element={<p>Настройки.</p>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

Натисни „Табло" без да си влязъл — отива те на входа. След вход се връщаш точно на таблото, защото пътят е запомнен в `location.state`.

```steps
{"title":"Как работи"}
---
`RequireAuth` е маршрут без собствен път: обвива останалите.
---
Няма ли потребител, връща `<Navigate to="/login" replace />` вместо съдържание.
---
`replace` маха защитената страница от историята — иначе „назад" я показва отново.
---
`state={{from}}` помни откъде идва, за да се върнеш там след вход.
```

```callout
{"type":"danger","title":"Това не е сигурност"}
---
Защитеният маршрут е удобство за потребителя, не защита на данни. Целият код стига до браузъра и всеки може да го заобиколи. Истинската проверка е на сървъра: ако заявката не носи валиден токен, сървърът отказва. Забравиш ли това, приложението ти е отворено.
```

## Подредба на проекта

Докато файловете са петнайсет, всяка подредба работи. От там нататък има две разумни стратегии.

**По вид** — добре за малки проекти:

```
src/
├── components/
├── hooks/
├── context/
├── pages/
└── utils/
```

**По функционалност** — по-добре, щом проектът порасне:

```
src/
├── features/
│   ├── auth/          LoginForm, useAuth, AuthContext
│   ├── courses/       CourseList, CourseCard, useCourses
│   └── cart/          Cart, cartReducer, CartContext
├── components/ui/     Button, Input, Modal - общи за всичко
├── lib/               api, формати, помощни
└── pages/             страниците, които router-ът ползва
```

```callout
{"type":"tip","title":"Защо по функционалност"}
---
Когато работиш по количката, всичко за количката е в една папка. При подредба по вид същата задача те разхожда през четири различни папки. А когато функционалността отпадне, триеш една папка вместо да ловиш файлове из целия проект.
```

```steps
{"title":"Няколко правила, които спестяват спорове"}
---
Един компонент на файл; името на файла съвпада с името на компонента.
---
Общите компоненти (`Button`, `Input`) не знаят нищо за функционалностите.
---
Hook-овете стоят до функционалността, която обслужват, а не в обща папка `hooks`.
---
Страниците са тънки: сглобяват компоненти и не съдържат логика.
```

```quiz
{"id":"react-5-07-q1","question":"Защитеният маршрут в React защитава ли данните ти?","options":["Да, напълно","Не — това е удобство за потребителя; данните се защитават на сървъра","Да, ако ползваш Context","Само ако е с replace"],"answer":1,"explanation":"Целият клиентски код е достъпен в браузъра. Сървърът е единственото място, където проверката има тежест."}
```

```quiz
{"id":"react-5-07-q2","question":"Защо при пренасочване към входа се ползва `replace`?","options":["За по-бързо зареждане","За да не остане защитената страница в историята и „назад“ да не я показва пак","Защото Navigate го изисква","За да се запази състоянието"],"answer":1,"explanation":"Без `replace` в историята остава запис за страница, до която потребителят няма достъп, и бутонът „назад“ го връща в цикъл."}
```

```takeaways
- Защитеният маршрут е обвиващ маршрут, който връща `Navigate` вместо съдържание.
- Помни откъде идва потребителят и го върни там след вход.
- Клиентската защита е удобство; истинската проверка е на сървъра.
- От определен размер нататък подреждай по функционалност, не по вид на файла.
