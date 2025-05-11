import LanguageSelector from "@/app/_components/ui/language/LanguageSelector";
import {getTranslations} from "next-intl/server";
import AuthComponent from "@/app/_components/AuthComponent";
import ThemeSelector from "@/app/_components/ui/theme/ThemeSelector";
import {publicEncrypt} from "crypto"
import {getCalculationForAllSchemes} from "@/app/dashboard/shop/payment/actions";

// DONE: 1. Add payment options to profile settings
// DONE: 1.1 Add modules to user's bought modules
// DONE: 1.2 Add payment payment-success page
// DONE: 1.3 Refactor Stripe's payment sheet
// DONE: 2. Add global 404 and error pages
// DONE: 3. Full user test
// DONE: 3.1 Do not allow non configured users to access dashboard
// DONE: 3.2 Fix setup completion on Vercel
// DONE: 4. Create production publish checklist
// DONE: 5. Update user data in db after change in Clerk
// TODO: 6. Create modularization strategy
// TODO: 7. Integrate DSK Payments

export default async function Home() {
  const t = await getTranslations("Homepage");

  console.log(await getCalculationForAllSchemes({
    price: "1000",
    productId: "test",
    initialPayment: "100"
  }));

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
