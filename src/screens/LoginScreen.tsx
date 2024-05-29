import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useValidator, notEmptyValidator } from '../hooks/useValidator';
import { ApiError, ErrorCode } from '../types/types';
import { PublicFormLayout } from '../components/organism/PublicFormLayout';
import { Layout } from '../components/organism/Layout';
import StatusCode from 'status-code-enum';
import { useError } from '../hooks/useError';
import { useApi } from '../hooks/useApi';
import { useQueryClient } from '@tanstack/react-query';
import { FormField } from '../components/ui/FormField';
import { Button, Checkbox, Input, Link } from '@chakra-ui/react';
import { Typography } from '../components/ui/Typography';
import { useToast } from '../hooks/useToast';
import { Icon } from '../components/atom/Icon';

export function LoginScreen() {
    const auth = useAuth();
    const navigate = useNavigate();
    const { sendValidationCode } = useApi();

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [notValidatedAccount, setNotValidatedAccount] =
        useState<boolean>(false);

    const usernameInputRef = useRef<HTMLInputElement>(null);
    const [usernameDirty, usernameError, usernameMessage, usernameValidate] =
        useValidator(username, [notEmptyValidator], usernameInputRef);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [passwordDirty, passwordError, passwordMessage, passwordValidate] =
        useValidator(password, [notEmptyValidator], passwordInputRef);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { setError } = useError();

    const queryClient = useQueryClient();

    const { showToast } = useToast();

    const onResendCode = async () => {
        setIsLoading(true);
        try {
            await sendValidationCode(username);
            showToast('success', 'The code was succesfully sent!');
        } catch (e) {
            if (e instanceof ApiError) {
                if (e.statusCode === StatusCode.ClientErrorConflict) {
                    showToast('error', 'The account is already validated');
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
                        showToast('error', 'Wrong credentials');
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
            <PublicFormLayout onSubmit={() => onLogin()} title={'Sign in'}>
                {!notValidatedAccount ? (
                    <>
                        <FormField
                            label="Username"
                            error={
                                usernameDirty && usernameError
                                    ? usernameMessage
                                    : undefined
                            }
                            input={
                                <Input
                                    ref={usernameInputRef}
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                />
                            }
                        />
                        <FormField
                            label="Password"
                            error={
                                passwordDirty && passwordError
                                    ? passwordMessage
                                    : undefined
                            }
                            input={
                                <Input
                                    ref={passwordInputRef}
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            }
                        />
                        <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        >
                            {'Remember me'}
                        </Checkbox>

                        <Button type="submit" disabled={disabledButton}>
                            {'Sign in'}
                        </Button>
                        <Link onClick={() => navigate('/recover-password')}>
                            {'I have forgotten my password'}
                        </Link>
                        <span className="flex mt-5 items-center">
                            <span>{`New here? ${'\u00A0'}`}</span>
                            <Link onClick={() => navigate('/register')}>
                                {'Sign up'}
                            </Link>
                        </span>
                    </>
                ) : (
                    <>
                        <div className="flex gap-2">
                            <Icon
                                type={'warning'}
                                color={'error.500'}
                                fontSize={'2xl'}
                            />
                            <span>{'Your account has not been validated'}</span>
                        </div>
                        <Typography type="body">{`In order to validate the account you should follow the instructions we sent you via email`}</Typography>
                        <span>
                            <span>{`You can't see the email? Try to `}</span>
                            <Link onClick={() => onResendCode()}>
                                {'send another code'}
                            </Link>
                        </span>
                    </>
                )}
            </PublicFormLayout>
        </Layout>
    );
}
