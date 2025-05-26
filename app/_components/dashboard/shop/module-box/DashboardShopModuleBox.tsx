import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import Image from "next/image";
import {Module} from "@/drizzle/schema/modules";
import DashboardShopModuleBoxPriceWrapper
    from "@/app/_components/dashboard/shop/module-box/DashboardShopModuleBoxPriceWrapper";
import DashboardShopModuleBoxClientWrapper
    from "@/app/_components/dashboard/shop/module-box/DashboardShopModuleBoxClientWrapper";
import {FullBoughtModule} from "@/src/entities/models/media/modules/full-bought-module";
import {UserFullSubscription} from "@/src/entities/models/payments/user-full-subscription";

type DashboardShopModuleBoxProps = {
    userSubscription: UserFullSubscription | undefined,
    module: Omit<Module, "stripe_product_id"> & {stripe_product_id: string},
    boughtModules: FullBoughtModule[]
}

export default function DashboardShopModuleBox({userSubscription, module, boughtModules}: DashboardShopModuleBoxProps) {
    return <DashboardShopModuleBoxClientWrapper module={module} userSubscription={userSubscription} stripeProductId={module.stripe_product_id} boughtModules={boughtModules}>
        <Card className="cursor-pointer flex flex-col justify-between hover:bg-secondary/70 dark:hover:bg-border/50">
            <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
                {module.image_url && <img alt={module.title} src={module.image_url} className="absolute inset-0 object-cover" />}
            </div>
            <CardHeader className="pt-3 pb-0">
                <CardTitle>{module.title}</CardTitle>
                <CardDescription className="line-clamp-2">{module.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-3">
                <DashboardShopModuleBoxPriceWrapper
                    userSubscription={userSubscription}
                    module={module}
                    stripeProductId={module.stripe_product_id}
                    boughtModules={boughtModules}
                />
            </CardContent>
        </Card>
    </DashboardShopModuleBoxClientWrapper>
}