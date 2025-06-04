import {SUPPORTED_TABLE_FILTERS} from "@/app/_components/ui/tables/utils/filter-methods";

export type FilterOptionLabel = {id: string, short: string, full: string}

export function getFilterOptionLabel(operation: keyof typeof SUPPORTED_TABLE_FILTERS): FilterOptionLabel {
    switch (operation) {
        case "eq":
            return {id: operation, short: "==", full: "съдържа"};
        case "neq":
            return {id: operation, short: "!=", full: "не съдържа"};
        case "gt":
            return {id: operation, short: ">", full: "по-голямо"};
        case "gte":
            return {id: operation, short: ">=", full: "по-голямо или равно"};
        case "lt":
            return {id: operation, short: "<", full: "по-малко"};
        case "lte":
            return {id: operation, short: "<=", full: "по-малко или равно"};
        default:
            return {id: operation, short: "-", full: "-"}
    }
}