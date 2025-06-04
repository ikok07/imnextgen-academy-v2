import {IPayDirectUseCase} from "@/src/application/use-cases/payments/dsk/pay-direct.use-case";
import {ICreateOrderUseCase} from "@/src/application/use-cases/payments/bank-orders/create-order.use-case";
import {
    SendDirectPayOptions,
    sendDirectPayOptionsSchema
} from "@/src/entities/models/payments/dsk/send-direct-pay-options";
import {InputParseError} from "@/src/entities/errors/common";
import {z} from "zod";
import {paymentProductSchema} from "@/src/entities/models/payments/payment-product";
import {IDeleteOrderUseCase} from "@/src/application/use-cases/payments/bank-orders/delete-order.use-case";

export type IPayDirectController = ReturnType<typeof payDirectController>;

export const directPayOptionsExtensionSchema = z.object({
    products: z.array(paymentProductSchema)
});

export const sendDirectPayModifiedOptionsSchema = sendDirectPayOptionsSchema.omit({orderId: true, items: true}).and(directPayOptionsExtensionSchema);

export type DirectPayOptionsExtension = z.infer<typeof directPayOptionsExtensionSchema>;
export type SendDirectPayModifiedOptions = z.infer<typeof sendDirectPayModifiedOptionsSchema>;

export const payDirectController = (
    createOrderUseCase: ICreateOrderUseCase,
    deleteOrderUseCase: IDeleteOrderUseCase,
    payDirectUseCase: IPayDirectUseCase,
) => async (
    userId: string | undefined,
    opts: Partial<SendDirectPayModifiedOptions>
) => {
    if (!userId) throw new InputParseError("Invalid userId!");

    const {data, error} = sendDirectPayOptionsSchema
        .omit({orderId: true, items: true})
        .and(directPayOptionsExtensionSchema)
        .safeParse(opts);
    if (error) throw new InputParseError(`Invalid options! ${error}`);

    if (isNaN(+data.price)) throw new InputParseError("Invalid price!");

    const totalPrice = data.products.reduce((prev, curr) => {
        if (!curr.price) throw new InputParseError(`Product with id ${curr.id} has no price!`);
        return prev + (curr.price / 100);
    }, 0);

    if (totalPrice < +data.price) throw new InputParseError("The provided price exceeds the total price of all items!");

    const order = await createOrderUseCase(
        userId,
        data.products.map(p => ({
            product_id: p.id
        }))
    );

    const items = data.products?.map(p => ({
        id: p.id,
        name: p.name,
        price: (p.price! / 100).toFixed(2).toString(),
        quantity: "1",
        image: p.image ?? "no-img"
    }));

    const fullOptions: SendDirectPayOptions = {...data, orderId: order.id, items};
    // console.log(fullOptions);
    try {
        // return await payDirectUseCase(fullOptions);
    } catch(e) {
        await deleteOrderUseCase(order.id);
        throw e;
    }
}