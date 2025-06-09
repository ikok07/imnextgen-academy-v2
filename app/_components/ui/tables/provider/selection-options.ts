import {Row, RowSelectionState} from "@tanstack/react-table";
import {Dispatch, SetStateAction} from "react";
import {IconType} from "react-icons";

type SelectionDisabledOptions = {
    enabled: false,
    multipleSelection?: undefined,
    selectedRows?: undefined,
    onRowSelected?: undefined,
    onDelete?: undefined,
    otherOptions?: undefined
}
type SelectionEnabledOptions = {
    enabled: true,
    multipleSelection?: boolean,
    selectedRows: RowSelectionState,
    onRowSelected: Dispatch<SetStateAction<RowSelectionState>>,
    onDelete?: (rows: Row<any>[]) => void,
    otherOptions?: {Icon: IconType, label: string, onClick: (rows: Row<any>[]) => void, className?: string}[]
}

export type SelectionOptions = SelectionDisabledOptions | SelectionEnabledOptions;
