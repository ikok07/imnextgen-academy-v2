import {IGetProductUseCase} from "@/src/application/use-cases/payments/get-product.use-case";
import {PaymentProduct} from "@/src/entities/models/payments/payment-product";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetMultipleProductsController = ReturnType<typeof getMultipleProductsController>;

export const getMultipleProductsController = (
    getProductUseCase: IGetProductUseCase
) => async (productIds: string[] | undefined) => {
    let products: PaymentProduct[] = [];

    if (!productIds) throw new InputParseError("Invalid productIds!");

    for (const productId of productIds) {
        products.push(await getProductUseCase(productId));
    }

    return products;
}