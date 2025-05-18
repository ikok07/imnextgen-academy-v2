import {IGetSignedTokensUseCase} from "@/src/application/use-cases/media/videos/get-signed-tokens.use-case";
import {TypeClaim} from "@mux/mux-node/util/jwt-types";
import {InputParseError} from "@/src/entities/errors/common";

export type IGetSignedTokensController = ReturnType<typeof getSignedTokensController>;

export const getSignedTokensController = (
    getSignedTokensUseCase: IGetSignedTokensUseCase
) => async (playbackId: string | undefined, types: (keyof typeof TypeClaim)[] | undefined) => {

    if (!playbackId) throw new InputParseError("Invalid playbackId!");
    if (!types || types.length === 0) throw new InputParseError("Invalid playbackId!");

    return getSignedTokensUseCase(playbackId, types);
}