import {IDskService} from "@/src/application/services/payments/dsk.service.interface";
import {
    CalculationForAllSchemes,
    CalculationForAllSchemesOptions, calculationForAllSchemesSchema
} from "@/src/entities/models/payments/dsk/calculation-for-all-schemes";
import {PaymentError} from "@/src/entities/errors/payments/payment";
import axios from "axios";
import crypto from "crypto"

export class DskService implements IDskService {

    baseUrl = process.env.DSK_BASE_URL!
    unicd = process.env.DSK_UNICD!;

    private encryptBody(rawBody: string) {
        const publicKey = crypto.createPublicKey(process.env.DSK_PUBLIC_KEY!);
        const keySize = publicKey.asymmetricKeyDetails?.modulusLength || 2048;
        const maxChunkSize = (keySize / 8) - 11;

        const buffer = Buffer.from(rawBody);
        const chunks: Buffer[] = [];

        for (let i = 0; i < buffer.length; i += maxChunkSize) {
            const chunk = buffer.subarray(i, i + maxChunkSize);
            const encryptedChunk = crypto.publicEncrypt({
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_PADDING
            }, chunk);
            chunks.push(encryptedChunk);
        }

        return Buffer.concat(chunks).toString("base64");
    }

    async getCalculationForAllSchemes({price, productId, initialPayment}: CalculationForAllSchemesOptions): Promise<CalculationForAllSchemes> {
        try {
            const {data} = await axios.post<{data: {status: number, result: object}}>(this.baseUrl, {
                data: this.encryptBody(JSON.stringify({
                    name: "getCalculationForAllSchemes",
                    param: {
                        unicid: this.unicd,
                        price,
                        product_id: productId,
                        initial_payment: initialPayment
                    }
                }))
            });

            return calculationForAllSchemesSchema.parse(data.data.result);
        } catch(e) {
            throw new PaymentError(`Failed to get calculation for all DSK schemes: ${e}`)
        }
    }

}
