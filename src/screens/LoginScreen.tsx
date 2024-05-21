import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useValidator, notEmptyValidator } from '../hooks/useValidator';
import { ApiError, ErrorCode } from '../types/types';
import { PublicFormLayout } from '../components/organism/PublicFormLayout';
import { Layout } from '../components/organism/Layout';
import { IoMdClose } from 'react-icons/io';
import StatusCode from 'status-code-enum';
import { useError } from '../hooks/useError';
import { useApi } from '../hooks/useApi';
import { useQueryClient } from '@tanstack/react-query';

export function LoginScreen() {
    const auth = useAuth();
    const navigate = useNavigate();
    const { sendValidationCode } = useApi();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [notValidatedAccount, setNotValidatedAccount] =
        useState<boolean>(false);

    const [usernameDirty, usernameError, usernameMessage, usernameValidate] =
        useValidator(username, [notEmptyValidator]);
    const [passwordDirty, passwordError, passwordMessage, passwordValidate] =
        useValidator(password, [notEmptyValidator]);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { setError } = useError();

    const queryClient = useQueryClient();

    const onResendCode = async () => {
        setIsLoading(true);
        try {
            await sendValidationCode(username);
            console.log('The code was succesfully sent!');
            // toast({
            //     title: 'The code was succesfully sent!',
            //     status: 'success',
            //     duration: 5000
            // });
        } catch (e) {
            if (e instanceof ApiError) {
                if (e.statusCode === StatusCode.ClientErrorConflict) {
                    console.log('The account is already validated');
                    // toast({
                    //     title: 'The account is already validated',
                    //     status: 'error',
                    //     duration: 5000
                    // });
                    return;
                }
            }
            if (e instanceof Error) {
                setError(e);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const disabledButton = isLoading || usernameError || passwordError;

    const onLogin = async () => {
        const usernameValid = usernameValidate();
        const passwordValid = passwordValidate();

        if (usernameValid && passwordValid) {
            setIsLoading(true);
            try {
                await auth.authenticate(username, password, rememberMe);
                queryClient.invalidateQueries({ queryKey: ['getUserInfo'] });
                navigate('/');
            } catch (e) {
                setIsLoading(false);
                if (e instanceof ApiError) {
                    if (
                        e.statusCode === StatusCode.ClientErrorForbidden &&
                        e.code === ErrorCode.NOT_VALIDATED_ACCOUNT
                    ) {
                        setNotValidatedAccount(true);
                        return;
                    }
                    if (
                        e.statusCode === StatusCode.ClientErrorUnauthorized &&
                        e.code === ErrorCode.INVALID_CREDENTIALS
                    ) {
                        console.log('Invalid credentials');
                        // toast({
                        //     title: 'Wrong credentials',
                        //     status: 'error',
                        //     duration: 5000
                        // });
                        return;
                    }
                }
                if (e instanceof Error) {
                    setError(e);
                }
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Layout isPublic>
            <PublicFormLayout title={'Sign in'}>
                {!notValidatedAccount ? (
                    <>
                        <input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {usernameDirty && usernameError ? (
                            <span className="text-error-600">
                                {usernameMessage}
                            </span>
                        ) : (
                            <></>
                        )}

                        <input
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {passwordDirty && passwordError ? (
                            <span className="text-error-600">
                                {passwordMessage}
                            </span>
                        ) : (
                            <></>
                        )}
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) =>
                                    setRememberMe(e.target.checked)
                                }
                            />
                            {'Remember me'}
                        </label>
                        <button
                            type="submit"
                            disabled={disabledButton}
                            onClick={onLogin}
                        >
                            {isLoading ? 'Loading...' : 'Sign in'}
                        </button>
                        <a
                            className="mt-2"
                            onClick={() => navigate('/recover-password')}
                        >
                            {'I have forgotten my password'}
                        </a>
                        <span className="flex mt-5">
                            <span>{`New here? ${'\u00A0'}`}</span>
                            <a onClick={() => navigate('/register')}>
                                {'Sign up'}
                            </a>
                        </span>
                    </>
                ) : (
                    <>
                        <div className="flex gap-2">
                            <IoMdClose className="text-3xl text-error" />
                            <span className="mb-4">
                                {'Your account has not been validated'}
                            </span>
                        </div>
                        <span className="mb-4">{`In order to validate the account you should follow the instructions we sent you via email`}</span>
                        <span>
                            <span>{`You can't see the email? Try to `}</span>
                            <a
                                className="text-blue-500"
                                onClick={() => onResendCode()}
                            >
                                {'send another code'}
                            </a>
                        </span>
                    </>
                )}
            </PublicFormLayout>
        </Layout>
    );
}
