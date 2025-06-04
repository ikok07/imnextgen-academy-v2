import {FilterFn} from "@tanstack/table-core";

export type FilterConfig = {
    [filterFnName: string]: any
}

const includeString: FilterFn<any> = (
    row,
    columnId: string,
    filterValue: string
) => {
    const search = filterValue?.toString()?.toLowerCase();

    return Boolean(
        row
            .getValue<string | null>(columnId)
            ?.toString()
            ?.toLowerCase()
            ?.includes(search)
    )
}

const doesNotIncludeString: FilterFn<any> = (
    row,
    columnId: string,
    filterValue: string
) => {
    const search = filterValue?.toString()?.toLowerCase();
    return !Boolean(
        row
            .getValue<string | null>(columnId)
            ?.toString()
            ?.toLowerCase()
            ?.includes(search)
    )
}

const greaterThan: FilterFn<any> = (
    row,
    columnId: string,
    filterValue: string
) => {
    const cellValue = Number(row.getValue<string | null>(columnId));
    const filterValueNumber = +filterValue;

    if (isNaN(filterValueNumber) || isNaN(cellValue)) return false;

    return cellValue > filterValueNumber;
}

const greaterThanOrEqual: FilterFn<any> = (
    row,
    columnId: string,
    filterValue: string
) => {
    const cellValue = Number(row.getValue<string | null>(columnId));
    const filterValueNumber = +filterValue;

    if (isNaN(filterValueNumber) || isNaN(cellValue)) return false;

    return cellValue >= filterValueNumber;
}

const lowerThan: FilterFn<any> = (
    row,
    columnId: string,
    filterValue: string
) => {
    const cellValue = Number(row.getValue<string | null>(columnId));
    const filterValueNumber = +filterValue;

    if (isNaN(filterValueNumber) || isNaN(cellValue)) return false;

    return cellValue < filterValueNumber;
}

const lowerThanOrEqual: FilterFn<any> = (
    row,
    columnId: string,
    filterValue: string
) => {
    const cellValue = Number(row.getValue<string | null>(columnId));
    const filterValueNumber = +filterValue;

    if (isNaN(filterValueNumber) || isNaN(cellValue)) return false;

    return cellValue <= filterValueNumber;
}

export const SUPPORTED_TABLE_FILTERS = {
    eq: includeString,
    neq: doesNotIncludeString,
    gt: greaterThan,
    gte: greaterThanOrEqual,
    lt: lowerThan,
    lte: lowerThanOrEqual
}

export const complexFilter: FilterFn<any> = (
    row,
    columnId: string,
    filterValue: object,
    addMeta
) => {
    const filterConfig = filterValue as FilterConfig;
    return Object.entries(filterConfig).every(([fnName, fnFilterValue]) => {
        return SUPPORTED_TABLE_FILTERS[fnName as keyof typeof SUPPORTED_TABLE_FILTERS](row, columnId, fnFilterValue, addMeta)
    })
}