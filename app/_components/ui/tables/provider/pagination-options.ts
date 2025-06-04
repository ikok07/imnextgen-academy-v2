import {PaginationState} from "@tanstack/table-core";
import {Dispatch, SetStateAction} from "react";

type PaginationDisabledOptions = {
    enabled: false,
    clientSidePagination?: undefined,
    pagination?: undefined,
    onPaginationChange?: undefined
};

type PaginationEnabledOptions = {
    enabled: true,
    clientSidePagination: boolean,
    pagination: PaginationState,
    onPaginationChange: Dispatch<SetStateAction<PaginationState>>
};

export type PaginationOptions = PaginationDisabledOptions | PaginationEnabledOptions;

