import { createContext, ReactNode, useEffect, useState } from 'react';
import { User } from '../types/entities';
import { ApiError, ApiResponse } from '../types/types';
import { useQuery } from '@tanstack/react-query';

export interface AuthContext {
    user?: User;
    csrfToken?: string;
    login: (user: string, password: string) => Promise<string>;
    authenticate: (
        email: string,
        password: string,
        rememberMe: boolean
    ) => void;
    logout: () => void;
    isLoadingUserInfo: boolean;
}

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [csrfToken, setCsrfToken] = useState<string | undefined>(undefined);
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    useEffect(() => {
        loadCsrf();
    }, []);

    useEffect(() => {
        reloadUserInfo();
    }, [csrfToken]);

    const self = async (): Promise<User | undefined> => {
        if (csrfToken) {
            const url = `${apiUrl}self`;
            const options: RequestInit = {
                method: 'GET',
                headers: new Headers({
                    'X-API-CSRF': csrfToken ? csrfToken : ''
                }),
                credentials: 'include'
            };
            const res = await fetch(url, options);
            const result: ApiResponse<User> = await res.json();
            if (!res.ok) {
                throw new ApiError({
                    statusCode: res.status,
                    message: result.errorMessage,
                    code: result.errorCode
                });
            }
            return result.data;
        } else {
            throw new Error('No csrf token');
        }
    };
    const {
        data: user,
        isLoading: isLoadingUserInfo,
        refetch: reloadUserInfo
    } = useQuery<User | undefined>({
        queryKey: ['getUserInfo', csrfToken],
        queryFn: self,
        retry: false
    });

    const login = async (
        username: string,
        password: string
    ): Promise<string> => {
        const url = `${apiUrl}public/login`;
        const options: RequestInit = {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ username, password }),
            headers: new Headers({
                'content-type': 'application/json'
            })
        };
        const res = await fetch(url, options);
        const result: ApiResponse<string> = await res.json();
        if (!res.ok) {
            throw new ApiError({
                statusCode: res.status,
                message: result.errorMessage,
                code: result.errorCode
            });
        }
        return result.data;
    };

    const authenticate = async (
        email: string,
        password: string,
        rememberMe: boolean
    ) => {
        const csrf = await login(email.toLowerCase().trim(), password);
        setCsrfToken(csrf);
        if (rememberMe) {
            localStorage.setItem('csrfToken', csrf);
        } else {
            sessionStorage.setItem('csrfToken', csrf);
        }
    };

    const logout = () => {
        cleanUserParams();
    };

    const cleanUserParams = () => {
        sessionStorage.removeItem('csrfToken');
        localStorage.removeItem('csrfToken');
        setCsrfToken('');
    };

    const loadCsrf = () => {
        if (!csrfToken) {
            let csrf = localStorage.getItem('csrfToken');
            if (!csrf) {
                csrf = sessionStorage.getItem('csrfToken');
            }
            if (csrf) {
                setCsrfToken(csrf);
            }
        }
    };

    const value: AuthContext = {
        user,
        csrfToken,
        login,
        authenticate,
        logout,
        isLoadingUserInfo
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
