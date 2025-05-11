import {
    CalculationForAllSchemesOptions,
    calculationForAllSchemesOptionsSchema
} from "@/src/entities/models/payments/dsk/calculation-for-all-schemes";
import {
    IGetCalculationForAllSchemesUseCase
} from "@/src/application/use-cases/payments/dsk/get-calculation-for-all-schemes.use-case";
import {InputParseError} from "@/src/entities/errors/common";
import {PaymentProduct} from "@/src/entities/models/payments/payment-product";
import {IGetProductUseCase} from "@/src/application/use-cases/payments/get-product.use-case";

export type IGetCalculationForAllSchemesController = ReturnType<typeof getCalculationForAllSchemesController>;

export const getCalculationForAllSchemesController = (
    getCalculationForAllSchemesUseCase: IGetCalculationForAllSchemesUseCase,
    getProductUseCase: IGetProductUseCase
) => async (opts: Partial<CalculationForAllSchemesOptions>) => {
    const {data, error} = calculationForAllSchemesOptionsSchema.safeParse(opts);
    if (error) throw new InputParseError("Invalid options!");

    if (opts.productIds) {
        let products: PaymentProduct[] = [];

        for (const productId of opts.productIds) {
            products.push(await getProductUseCase(productId));
        }

        data.price = products.reduce((prev, curr) => {
            if (!curr.price) return prev;
            return prev + (curr.price / 100);
        }, 0).toString();
    }

    if (!data.price || isNaN(+data.price) || +data.price === 0) throw new InputParseError("Price must be greater than 0!");

    return getCalculationForAllSchemesUseCase(data);
}