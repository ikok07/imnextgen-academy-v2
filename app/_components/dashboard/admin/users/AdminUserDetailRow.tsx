import {IconType} from "react-icons";

type AdminUserDetailRowProps = {
    Icon: IconType,
    label: string,
    value: string,
    onClick?: () => void
}

export default function AdminUserDetailRow({Icon, label, value, onClick}: AdminUserDetailRowProps) {
    return <div className={`group flex items-center gap-2 ${onClick ? "cursor-pointer" : ""}`} onClick={onClick}>
        <Icon className="text-2xl text-cta" />
        <div>
            <h6 className="font-semibold">{label}</h6>
            <p className={`text-sm text-primary/70 ${onClick ? "group-hover:text-cta" : ""}`}>{value}</p>
        </div>
    </div>
}