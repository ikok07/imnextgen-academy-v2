"use client"
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import {Card, CardContent} from "@/app/_components/ui/shadcn/card";

export default function PaymentSheetSkeleton() {
    return <>
        <div>

        </div>
        <div>
            <Skeleton className="w-[60%] h-[0.5rem]" />
            <Skeleton className="w-[30%] h-[2rem] my-3" />
            <Skeleton className="w-[40%] h-[0.5rem]" />
            <Card className="mt-5">
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
                        <Skeleton className="w-[50%] h-[0.5rem] mx-auto"/>
                        <Skeleton className="w-[60%] h-[0.5rem] mx-auto"/>
                        <Skeleton className="w-[60%] h-[0.5rem] mx-auto"/>
                        <Skeleton className="w-[50%] h-[0.5rem] mx-auto"/>
                    </div>
                </CardContent>
            </Card>
        </div>
    </>
}