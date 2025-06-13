import {
    IGetProfileByCustomerIdUseCase
} from "@/src/application/use-cases/auth/profiles/get-profile-by-customer-id.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetProfileByCustomerIdController = ReturnType<typeof getProfileByCustomerIdController>;

export const getProfileByCustomerIdController = (
    getProfileByCustomerIdUseCase: IGetProfileByCustomerIdUseCase
) => async (customerId: string | undefined) => {

    if (!customerId) throw new InputParseError("Invalid customer id!");

    return getProfileByCustomerIdUseCase(customerId);
}