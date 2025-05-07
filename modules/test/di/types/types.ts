import {TEST_RETURN_TYPES, TEST_SYMBOLS} from "@/modules/test/di/types/test.types";

export const DI_SYMBOLS = {
    ...TEST_SYMBOLS,
};

export interface DI_RETURN_TYPES extends
    TEST_RETURN_TYPES
{}