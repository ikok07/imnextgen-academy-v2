import {Skeleton} from "@/app/_components/ui/shadcn/skeleton";
import {TableCell, TableRow} from "@/app/_components/ui/shadcn/table";
import {Column} from "@tanstack/react-table";

type PrimaryTableBodySkeletonProps = {
    columns: Column<any>[]
}

export default function PrimaryTableBodySkeleton({columns}: PrimaryTableBodySkeletonProps) {
    return <TableRow>
        {columns.map((column, index) => {
            if (!column.accessorFn) {
                return <TableCell style={{width: column.getSize()}} key={index} />;
            }

            return <TableCell key={index} style={{width: column.getSize()}}>
                <Skeleton className="h-[1rem]" style={{width: `${Math.max(20, Math.random() * 100)}%`}} />
            </TableCell>
        })}
    </TableRow>
}