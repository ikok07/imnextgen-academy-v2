import {TableCell} from "@/app/_components/ui/shadcn/table";
import {Cell, flexRender} from "@tanstack/react-table";

type TableResizeCellProps<TData> = {
    cell: Cell<TData, unknown>
}

export default function TableResizeCell<TData>({cell}: TableResizeCellProps<TData>) {
    return <TableCell
        key={cell.id}
        style={{width: cell.column.getSize(), flex: `0 0 ${cell.column.getSize()}px`}}
        className="truncate"
    >
        {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
}