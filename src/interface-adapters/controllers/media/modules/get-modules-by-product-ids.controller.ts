import {
    IGetModulesByProductIdsUseCase
} from "@/src/application/use-cases/media/modules/get-modules-by-product-ids.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetModulesByProductIdsController = ReturnType<typeof getModulesByProductIdsController>;

export const getModulesByProductIdsController = (
    getModulesByProductIdsUseCase: IGetModulesByProductIdsUseCase
) => async (productIds: string[]) => {

    if (!productIds || productIds.length === 0) throw new InputParseError("Invalid productIds!");

    return getModulesByProductIdsUseCase(productIds);
}