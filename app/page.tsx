import LanguageSelector from "@/app/_components/ui/language/LanguageSelector";
import {getTranslations} from "next-intl/server";
import AuthComponent from "@/app/_components/AuthComponent";
import ThemeSelector from "@/app/_components/ui/theme/ThemeSelector";
import TableComponent from "@/app/_components/TableComponent";

export default async function Home() {
  const t = await getTranslations("Homepage");

  return <div className="p-4 space-y-3">
    <div className="flex items-center gap-2">
      <ThemeSelector />
      <LanguageSelector />
    </div>
    <div>
      <h1>{t("title")}</h1>
    </div>
    <AuthComponent />
    <div className="w-[40rem] h-[10rem]"><TableComponent /></div>
  </div>
}
