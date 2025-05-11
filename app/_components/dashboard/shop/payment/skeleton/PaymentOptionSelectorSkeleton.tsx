import {Card, CardContent, CardHeader} from "@/app/_components/ui/shadcn/card";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

export default function PaymentOptionSelectorSkeleton() {
    return <Card className="h-max">
        <CardHeader>
            <Skeleton className="w-[60%] h-[1.5rem]" />
            <Skeleton className="w-full h-[0.7rem]" />
            <Skeleton className="w-[30%] h-[0.7rem]" />
        </CardHeader>
        <CardContent>
            <div className="flex items-center flex-wrap gap-3">
                <Skeleton className="w-[30%] h-[2rem]" />
                <Skeleton className="w-[40%] h-[2rem]" />
            </div>
        </CardContent>
    </Card>
}