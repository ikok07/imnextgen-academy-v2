import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import Image from "next/image";
import {Module} from "@/drizzle/schema/modules";
import DashboardShopModuleBoxPriceWrapper
    from "@/app/_components/dashboard/shop/module-box/DashboardShopModuleBoxPriceWrapper";
import DashboardShopModuleBoxClientWrapper
    from "@/app/_components/dashboard/shop/module-box/DashboardShopModuleBoxClientWrapper";
import {FullBoughtModule} from "@/src/entities/models/media/modules/full-bought-module";

type DashboardShopModuleBoxProps = {
    module: Omit<Module, "stripe_product_id"> & {stripe_product_id: string},
    boughtModules: FullBoughtModule[]
}

export default function DashboardShopModuleBox({module, boughtModules}: DashboardShopModuleBoxProps) {
    return <DashboardShopModuleBoxClientWrapper moduleId={module.id} stripeProductId={module.stripe_product_id} boughtModules={boughtModules}>
        <div className="relative">
            {module.access === "pre-order" && <div
                className="absolute left-0 right-0 top-7 pb-1 h-full bg-cta flex items-end justify-center rounded-lg -z-10">
                <h1 className="text-white uppercase font-bold text-sm text-center">PRE ORDER</h1>
            </div>}
            <div className="absolute inset-0 bg-background"/>
            <Card className="relative cursor-pointer flex flex-col justify-between hover:bg-secondary/70 dark:hover:bg-border/50">
                <div className="relative w-full aspect-video rounded-t-lg overflow-hidden">
                    {module.image_url && <img alt={module.title} src={module.image_url} className="absolute inset-0 object-cover" />}
                </div>
                <CardHeader className="pt-3 pb-0">
                    <CardTitle>{module.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{module.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-3">
                    <DashboardShopModuleBoxPriceWrapper
                        moduleId={module.id}
                        stripeProductId={module.stripe_product_id}
                        nonDiscountedPriceId={module.non_discounted_price_id ?? undefined}
                        boughtModules={boughtModules}
                    />
                </CardContent>
            </Card>
        </div>
    </DashboardShopModuleBoxClientWrapper>
}