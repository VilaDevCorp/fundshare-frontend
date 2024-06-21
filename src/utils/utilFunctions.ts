import { ApiError, ApiResponse } from '../types/types';
import { conf } from '../../conf';

const checkResponseException = (
    res: Response,
    resObject: ApiResponse<unknown>
) => {
    if (!res.ok) {
        throw new ApiError({
            statusCode: res.status,
            message: resObject.errorMessage,
            code: resObject.errorCode
        });
    }
};

const calculateCurrency = (
    amount: number | undefined,
    currency: string | undefined
) => {
    if (amount === undefined) {
        return 0;
    }
    let result: number | undefined = undefined;
    conf.currencies.forEach((c) => {
        if (c.id === currency) {
            result = amount * c.rate;
        }
    });
    if (result !== undefined) {
        return result;
    }
    return NaN;
};

const calculateBaseCurrency = (
    amount: number | undefined,
    currency: string | undefined
) => {
    if (amount === undefined) {
        return 0;
    }
    let result: number | undefined = undefined;
    conf.currencies.forEach((c) => {
        if (c.id === currency) {
            result = amount / c.rate;
        }
    });
    if (result !== undefined) {
        return result;
    }
    return NaN;
};

const getCurrencySymbol = (currency: string | undefined) => {
    let result: string | undefined = undefined;
    conf.currencies.forEach((c) => {
        if (c.id === currency) {
            result = c.symbol;
        }
    });
    if (result !== undefined) {
        return result;
    }
    return '';
};

export {
    getCurrencySymbol,
    calculateCurrency,
    calculateBaseCurrency,
    checkResponseException
};
