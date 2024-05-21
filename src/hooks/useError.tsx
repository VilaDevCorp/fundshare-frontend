import { useContext, useEffect } from 'react';
import { ApiError } from '../types/types';
import StatusCode from 'status-code-enum';
import { NavigateFunction } from 'react-router-dom';
import { useAuth } from './useAuth';
import { ErrorContext } from '../providers/ErrorProvider';

export const useError = (navigate?: NavigateFunction) => {
    const ctx = useContext(ErrorContext);
    const { error, setError } = ctx;
    const { logout } = useAuth();

    useEffect(() => {
        if (error) {
            if (error instanceof ApiError) {
                switch (error.statusCode) {
                    case StatusCode.ClientErrorForbidden:
                        logout();
                        if (navigate) {
                            navigate('/login');
                        }
                        console.log('Your session has expired');
                        // toast({
                        //   title: "Your session has expired",
                        //   status: "error",
                        //   duration: 5000,
                        // });
                        break;
                    default:
                        console.log('An internal error has occurred');
                    // toast({
                    //   title: "An internal error has occurred",
                    //   status: "error",
                    //   duration: 5000,
                    // });
                }
            } else {
                console.log('An internal error has occurred');
                // toast({
                //   title: "An internal error has occurred",
                //   status: "error",
                //   duration: 5000,
                // });
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
