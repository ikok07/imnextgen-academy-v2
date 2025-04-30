import {IGetCustomerUseCase} from "@/src/application/use-cases/payments/get-customer.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetCustomerController = ReturnType<typeof getCustomerController>;

export const getCustomerController = (
    getCustomerUseCase: IGetCustomerUseCase
) => async (customerId: string | undefined) => {

    if (!customerId) throw new InputParseError("Invalid customerId!");

    return getCustomerUseCase(customerId);
}