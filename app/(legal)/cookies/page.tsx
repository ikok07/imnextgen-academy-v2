import type {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Политика за бисквитки | I&M NextGen Academy",
    description: "Кои бисквитки поставя I&M NextGen Academy, за какво служат, колко се пазят и как да ги управляваш.",
    alternates: {canonical: "/cookies"}
};

const COOKIES = [
    {
        name: "__session, __client_uat, clerk_active_context",
        owner: "Clerk",
        purpose: "Държат те вписан и пазят сесията ти. Без тях не можеш да влезеш в акаунта си.",
        life: "До 1 година или до излизане от акаунта",
        type: "Строго необходими"
    },
    {
        name: "muxData",
        owner: "Mux",
        purpose: "Плейърът помни докъде си стигнал в урока и подбира качеството според връзката ти.",
        life: "1 година",
        type: "Функционални"
    },
    {
        name: "_fbp и свързани",
        owner: "Meta",
        purpose: "Измерва резултатите от рекламите ни. Поставят се само на публичните страници и само ако си дал съгласие.",
        life: "До 3 месеца",
        type: "Маркетингови"
    }
];

const STORAGE = [
    {name: "theme", purpose: "Помни дали си избрал светла или тъмна тема."},
    {name: "imng:lesson:*", purpose: "Пази прогреса ти по задачите и въпросите в уроците, както и незавършените ти решения. Тези данни не напускат браузъра ти."}
];

export default function CookiesPage() {
    return <>
        <h1>Политика за бисквитки</h1>
        <p className="lead">Последна актуализация: 11 септември 2026 г.</p>

        <p>
            Бисквитките са малки текстови файлове, които сайтът записва в браузъра ти.
            Едни от тях са задължителни, за да работи платформата изобщо. Други просто
            я правят по-удобна. Трети служат за реклама.
        </p>

        <h2>Какви бисквитки ползваме</h2>
        <table>
            <thead>
                <tr><th>Име</th><th>Кой я поставя</th><th>За какво</th><th>Срок</th><th>Вид</th></tr>
            </thead>
            <tbody>
                {COOKIES.map(cookie => (
                    <tr key={cookie.name}>
                        <td><code>{cookie.name}</code></td>
                        <td>{cookie.owner}</td>
                        <td>{cookie.purpose}</td>
                        <td>{cookie.life}</td>
                        <td>{cookie.type}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <h2>Какво пазим в самия браузър</h2>
        <p>
            Освен бисквитки, платформата ползва и локалното хранилище на браузъра ти.
            То не се изпраща към нас и стои само на твоето устройство:
        </p>
        <table>
            <thead>
                <tr><th>Запис</th><th>За какво</th></tr>
            </thead>
            <tbody>
                {STORAGE.map(item => (
                    <tr key={item.name}>
                        <td><code>{item.name}</code></td>
                        <td>{item.purpose}</td>
                    </tr>
                ))}
            </tbody>
        </table>

        <h2>Как да ги управляваш</h2>
        <p>
            Всеки браузър позволява да видиш, изтриеш или блокираш бисквитките — обикновено
            в настройките, раздел „Поверителност“. Полезни указания има за{" "}
            <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a>,{" "}
            <a href="https://support.mozilla.org/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer">Firefox</a> и{" "}
            <a href="https://support.apple.com/bg-bg/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a>.
        </p>
        <p>
            <strong>Внимание:</strong> ако изтриеш или блокираш бисквитките на Clerk, ще излезеш от
            акаунта си и няма да можеш да влезеш обратно, докато не ги разрешиш.
            Ако изчистиш локалното хранилище, ще загубиш отбелязания прогрес по задачите
            в текущия браузър.
        </p>

        <h2>Още за данните ти</h2>
        <p>
            Какви лични данни събираме и какви права имаш, виж в{" "}
            <Link href="/privacy">Политиката за поверителност</Link>.
        </p>
    </>
}
