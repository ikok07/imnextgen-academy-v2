import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/shadcn/card";
import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";

export default function BankFormSkeleton() {
    return <Card>
        <CardHeader className="space-y-0.5">
            <Skeleton className="w-[10rem] h-[2rem]"/>
            <CardTitle><Skeleton className="w-[30%] h-[1.5rem] mt-3" /></CardTitle>
            <CardDescription>
                <Skeleton className="w-[60%] h-[0.7rem] mt-2" />
                <Skeleton className="w-[40%] h-[0.7rem] mt-2" />
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Skeleton className="w-full h-[2.2rem] rounded-lg mt-6" />
            <div className="grid grid-cols-2 gap-3 mt-3">
                <Skeleton className="w-full h-[8rem] rounded-xl" />
                <Skeleton className="w-full h-[8rem] rounded-xl" />
            </div>
            <Skeleton className="w-full h-[2.2rem] rounded-lg mt-4" />
            <Skeleton className="w-full h-[2.2rem] rounded-lg mt-4" />
            <div className="grid grid-cols-2 gap-3">
                <Skeleton className="w-full h-[2.2rem] rounded-lg mt-4" />
                <Skeleton className="w-full h-[2.2rem] rounded-lg mt-4" />
            </div>
        </CardContent>
    </Card>
}