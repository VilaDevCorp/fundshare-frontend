import { useContext, useEffect } from 'react';
import { ApiError, ErrorCode } from '../types/types';
import StatusCode from 'status-code-enum';
import { NavigateFunction } from 'react-router-dom';
import { useAuth } from './useAuth';
import { ErrorContext } from '../providers/ErrorProvider';
import { useToast } from './useToast';

export const useError = (navigate?: NavigateFunction) => {
    const ctx = useContext(ErrorContext);
    const { error, setError } = ctx;
    const { logout } = useAuth();

    const { showToast } = useToast();

    useEffect(() => {
        if (error) {
            if (error instanceof ApiError) {
                switch (error.statusCode) {
                    case StatusCode.ClientErrorUnauthorized:
                        if (
                            error.code === ErrorCode.NOT_JWT_TOKEN ||
                            error.code === ErrorCode.NOT_CSR_TOKEN ||
                            error.code === ErrorCode.INVALID_TOKEN
                        ) {
                            logout();
                            if (navigate) {
                                navigate('/login');
                            }
                            showToast('error', 'Your session has expired');
                        }
                        break;
                    default:
                        showToast('error', 'An internal error has occurred');
                }
            } else {
                showToast('error', 'An internal error has occurred');
            }
            setError(undefined);
        }
    }, [error]);

    if (ctx === null) {
        throw new Error(
            'ErrorCode() can only be used on the descendants of ErrorProvider'
        );
    } else {
        return ctx;
    }
};
