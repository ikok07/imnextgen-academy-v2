import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, navigationMenuTriggerStyle
} from "@/app/_components/ui/shadcn/navigation-menu";
import Link from "next/link";
import {HOME_NAV_ITEMS} from "@/app/_utils/home/nav/homepage-navbar-items";
import Image from "next/image";
import PrimaryButton from "@/app/_components/ui/buttons/PrimaryButton";
import {Routes} from "@/app/_utils/nav/routes";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import HomepageNavLinks from "@/app/_components/home/nav/HomepageNavLinks";
import HomepageMobileNavbar from "@/app/_components/home/nav/HomepageMobileNavbar";

export default function HomepageNavbar() {
    return <div className="flex items-center justify-between mt-3 w-[95%] max-w-[90rem] mx-auto">
        <Image alt="I&M NextGen Academy" src="/logo.svg" width={200} height={150} />
        <div className="hidden lg:block"><HomepageNavLinks /></div>
        <div className="hidden lg:flex items-center gap-3">
            <SecondaryButton href={Routes.auth.signIn()}>Влизане</SecondaryButton>
            <PrimaryButton href={Routes.auth.signUp()}>Регистрация</PrimaryButton>
        </div>
        <div className="block lg:hidden"><HomepageMobileNavbar /></div>
    </div>
}