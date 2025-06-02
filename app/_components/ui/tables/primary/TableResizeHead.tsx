import {Header} from "@tanstack/table-core";
import {TableHead} from "@/app/_components/ui/shadcn/table";
import {flexRender} from "@tanstack/react-table";
import {cn} from "@/app/_utils/cn";

type TableResizeHeadProps<TData> = {
    header: Header<TData, unknown>,
    className?: string
}

export default function TableResizeHead<TData>({header, className}: TableResizeHeadProps<TData>) {
    const resizeHandler = header.getResizeHandler();

    return <TableHead
        key={header.id}
        rowSpan={header.rowSpan}
        colSpan={header.colSpan}
        style={{width: `${header.getSize()}px`}}
        className={cn("relative", className)}
    >
        {flexRender(header.column.columnDef.header, header.getContext())}
        <div
            onDoubleClick={() => header.column.resetSize()}
            onTouchStart={resizeHandler}
            onMouseDown={resizeHandler}
            className="cursor-col-resize absolute top-0 bottom-0 right-0 w-1 hover:bg-primary/70 transition-all duration-200"
        />
    </TableHead>
}