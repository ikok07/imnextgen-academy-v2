"use client"

import BankCreditFormPropertyBox from "@/app/_components/dashboard/shop/payment/bank/BankCreditFormPropertyBox";
import {IoCalculator, IoCalendar, IoCash} from "react-icons/io5";
import {CalculationForScheme} from "@/src/entities/models/payments/dsk/calculation-for-all-schemes";

type DskBankCreditFormCalculationBoxesProps = {
    isLoading: boolean,
    selectedPeriodCalculations: CalculationForScheme | undefined
}

export default function DskBankCreditFormCalculationBoxes({isLoading, selectedPeriodCalculations}: DskBankCreditFormCalculationBoxesProps) {
    return <div className="grid grid-cols-2 gap-3">
        <BankCreditFormPropertyBox
            Icon={IoCalendar}
            label="Месечна вноска"
            isLoading={isLoading}
            value={selectedPeriodCalculations ? `${selectedPeriodCalculations.monthly_payment} лв.` : "-"}
        />
        <BankCreditFormPropertyBox
            Icon={IoCash}
            label="Размер на кредит"
            isLoading={isLoading}
            value={selectedPeriodCalculations ? `${selectedPeriodCalculations.total_loan_amount} лв.` : "-"}
        />
        <BankCreditFormPropertyBox
            Icon={IoCalculator}
            label="ГЛП"
            isLoading={isLoading}
            value={selectedPeriodCalculations ? `${selectedPeriodCalculations.glp} %.` : "-"}
        />
        <BankCreditFormPropertyBox
            Icon={IoCalculator}
            label="ГПР"
            isLoading={isLoading}
            value={selectedPeriodCalculations ? `${selectedPeriodCalculations.gpr} %.` : "-"}
        />
    </div>
}