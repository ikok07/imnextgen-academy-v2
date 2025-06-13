"use client"

import TableProvider from "@/app/_components/ui/tables/provider/TableProvider";
import useErrorQuery from "@/app/_hooks/useErrorQuery";
import {getAllProfiles} from "@/app/actions";
import {useMemo, useState} from "react";
import {createColumnHelper, Row, RowSelectionState, SortingState} from "@tanstack/react-table";
import {FullProfile} from "@/src/entities/models/auth/full-profile";
import {PaginationState} from "@tanstack/table-core";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import useErrorMutation from "@/app/_hooks/useErrorMutation";
import {deleteMultipleUsers} from "@/app/dashboard/admin/actions";
import { toast } from "sonner";
import {useQueryClient} from "react-query";

import AdminUsersTableWrapper from "@/app/_components/dashboard/admin/users/AdminUsersTableWrapper";

const columnHelper = createColumnHelper<FullProfile>();

export default function AdminUsersTable() {
    const queryClient = useQueryClient();
    const [openedUserDetails, setOpenedUserDetails] = useState<string | null>("user_2y3XLXX5Q14Z0Sq2qnqikdJMfiQ" ?? null); // user id or null
    const [selectedRows, setSelectedRows] = useState<RowSelectionState>({});
    const [pagination, setPagination] = useState<PaginationState>({
        pageSize: 10,
        pageIndex: 0
    });
    const [sortedFields, setSortedFields] = useState<SortingState>([]);

    const {data: allProfilesQuery, isLoading: isLoadingAllProfiles, isRefetching: isRefetchingAllProfiles} = useErrorQuery({
        queryFn: () => getAllProfiles(),
        queryKey: ["allProfiles"],
        onError() {
            toast.error("Потребителите не можаха да бъдат заредени");
        }
    });

    const {mutate: deleteSelectedUsers, isLoading: isDeletingSelectedUsers} = useErrorMutation({
        mutationFn: (rows: Row<any>[]) => deleteMultipleUsers(rows.flatMap(row => row.getValue("user_id"))),
        onMutate() {
          toast.loading("Изтриване на потребители");
        },
        onSuccess() {
            toast.dismiss();
            toast.success("Потребителите бяха изтрити успешно!");
            queryClient.invalidateQueries(["allProfiles"]);
        },
        onError() {
            toast.dismiss();
            toast.error("Потребителите не можаха да бъдат изтрити!");
        }
    });

    const columns = useMemo(() => {
        return [
            columnHelper.accessor(row => row.name, {
                id: "name",
                header: "Име",
                size: 300,
                filterFn: "complexFilter"
            }),
            columnHelper.accessor(row => row.email, {
                id: "email",
                header: "Имейл",
                size: 200,
                filterFn: "complexFilter"
            }),
            columnHelper.accessor(row => row.phone, {
                id: "phone",
                header: "Телефон",
                size: 200,
                filterFn: "complexFilter"
            }),
            columnHelper.accessor(row => row.roles.sort().join(", "), {
                id: "roles",
                header: "Роли",
                filterFn: "complexFilter"
            }),
            columnHelper.display({
                id: "open_btn",
                cell: ({row}) => {
                    return <div className="flex items-center justify-center"><SecondaryButton onClick={() => setOpenedUserDetails(row.original.id)}>Управление</SecondaryButton></div>
                },
                enableResizing: false
            })
        ];
    }, [openedUserDetails]);

    const data = useMemo(() => {
        if (!allProfilesQuery || !allProfilesQuery.success || isLoadingAllProfiles) return [];
        return allProfilesQuery.value;
        // @ts-ignore
    }, [(allProfilesQuery?.value)]);

    return <>
        <TableProvider<FullProfile>
            columns={columns}
            data={data}
            paginationOptions={{
                enabled: true,
                pagination,
                onPaginationChange: setPagination,
                clientSidePagination: true
            }}
            sortingOptions={{
                enabled: true,
                sortedFields,
                onSortingChange: setSortedFields
            }}
            filterOptions={{
                enabled: true
            }}
            selectionOptions={{
                enabled: true,
                selectedRows,
                onRowSelected: setSelectedRows,
                multipleSelection: true,
                onDelete: (rows) => deleteSelectedUsers(rows)
            }}
        >
            <AdminUsersTableWrapper isDeletingSelectedUsers={isDeletingSelectedUsers} isLoadingAllProfiles={isLoadingAllProfiles} isRefetchingAllProfiles={isRefetchingAllProfiles} openedUserDetails={openedUserDetails} setOpenedUserDetails={setOpenedUserDetails} />
        </TableProvider>
    </>
}