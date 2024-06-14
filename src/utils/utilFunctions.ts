import { ApiError, ApiResponse } from '../types/types';

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
    if (currency === 'dollar') {
        return amount * 1.07;
    } else {
        return amount;
    }
};

const calculateBaseCurrency = (
    amount: number | undefined,
    currency: string | undefined
) => {
    if (amount === undefined) {
        return 0;
    }
    if (currency === 'dollar') {
        return amount / 1.07;
    } else {
        return amount;
    }
};

const getCurrencySymbol = (currency: string | undefined) => {
    if (currency === 'dollar') {
        return '$';
    } else {
        return '€';
    }
};

export {
    getCurrencySymbol,
    calculateCurrency,
    calculateBaseCurrency,
    checkResponseException
};
