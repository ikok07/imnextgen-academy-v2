import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/app/_components/ui/shadcn/dropdown-menu";
import SecondaryButton from "@/app/_components/ui/buttons/SecondaryButton";
import {IoMenu, IoTrash} from "react-icons/io5";
import {useTable} from "@/app/_components/ui/tables/provider/TableProvider";
import PrimaryAlert from "../../../alerts/PrimaryAlert";
import {useState} from "react";

export default function PrimarySelectionOptionsDropdown() {
    const {table, selectionOptions} = useTable();

    if (!selectionOptions?.enabled || (!selectionOptions.onDelete && (!selectionOptions.otherOptions || selectionOptions.otherOptions?.length === 0))) return;

    const [closeAlertOpened, setCloseAlertOpened] = useState(false);
    return <>
        <PrimaryAlert
            trigger={<></>}
            open={closeAlertOpened}
            onOpenChange={setCloseAlertOpened}
            title="Сигурен ли си?"
            description="След изтриване в повечето случай информацията не може да бъде възстановена"
            cancel={{
                label: "Отказ",
                onClick: () => setCloseAlertOpened(false)
            }}
            accept={{
                label: "Потвърждаване",
                onClick: () => {
                    selectionOptions.onDelete!(table.getSelectedRowModel().rows);
                    setCloseAlertOpened(false);
                }
            }}
            acceptClassName="bg-red-500 hover:bg-red-600"
        />
        <DropdownMenu>
            <DropdownMenuTrigger disabled={Object.keys(selectionOptions.selectedRows).length === 0}>
                <SecondaryButton className={`${Object.keys(selectionOptions.selectedRows).length > 0 ? "visible animate-in slide-in-from-left-2 fade-in" : "invisible animate-out slide-out-to-right-2 fade-out"} transition-all duration-200 ease-in-out px-2`}><IoMenu /></SecondaryButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {selectionOptions.onDelete &&
                    <>
                        <DropdownMenuItem onClick={() => setCloseAlertOpened(true)} className="cursor-pointer grid grid-cols-[auto_1fr] text-red-500">
                            <IoTrash />
                            Изтриване
                        </DropdownMenuItem>
                    </>
                }
                {selectionOptions.otherOptions?.map((option, index) => {
                    const Icon = option.Icon;
                    return <DropdownMenuItem onClick={() => option.onClick(table.getSelectedRowModel().rows)} className={`cursor-pointer grid grid-cols-[auto_1fr] ${option.className ?? ""}`} key={index}>
                        <Icon />
                        {option.label}
                    </DropdownMenuItem>
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    </>
}