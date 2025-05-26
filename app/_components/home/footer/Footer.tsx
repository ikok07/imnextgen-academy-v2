import Link from "next/link";

export default function Footer() {
    return <section id="footer" className="border border-t-border flex flex-col md:flex-row gap-y-3 items-center justify-between p-5 text-sm">
        <h5>I&M NextGen LTD</h5>
        <div className="flex flex-col md:flex-row items-center gap-x-3 gap-y-3">
            <Link target="_blank" href="https://www.iubenda.com/privacy-policy/82266683" className="hover:text-cta">Политика за поверителност</Link>
            <Link target="_blank" href="https://www.iubenda.com/privacy-policy/82266683/cookie-policy" className="hover:text-cta">Политика за бисквитки</Link>
        </div>
    </section>
}