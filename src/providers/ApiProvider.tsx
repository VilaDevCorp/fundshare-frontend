import { createContext, ReactNode } from 'react';
import { RegisterUserForm, User } from '../types/entities';
import { ApiResponse } from '../types/types';
import { checkResponseException } from '../utils/utilFunctions';

export interface ApiContext {
    register: (user: RegisterUserForm) => void;
    sendValidationCode: (username: string) => Promise<void>;
    validateAccount: (username: string, code: string) => Promise<void>;
    forgottenPassword: (username: string) => Promise<void>;
    resetPassword: (
        username: string,
        code: string,
        password: string
    ) => Promise<void>;
}

export const ApiContext = createContext<ApiContext>({} as ApiContext);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const register = async (form: RegisterUserForm) => {
        const url = `${apiUrl}public/register`;
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(form),
            headers: new Headers({
                'content-type': 'application/json'
            })
        };
        const res = await fetch(url, options);
        const resObject: ApiResponse<User> = await res.json();
        checkResponseException(res, resObject);
    };

    const sendValidationCode = async (username: string): Promise<void> => {
        const url = `${apiUrl}public/validate/${username}/resend`;
        const options: RequestInit = {
            method: 'POST'
        };
        const res = await fetch(url, options);
        const resObject: ApiResponse<void> = await res.json();
        checkResponseException(res, resObject);
    };

    const validateAccount = async (
        username: string,
        code: string
    ): Promise<void> => {
        const url = `${apiUrl}public/validate/${username}/${code}`;
        const options: RequestInit = {
            method: 'POST'
        };
        const res = await fetch(url, options);
        const resObject: ApiResponse<unknown> = await res.json();
        checkResponseException(res, resObject);
    };

    const forgottenPassword = async (username: string): Promise<void> => {
        const url = `${apiUrl}public/forgottenpassword/${username}`;
        const options: RequestInit = {
            method: 'POST'
        };
        const res = await fetch(url, options);
        const resObject: ApiResponse<unknown> = await res.json();
        checkResponseException(res, resObject);
    };

    const resetPassword = async (
        username: string,
        code: string,
        password: string
    ): Promise<void> => {
        const url = `${apiUrl}public/resetpassword/${username}/${code}`;
        const options: RequestInit = {
            method: 'POST',
            body: password,
            headers: new Headers({
                'content-type': 'text/plain'
            })
        };
        const res = await fetch(url, options);
        const resObject: ApiResponse<unknown> = await res.json();
        checkResponseException(res, resObject);
    };

    const value: ApiContext = {
        register,
        sendValidationCode,
        validateAccount,
        forgottenPassword,
        resetPassword
    };

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
