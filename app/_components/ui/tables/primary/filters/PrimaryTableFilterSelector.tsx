"use client"

import {LucideListFilter} from "lucide-react";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/app/_components/ui/shadcn/dropdown-menu";
import {useTable} from "@/app/_components/ui/tables/provider/TableProvider";
import {useMemo} from "react";
import {SUPPORTED_TABLE_FILTERS} from "@/app/_components/ui/tables/utils/filter-methods";
import {useViewLoaded} from "@/app/_hooks/useViewLoaded";
import PrimaryFilterRow from "@/app/_components/ui/tables/primary/filters/PrimaryFilterRow";
import PrimaryNewFilterRow from "@/app/_components/ui/tables/primary/filters/PrimaryNewFilterRow";

export type FilterOption = keyof typeof SUPPORTED_TABLE_FILTERS;
export type FilterValue = Record<FilterOption, string>;
export type FilterRow = {
    id: string,
    option: FilterOption,
    value: string
}

export default function PrimaryTableFilterSelector<TData>() {
    const {viewLoaded} = useViewLoaded();

    if (!viewLoaded) return;

    return <DropdownMenu>
        <DropdownMenuTrigger>
            <SecondaryButton className="flex items-center gap-1">
                <LucideListFilter />
                Филтри
            </SecondaryButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="py-2 px-3 flex flex-col w-full max-w-[95vw] ml-2 overflow-scroll">
            <div style={{flex: "0 0 100%"}} className="w-[27rem]">
                <p className="text-[0.9rem] text-primary/70 px-2 pb-1">Активни:</p>
                <div className="border-b border-border pb-2 mb-2 space-y-2">
                    <ActiveFiltersList<TData> />
                </div>
            </div>
            <div style={{flex: "0 0 100%"}} className="w-[27rem]">
                <p className="text-[0.9rem] text-primary/70 px-2 pb-1">Добавяне:</p>
                <PrimaryNewFilterRow />
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
}

function ActiveFiltersList<TData>() {
    const {table} = useTable<TData>();

    const filters = useMemo(() => {
        return table.getState().columnFilters;
    }, [table.getState().columnFilters.length])

    if (filters.length === 0) {
        return <div className="pb-2 px-4">
            <h4>Няма активни филтри</h4>
            <p className="text-xs text-primary/70">Може да добавиш филтър от долните полета</p>
        </div>
    }

    return <div className="space-y-2">
        {filters
            .flatMap(
                filter =>
                    Object.entries(filter.value as FilterValue)
                        .map(([option, value]) => ({
                            id: filter.id, option: option as FilterOption, value
                        })
                    )
            ).map((filterRow, index) => {
            return <PrimaryFilterRow key={index} filterRow={filterRow} />
        })}
    </div>
}