import {IGetProductUseCase} from "@/src/application/use-cases/payments/get-product.use-case";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetProductController = ReturnType<typeof getProductController>;

export const getProductController = (
    getProductUseCase: IGetProductUseCase
) => (productId: string | undefined) => {

    if (!productId) throw new InputParseError("Invalid productId!");

    return getProductUseCase(productId);
}