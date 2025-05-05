import LanguageSelector from "@/app/_components/ui/language/LanguageSelector";
import {getTranslations} from "next-intl/server";
import AuthComponent from "@/app/_components/AuthComponent";
import ThemeSelector from "@/app/_components/ui/theme/ThemeSelector";

// DONE: 1. Add payment options to profile settings
// DONE: 1.1 Add modules to user's bought modules
// DONE: 1.2 Add payment payment-success page
// DONE: 1.3 Refactor Stripe's payment sheet
// TODO: 2. Add global 404 and error pages
// TODO: 3. Integrate DSK Payments
// TODO: 4. Full user test
// TODO: 5. Create modularization strategy

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
  </div>
}
