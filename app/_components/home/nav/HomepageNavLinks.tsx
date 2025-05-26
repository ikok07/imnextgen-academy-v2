import {HOME_NAV_ITEMS} from "@/app/_utils/home/nav/homepage-navbar-items";
import Link from "next/link";

type HomepageNavLinksProps = {
    onSelect?: () => void
}

export default function HomepageNavLinks({onSelect}: HomepageNavLinksProps) {
    return <nav className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-5">
        {HOME_NAV_ITEMS.map((item, index) => {
            return <Link onClick={onSelect} className="text-[1.1rem] lg:text-[1rem] hover:text-cta transition-all duration-200" href={item.href} key={index}>{item.label}</Link>
        })}
    </nav>
}