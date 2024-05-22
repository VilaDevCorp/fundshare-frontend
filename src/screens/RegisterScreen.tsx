import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import {
    emailValidator,
    minLength8Validator,
    notEmptyValidator,
    upperLowerCaseValidator,
    useValidator
} from '../hooks/useValidator';
import { ApiError, ErrorCode } from '../types/types';
import StatusCode from 'status-code-enum';
import { useNavigate } from 'react-router-dom';
import { PublicFormLayout } from '../components/organism/PublicFormLayout';
import { Layout } from '../components/organism/Layout';
import { useError } from '../hooks/useError';

export function RegisterScreen() {
    const { register } = useApi();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [serviceTermsAccepted, setServiceTermsAccepted] =
        useState<boolean>(false);

    const [usernameDirty, usernameError, usernameMessage, usernameValidate] =
        useValidator(username, [notEmptyValidator]);
    const [emailDirty, emailError, emailMessage, emailValidate] = useValidator(
        email,
        [notEmptyValidator, emailValidator]
    );
    const [passwordDirty, passwordError, passwordMessage, passwordValidate] =
        useValidator(password, [
            notEmptyValidator,
            minLength8Validator,
            upperLowerCaseValidator
        ]);
    const [passwordMatchError, setPasswordMatchError] = useState<string>('');
    const [passwordMatchDirty, setPasswordMatchDirty] =
        useState<boolean>(false);
    const [serviceTermsAcceptedDirty, setServiceTermsAcceptedDirty] =
        useState<boolean>(false);
    const [serviceTermsAcceptedError, setServiceTermsAcceptedError] =
        useState<string>('');
    const [, setIsTermsOfServiceOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { setError } = useError();

    const disabledButton =
        isLoading ||
        emailError ||
        passwordError ||
        passwordMatchError !== '' ||
        usernameError ||
        serviceTermsAcceptedError !== '';

    const passwordMatchValidate = () => {
        if (!passwordMatchDirty && (password || repeatPassword)) {
            setPasswordMatchDirty(true);
        }
        if (password === repeatPassword) {
            setPasswordMatchError('');
            return true;
        } else {
            setPasswordMatchError('The passwords do not match');
            return false;
        }
    };

    const serviceTermsAcceptedValidate = () => {
        if (!serviceTermsAcceptedDirty) {
            setServiceTermsAcceptedDirty(true);
        } else {
            if (serviceTermsAccepted) {
                setServiceTermsAcceptedError('');
                return true;
            } else {
                setServiceTermsAcceptedError(
                    'You must accepte the terms of service'
                );
                return false;
            }
        }
    };

    useEffect(() => {
        passwordMatchValidate();
    }, [password, repeatPassword]);

    useEffect(() => {
        serviceTermsAcceptedValidate();
    }, [serviceTermsAccepted]);

    const onRegister = async () => {
        const usernameValid = usernameValidate();
        const emailValid = emailValidate();
        const passwordValid = passwordValidate();
        const passwordMatch = passwordMatchValidate();
        const serviceTermsAccepted = serviceTermsAcceptedValidate();
        if (
            usernameValid &&
            emailValid &&
            passwordValid &&
            passwordMatch &&
            serviceTermsAccepted
        ) {
            setIsLoading(true);
            try {
                await register({ username, email, password });
                console.log('User succesfully registered');
                // toast({
                //     title: 'User succesfully registered',
                //     status: 'success',
                //     duration: 5000,
                // })
                navigate('/login');
            } catch (e) {
                if (e instanceof ApiError) {
                    if (e.statusCode === StatusCode.ClientErrorConflict) {
                        if (e.code === ErrorCode.USERNAME_ALREADY_IN_USE) {
                            console.log('The username is already in use');
                            // toast({
                            //     title: 'The username is already in use',
                            //     status: 'error',
                            //     duration: 5000,
                            // })
                            return;
                        }
                        if (e.code === ErrorCode.EMAIL_ALREADY_IN_USE) {
                            console.log('The email is already in use');
                            // toast({
                            //     title: 'The email is already in use',
                            //     status: 'error',
                            //     duration: 5000,
                            // })
                            return;
                        }
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
            <PublicFormLayout title={'Sign up'}>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && emailDirty ? (
                    <span className="text-error-600">{emailMessage}</span>
                ) : (
                    <></>
                )}

                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {usernameDirty && usernameError ? (
                    <span className="text-error-600">{usernameMessage}</span>
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
                    <span className="text-error-600">{passwordMessage}</span>
                ) : (
                    <></>
                )}
                <input
                    placeholder="Repeat password"
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
                {passwordMatchDirty && passwordMatchError != '' ? (
                    <span className="text-error-600">{passwordMatchError}</span>
                ) : (
                    <></>
                )}
                <label className="flex gap-2 items-center">
                    <input
                        type="checkbox"
                        onChange={(e) =>
                            setServiceTermsAccepted(e.target.checked)
                        }
                    ></input>
                    {'I accept the '}
                    <a onClick={() => setIsTermsOfServiceOpen(true)}>
                        {'terms of service'}
                    </a>
                </label>
                {serviceTermsAcceptedDirty &&
                serviceTermsAcceptedError != '' ? (
                    <span className="text-error-600">
                        {serviceTermsAcceptedError}
                    </span>
                ) : (
                    <></>
                )}
                <button disabled={disabledButton} onClick={onRegister}>
                    {isLoading ? 'Loading...' : 'Sign up'}
                </button>

                {/* <Modal isOpen={isTermsOfServiceOpen} onClose={() => setIsTermsOfServiceOpen(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>{'Terms of service'}</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Typography mode='body'>{conf.termsOfService}</Typography>
                        </ModalBody>
                    </ModalContent>
                </Modal> */}
            </PublicFormLayout>
        </Layout>
    );
}
