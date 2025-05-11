import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

export default function StripePaymentSheetSkeleton() {
    return <Card>
        <CardHeader className="space-y-0.5">
            <CardTitle><Skeleton className="w-[30%] h-[2rem]" /></CardTitle>
            <CardDescription><Skeleton className="w-[40%] h-[0.5rem] mt-2" /></CardDescription>
        </CardHeader>
        <CardContent>
            <div className="mb-3">
                <Skeleton className="w-[40%] h-[0.95rem] mb-3" />
                <div className="flex items-center justify-between flex-wrap mb-2">
                    <Skeleton className="w-[30%] h-[0.5rem]" />
                    <Skeleton className="w-[10%] h-[0.5rem]" />
                </div>
                <div className="flex items-center justify-between flex-wrap">
                    <Skeleton className="w-[20%] h-[0.5rem]" />
                    <Skeleton className="w-[12%] h-[0.5rem]" />
                </div>
            </div>
            <div className="mb-5">
                <Skeleton className="w-[40%] h-[0.95rem] mb-3" />
                <Skeleton className="w-[30%] h-[2rem]" />
            </div>
            <Card>
                <CardContent className="py-5">
                    <Skeleton className="w-full h-[2.5rem]"/>
                    <Skeleton className="w-[50%] h-[0.5rem] my-3"/>
                    <div className="space-y-2">
                        <Skeleton className="w-full h-[2.5rem]"/>
                        <Skeleton className="w-full h-[2.5rem]"/>
                    </div>
                    <Skeleton className="w-[50%] h-[0.5rem] my-3"/>
                    <Skeleton className="w-full h-[2.5rem]"/>
                    <div className="space-y-2 mt-4">
                        <Skeleton className="w-[70%] h-[0.5rem]"/>
                        <Skeleton className="w-[65%] h-[0.5rem]"/>
                        <Skeleton className="w-[60%] h-[0.5rem]"/>
                        <Skeleton className="w-[50%] h-[0.5rem]"/>
                    </div>
                </CardContent>
            </Card>
        </CardContent>
    </Card>
}