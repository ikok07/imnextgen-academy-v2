import {FullProfile} from "@/src/entities/models/auth/full-profile";
import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/app/_components/ui/shadcn/dialog";
import {IoClose} from "react-icons/io5";
import AdminUserDetailsInfoColumn from "@/app/_components/dashboard/admin/users/modal/AdminUserDetailsInfoColumn";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/app/_components/ui/shadcn/tabs";
import AdminUserDetailsSalesMeetings
    from "@/app/_components/dashboard/admin/users/modal/sales-meetings/AdminUserDetailsSalesMeetings";

type AdminUserDetailsModalProps = {
    fullProfile: FullProfile
}

export function AdminUserDetailsModal({fullProfile}: AdminUserDetailsModalProps) {
    return <DialogContent
        className="[&>button:last-child]:hidden grid grid-rows-[auto_1fr] w-[95%] max-w-[70rem] h-[90vh] overflow-auto md:overflow-hidden">
        <DialogHeader className="border-b border-border pb-4 text-left">
            <div className="flex items-center justify-between">
                <DialogTitle className="text-xl">
                    Управление на потребител
                </DialogTitle>
                <DialogClose><IoClose className="text-2xl hover:text-cta transition-all duration-200"/></DialogClose>
            </div>
            <DialogDescription>Панел за управление на данните на потребителя</DialogDescription>
        </DialogHeader>
        <div className="grid md:grid-cols-[1fr_2.5fr] gap-y-10">
            <AdminUserDetailsInfoColumn fullProfile={fullProfile}/>
            <Tabs className="grid grid-rows-[auto_1fr] h-full" defaultValue="individual_meetings">
                <TabsList className="mx-auto gap-y-2 h-auto flex-col md:flex-row md:h-9">
                    <TabsTrigger value="individual_meetings">Sales срещи</TabsTrigger>
                    <TabsTrigger value="general_meetings">Срещи</TabsTrigger>
                    <TabsTrigger value="video_progress">Прогрес по видеа</TabsTrigger>
                </TabsList>
                <TabsContent value="individual_meetings"><AdminUserDetailsSalesMeetings fullProfile={fullProfile} /></TabsContent>
            </Tabs>
        </div>
    </DialogContent>
}