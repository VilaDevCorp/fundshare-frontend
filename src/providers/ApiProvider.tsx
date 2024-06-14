import { createContext, ReactNode } from 'react';
import { GroupDebt, RegisterUserForm, User, UserConf } from '../types/entities';
import { ApiResponse } from '../types/types';
import { checkResponseException } from '../utils/utilFunctions';
import { useAuth } from '../hooks/useAuth';

interface ApiContext {
    register: (user: RegisterUserForm) => void;
    sendValidationCode: (username: string) => Promise<void>;
    validateAccount: (username: string, code: string) => Promise<void>;
    forgottenPassword: (username: string) => Promise<void>;
    resetPassword: (
        username: string,
        code: string,
        password: string
    ) => Promise<void>;
    respondRequest: (requestId: string, isAccepted: boolean) => Promise<void>;
    kickGroupUser: (groupId: string, username: string) => Promise<void>;
    getDebtWithUser: (username: string) => Promise<GroupDebt[]>;
    updateConf: (conf: UserConf) => Promise<void>;
}

export const ApiContext = createContext<ApiContext>({} as ApiContext);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const { csrfToken } = useAuth();

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

    const respondRequest = async (
        requestId: string,
        isAccepted: boolean
    ): Promise<void> => {
        const url = `${apiUrl}request/${requestId}?accept=${isAccepted}`;
        const options: RequestInit = {
            method: 'POST',
            credentials: 'include',
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json'
            })
        };
        const res = await fetch(url, options);
        const resObject: ApiResponse<unknown> = await res.json();
        checkResponseException(res, resObject);
    };

    const kickGroupUser = async (
        groupId: string,
        username: string
    ): Promise<void> => {
        const url = `${apiUrl}group/${groupId}/members/${username}`;
        const options: RequestInit = {
            method: 'DELETE',
            credentials: 'include',
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json'
            })
        };
        const res = await fetch(url, options);
        const resObject = await res.json();
        checkResponseException(res, resObject);
    };

    const getDebtWithUser = async (username: string): Promise<GroupDebt[]> => {
        const url = `${apiUrl}debt/${username}`;
        const options: RequestInit = {
            method: 'GET',
            credentials: 'include',
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json'
            })
        };
        const res = await fetch(url, options);
        const resObject: ApiResponse<GroupDebt[]> = await res.json();
        checkResponseException(res, resObject);
        return resObject.data;
    };

    const updateConf = async (conf: UserConf): Promise<void> => {
        const url = `${apiUrl}conf`;
        const options: RequestInit = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(conf),
            headers: new Headers({
                'X-API-CSRF': csrfToken ? csrfToken : '',
                'content-type': 'application/json'
            })
        };
        const res = await fetch(url, options);
        const resObject = await res.json();
        checkResponseException(res, resObject);
    };

    const value: ApiContext = {
        register,
        sendValidationCode,
        validateAccount,
        forgottenPassword,
        resetPassword,
        respondRequest,
        kickGroupUser,
        getDebtWithUser,
        updateConf
    };

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};
