import {SortingState} from "@tanstack/react-table";
import {Dispatch, SetStateAction} from "react";

export type SortingDisabledOptions = {
    enabled: false,
}

export type SortingEnabledOptions = {
    enabled: true,
    sortedFields: SortingState,
    onSortingChange: Dispatch<SetStateAction<SortingState>>
}

export type SortingOptions = SortingDisabledOptions | SortingEnabledOptions;