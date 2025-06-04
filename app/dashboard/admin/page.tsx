import {redirect} from "next/navigation";
import {Routes} from "@/app/_utils/nav/routes";

export default function Page() {
    redirect(Routes.dashboard.admin.users());
}