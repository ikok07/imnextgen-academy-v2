"use client"

import AdminMediaItemPropertyBox from "@/app/_components/dashboard/admin/media/AdminMediaItemPropertyBox";
import {IoCashOutline, IoKeyOutline, IoListOutline, IoPricetagOutline} from "react-icons/io5";
import {getModuleAccessLabel} from "@/app/_utils/modules/getModuleAccessLabel";
import {Module, moduleAccessEnumSchema} from "@/drizzle/schema/modules";
import {ChangeEvent, useEffect, useState} from "react";
import PrimarySelect from "@/app/_components/ui/inputs/PrimarySelect";
import {useAdminManageModule} from "@/app/_providers/AdminManageModuleProvider";
import PrimaryInput from "@/app/_components/ui/inputs/PrimaryInput";
import {handleParse, trackErrors} from "@/app/_utils/handleInputValidation";
import {z} from "zod";

type AdminModulesManagePagePropertiesProps = {
    module: Module,
    allModules: Module[]
}

export default function AdminModulesManagePageProperties({module, allModules}: AdminModulesManagePagePropertiesProps) {
    const {
        editMode,
        errors,
        setErrors,
        access, setAccess,
        orderNumber, setOrderNumber,
        stripeProductId, setStripeProductId,
        nonDiscountedPriceId, setNonDiscountedPriceId
    } = useAdminManageModule();

    return <div className={`grid ${!editMode ? "grid-cols-2" : "sm:grid-cols-2"} items-center gap-5 mt-4`}>
        <AdminMediaItemPropertyBox
            Icon={IoKeyOutline}
            label="Достъп"
            value={getModuleAccessLabel(module.access)}
            valueContent={
                editMode ? <PrimarySelect
                    className="w-full"
                    placeholder="Достъп"
                    value={access ?? ""}
                    onValueChange={v => setAccess(v)}
                    options={moduleAccessEnumSchema.options.map(opt => ({label: getModuleAccessLabel(opt), value: opt}))}
                /> : undefined
            }
        />
        <AdminMediaItemPropertyBox
            Icon={IoListOutline}
            label="Поредност"
            value={`№ ${module.order_number}`}
            valueContent={
                editMode ? <PrimarySelect
                    className="w-full"
                    placeholder="Поредност"
                    value={orderNumber ?? ""}
                    onValueChange={v => setOrderNumber(v)}
                    options={Array.from({length: allModules.length}).map((_, index) => ({label: index.toString(), value: index.toString()}))}
                /> : undefined
            }
        />
        <AdminMediaItemPropertyBox
            Icon={IoPricetagOutline}
            label="Stripe Product ID"
            value={`${module.stripe_product_id ?? "-"}`}
            valueContent={
                editMode ? <PrimaryInput
                    placeholder="prod_"
                    value={stripeProductId ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setStripeProductId(e.target.value)}
                    error={handleParse({
                        type: "ignoreNullOrEmpty",
                        value: stripeProductId,
                        validateCb: () => z.string().startsWith("prod_", {message: "ID трябва да започва с 'prod_'"}).length(19, {message: "Невалидно ID"}).parse(stripeProductId),
                        trackErrorsFunc: (id, action) => trackErrors(id, action, errors, setErrors),
                        errorId: "stripeProductId"
                    })}
                /> : undefined
            }
        />
        <AdminMediaItemPropertyBox
            Icon={IoCashOutline}
            label="Non Discounted Price ID"
            value={`${module.non_discounted_price_id ?? "-"}`}
            valueContent={
                editMode ? <PrimaryInput
                    placeholder="price_"
                    value={nonDiscountedPriceId ?? ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNonDiscountedPriceId(e.target.value)}
                    error={handleParse({
                        type: "ignoreNullOrEmpty",
                        value: nonDiscountedPriceId,
                        validateCb: () => z.string().startsWith("price_", {message: "ID трябва да започва с 'price_'"}).length(30, {message: "Невалидно ID"}).parse(nonDiscountedPriceId),
                        trackErrorsFunc: (id, action) => trackErrors(id, action, errors, setErrors),
                        errorId: "nonDiscountedPriceId"
                    })}
                /> : undefined
            }
        />
    </div>
}