import {Technology} from "@/src/entities/models/homepage/technology";

export const TECHNOLOGIES: Technology[] = [
    {
        id: "html",
        image: "/home/technologies/html.svg",
        title: "HTML",
        description: "Научи как да изграждаш структурата на страници с елементи като заглавия, параграфи и бутони. Ще знаеш как браузърите „виждат“ съдържанието и как да го подредиш логично и семантично.",
        language: "cshtml",
        code: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <script defer src='index.js'/>\n    <title>Първи сайт</title>\n</head>\n<body>\n    <h1 class='heading-1'>Твоят първи уебсайт</h1>\n    <form>\n        <input id=\"name\" placeholder=\"Име\" />\n        <input id=\"email\" placeholder=\"Имейл\" />\n        <input id=\"phone\" placeholder=\"Телефон\" />\n        <button type='submit' onclick='submitForm'>Потвърждаване</button>\n    </form>\n</body>\n</html>"
    },
    {
        id: "css",
        image: "/home/technologies/css.svg",
        title: "CSS",
        description: "Оформи външния вид на сайта – цветове, шрифтове, разстояния, подравняване, ефекти и адаптивен дизайн за мобилни устройства. Превърни всяка идея във визуално изпипан уебсайт.",
        language: "css",
        code: ":root {\n margin: 0\n}\nhtml {\n overflow: hidden;\n}\n.heading-1 {\n font-size: 2rem;\n font-weight: 700;\n color: #333333;\n}\n#name, #email, #phone {\n font-size: 1.6rem;\n color: #555555;\n font-weight: bold;\n text-decoration: underline; }"
    },
    {
        id: "js",
        image: "/home/technologies/js.svg",
        title: "JavaScript",
        description: "С JavaScript ще добавяш интерактивност – от простички действия като кликове и анимации до работа с данни, валидации на форми и динамично съдържание. Това е езикът, който прави сайта ти жив.",
        language: "js",
        code: "const nameInput = document.querySelector(\"#name\");\nconst emailInput = document.querySelector(\"#email\");\nconst phoneInput = document.querySelector(\"#phone\");\n\nasync function submitForm(e) {\n    e.preventDefault();\n    \n    if (!nameInput || !emailInput || !phoneInput) throw new Error(\"Invalid fields!\");\n    \n    const res = await fetch(\"https://api.imnextgen.bg/test/submit\");\n    if (res.ok) {\n        console.log(await res.json())\n    } else {\n        throw new Error(\`An error occurred!\`)\n    }\n}"
    },
    {
        id: "react",
        image: "/home/technologies/react.svg",
        title: "ReactJS",
        description: "Най-популярната библиотека за изграждане на съвременни уеб приложения. Ще се научиш как да мислиш в компоненти, да управляваш състояние, да работиш с API-та и да създаваш приложения, които се усещат бързи и професионални.",
        language: "jsx",
        code: "export default function App() {\n    const [name, setName] = useState(\"\");\n    const [email, setEmail] = useState(\"\");\n    const [phone, setPhone] = useState(\"\");\n\n    function submitForm(e) {\n        e.preventDefault();\n        async function submit() {\n            if (!name || !email || !phone) throw new Error(\"Invalid fields!\");\n\n            const res = await fetch(\"https://api.imnextgen.bg/test/submit\");\n            if (res.ok) {\n                console.log(await res.json())\n            } else {\n                throw new Error(\`An error occurred!\`)\n            }\n        }\n        submit();\n    }\n\n    return <form>\n        <input placeholder=\"Име\" value={name} onChange={e => setName(e.target.value)} />\n        <input placeholder=\"Имейл\" value={email} onChange={e => setEmail(e.target.value)} />\n        <input placeholder=\"Телефон\" value={phone} onChange={e => setPhone(e.target.value)} />\n        <button type='submit' onClick={submitForm}>Потвърждаване</button>\n    </form>\n}"
    },
    {
        id: "nextjs",
        image: "/home/technologies/nextjs.svg",
        title: "NextJS",
        description: "Надгради уменията си с Next.js – професионалната рамка за създаване на бързи, SEO-оптимизирани уеб приложения. Ще се научиш да работиш със сървърни компоненти, маршрути, мета тагове, форми и бази данни -точно както го правят компаниите.",
        language: "jsx",
        code: "async function submitFormAction(formData) {\n    \"use server\"\n    \n    if (!formData.has(\"name\") || !formData.has(\"email\") || !formData.has(\"phone\")) throw new Error(\"Invalid fields!\");\n\n    const res = await fetch(\"https://api.imnextgen.bg/test/submit\");\n    if (res.ok) {\n        console.log(await res.json())\n    } else {\n        throw new Error(\`An error occurred!\`)\n    }\n    redirect(\"/form/submitted\");\n}\n\nexport default function Homepage() {\n    return <div>\n        <h1 className='heading-1'>Твоят първи уебсайт</h1>\n        <form action={submitFormAction}>\n            <input id=\"name\" placeholder=\"Име\"/>\n            <input id=\"email\" placeholder=\"Имейл\"/>\n            <input id=\"phone\" placeholder=\"Телефон\"/>\n            <button type='submit' onClick='submitForm'>Потвърждаване</button>\n        </form>\n    </div>\n}"
    },
]