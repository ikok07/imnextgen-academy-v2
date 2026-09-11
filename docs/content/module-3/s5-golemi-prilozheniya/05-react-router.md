---
module: "Модул 3: React & NextJS"
section: "Големи приложения: reducer, context, маршрути"
sectionOrder: 4
title: "React Router: страници в едностранично приложение"
label: "react-5-05-router"
---

React приложението е една HTML страница. Но потребителят очаква адреси, бутон „назад" и линкове, които може да сподели. React Router прави това възможно, без страницата да се презарежда.

```sandbox
{"title":"Три страници без презареждане","height":560,"dependencies":{"react-router-dom":"6.26.2"}}
---
import {BrowserRouter, Routes, Route, Link, NavLink} from "react-router-dom";

function Home() {
  return <div><h3>Начало</h3><p>Виж адреса горе в прегледа — сменя се без презареждане.</p></div>;
}

function Courses() {
  return <div><h3>Курсове</h3><p>HTML + CSS, JavaScript, React.</p></div>;
}

function About() {
  return <div><h3>За нас</h3><p>Академия за уеб разработка.</p></div>;
}

function NotFound() {
  return <div><h3>404</h3><p>Такава страница няма. <Link to="/">Към началото</Link></p></div>;
}

export default function App() {
  const linkStyle = ({isActive}) => ({
    marginRight: 12,
    color: isActive ? "#5C45FD" : "#444",
    fontWeight: isActive ? 700 : 400,
    textDecoration: "none"
  });

  return (
    <BrowserRouter>
      <div style={{fontFamily: "system-ui", padding: 16}}>
        <nav style={{borderBottom: "1px solid #eee", paddingBottom: 10, marginBottom: 12}}>
          <NavLink to="/" style={linkStyle} end>Начало</NavLink>
          <NavLink to="/courses" style={linkStyle}>Курсове</NavLink>
          <NavLink to="/about" style={linkStyle}>За нас</NavLink>
          <NavLink to="/няма-такава" style={linkStyle}>Счупен линк</NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
```

```steps
{"title":"Частите"}
---
**`BrowserRouter`** обвива приложението и следи адреса.
---
**`Routes` и `Route`** казват кой компонент отговаря на кой път. `path="*"` хваща всичко останало — страницата 404.
---
**`Link`** заменя `<a>`. Обикновената връзка презарежда страницата и изхвърля цялото състояние.
---
**`NavLink`** е `Link`, който знае дали е активен — за подчертаване в менюто. `end` спира съвпадението по префикс, иначе „/" свети винаги.
```

```callout
{"type":"danger","title":"`<a href>` вътре в приложението"}
---
Обикновената връзка кара браузъра да поиска страницата отново от сървъра. Приложението се вдига от нула, състоянието изчезва и потребителят вижда празен екран за момент. Вътре в приложението — само `Link`.
```

## Вложени маршрути и общ изглед

Менюто и подвалът се повтарят на всяка страница. Вместо да ги копираш, слагаш ги в общ изглед и оставяш дупка, в която влиза текущата страница.

```sandbox
{"title":"Layout с Outlet","height":600,"dependencies":{"react-router-dom":"6.26.2"}}
---
import {BrowserRouter, Routes, Route, NavLink, Outlet} from "react-router-dom";

function Layout() {
  const linkStyle = ({isActive}) => ({
    marginRight: 12,
    color: isActive ? "#5C45FD" : "#444",
    fontWeight: isActive ? 700 : 400,
    textDecoration: "none"
  });

  return (
    <div style={{fontFamily: "system-ui", padding: 16}}>
      <header style={{borderBottom: "1px solid #eee", paddingBottom: 10}}>
        <NavLink to="/" style={linkStyle} end>Начало</NavLink>
        <NavLink to="/settings" style={linkStyle}>Настройки</NavLink>
      </header>

      <main style={{minHeight: 120, padding: "12px 0"}}>
        <Outlet />
      </main>

      <footer style={{borderTop: "1px solid #eee", paddingTop: 8, fontSize: 13, color: "#888"}}>
        Общ подвал за всички страници
      </footer>
    </div>
  );
}

function SettingsLayout() {
  const sub = ({isActive}) => ({marginRight: 10, color: isActive ? "#5C45FD" : "#666", fontSize: 14});

  return (
    <div>
      <h3 style={{marginTop: 0}}>Настройки</h3>
      <div style={{marginBottom: 10}}>
        <NavLink to="/settings/profile" style={sub}>Профил</NavLink>
        <NavLink to="/settings/security" style={sub}>Сигурност</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<p>Съдържание на началната страница.</p>} />
          <Route path="settings" element={<SettingsLayout />}>
            <Route index element={<p style={{color: "#777"}}>Избери раздел отляво.</p>} />
            <Route path="profile" element={<p>Име, имейл, снимка.</p>} />
            <Route path="security" element={<p>Парола и двуфакторна защита.</p>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

`Outlet` е дупката, в която router-ът поставя текущото дете. `index` е маршрутът по подразбиране, когато адресът съвпада точно с родителя.

```callout
{"type":"tip","title":"Това е основата на Next.js"}
---
Вложени маршрути с общ изглед и `Outlet` са същата идея, която Next.js прави автоматично чрез папки и `layout.tsx`. Разбереш ли я тук, App Router след две секции няма да те изненада.
```

```quiz
{"id":"react-5-05-q1","question":"Каква е разликата между `<a href=\"/courses\">` и `<Link to=\"/courses\">`?","options":["Няма разлика","`<a>` презарежда цялата страница и изтрива състоянието, `Link` сменя изгледа без презареждане","`Link` работи само за външни адреси","`<a>` е по-бърз"],"answer":1,"explanation":"Обикновената връзка кара браузъра да поиска нов документ. `Link` променя адреса и показва друг компонент, без приложението да се вдига наново."}
```

```quiz
{"id":"react-5-05-q2","question":"За какво служи `Outlet`?","options":["Показва грешка 404","Място, на което се рисува текущият дъщерен маршрут","Пренасочва към друга страница","Зарежда данни"],"answer":1,"explanation":"Общият изглед (меню, подвал) остава, а `Outlet` е дупката, в която router-ът слага текущата страница."}
```

```takeaways
- `BrowserRouter` + `Routes` + `Route` дават страници без презареждане.
- Вътре в приложението се навигира с `Link` / `NavLink`, никога с `<a>`.
- Вложените маршрути с `Outlet` премахват повторението на общия изглед.
- `path="*"` е страницата 404.
