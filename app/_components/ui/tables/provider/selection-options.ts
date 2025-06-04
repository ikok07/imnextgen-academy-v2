import {RowSelectionState} from "@tanstack/react-table";
import {Dispatch, SetStateAction} from "react";

type SelectionDisabledOptions = {enabled: false, multipleSelection?: undefined, selectedRows?: undefined, onRowSelected?: undefined}
type SelectionEnabledOptions = {enabled: true, multipleSelection?: boolean, selectedRows: RowSelectionState, onRowSelected: Dispatch<SetStateAction<RowSelectionState>>}

export type SelectionOptions = SelectionDisabledOptions | SelectionEnabledOptions;
