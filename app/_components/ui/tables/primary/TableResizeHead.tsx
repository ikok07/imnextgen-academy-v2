import {Header} from "@tanstack/table-core";
import {TableHead} from "@/app/_components/ui/shadcn/table";
import {flexRender} from "@tanstack/react-table";
import {cn} from "@/app/_utils/cn";
import {useEffect, useMemo} from "react";
import {LucideArrowDownNarrowWide, LucideArrowDownWideNarrow, LucideChevronsUpDown} from "lucide-react";

type TableResizeHeadProps<TData> = {
    header: Header<TData, unknown>,
    className?: string
}

export default function TableResizeHead<TData>({header, className}: TableResizeHeadProps<TData>) {
    const resizeHandler = header.getResizeHandler();

    const sortButtonIcons = useMemo(() => {
        const className = "w-[1rem] h-[1rem]";

        return {
            asc: <LucideArrowDownNarrowWide className={className} />,
            desc: <LucideArrowDownWideNarrow className={className} />,
            false: <LucideChevronsUpDown className={className} />
        }
    }, []);

    return <TableHead
        key={header.id}
        rowSpan={header.rowSpan}
        colSpan={header.colSpan}
        style={{width: `${header.getSize()}px`}}
        onClick={header.column.getToggleSortingHandler()}
        className={cn("relative cursor-pointer group", className)}
    >
        <div className="flex items-center justify-between group-hover:text-cta">
            {flexRender(header.column.columnDef.header, header.getContext())}
            {header.column.getCanSort() && sortButtonIcons[header.column.getIsSorted() as keyof typeof sortButtonIcons]}
        </div>
        <div
            onDoubleClick={() => header.column.resetSize()}
            onTouchStart={resizeHandler}
            onMouseDown={resizeHandler}
            className="cursor-col-resize absolute top-0 bottom-0 right-0 w-1 hover:bg-primary/70 transition-all duration-200"
        />
    </TableHead>
}