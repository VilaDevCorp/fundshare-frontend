import { useState, useEffect, useRef } from 'react';
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
import { FormField } from '../components/ui/FormField';
import {
    Button,
    Checkbox,
    HStack,
    Input,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import { Typography } from '../components/ui/Typography';
import { conf } from '../../conf';
import { useToast } from '../hooks/useToast';

export function RegisterScreen() {
    const { register } = useApi();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [serviceTermsAccepted, setServiceTermsAccepted] =
        useState<boolean>(false);

    const usernameInputRef = useRef<HTMLInputElement>(null);
    const [usernameDirty, usernameError, usernameMessage, usernameValidate] =
        useValidator(username, [notEmptyValidator]);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [emailDirty, emailError, emailMessage, emailValidate] = useValidator(
        email,
        [notEmptyValidator, emailValidator],
        emailInputRef
    );

    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [passwordDirty, passwordError, passwordMessage, passwordValidate] =
        useValidator(
            password,
            [notEmptyValidator, minLength8Validator, upperLowerCaseValidator],
            passwordInputRef
        );
    const [passwordMatchError, setPasswordMatchError] = useState<string>('');
    const [passwordMatchDirty, setPasswordMatchDirty] =
        useState<boolean>(false);
    const [serviceTermsAcceptedDirty, setServiceTermsAcceptedDirty] =
        useState<boolean>(false);
    const [serviceTermsAcceptedError, setServiceTermsAcceptedError] =
        useState<string>('');
    const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] =
        useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { setError } = useError();

    const { showToast } = useToast();

    const disabledButton =
        isLoading ||
        emailError ||
        passwordError ||
        passwordMatchError !== '' ||
        usernameError ||
        serviceTermsAcceptedError !== '';

    const passwordMatchValidate = () => {
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
                showToast('success', 'User succesfully registered');
                navigate('/login');
            } catch (e) {
                if (e instanceof ApiError) {
                    if (e.statusCode === StatusCode.ClientErrorConflict) {
                        if (e.code === ErrorCode.USERNAME_ALREADY_IN_USE) {
                            showToast(
                                'error',
                                'The username is already in use'
                            );
                            return;
                        }
                        if (e.code === ErrorCode.EMAIL_ALREADY_IN_USE) {
                            showToast('error', 'The email is already in use');
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
            <PublicFormLayout onSubmit={() => onRegister()} title={'Sign up'}>
                <FormField
                    label="Email"
                    error={emailError && emailDirty ? emailMessage : undefined}
                    input={
                        <Input
                            value={email}
                            ref={emailInputRef}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    }
                />
                <FormField
                    label="Username"
                    error={
                        usernameError && usernameDirty
                            ? usernameMessage
                            : undefined
                    }
                    input={
                        <Input
                            value={username}
                            ref={usernameInputRef}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    }
                />
                <FormField
                    label="Password"
                    error={
                        passwordError && passwordDirty
                            ? passwordMessage
                            : undefined
                    }
                    input={
                        <Input
                            type="password"
                            value={password}
                            ref={passwordInputRef}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    }
                />

                <FormField
                    label="Repeat password"
                    error={
                        passwordMatchDirty && passwordMatchError
                            ? passwordMatchError
                            : undefined
                    }
                    input={
                        <Input
                            type="password"
                            value={repeatPassword}
                            onBlur={() => setPasswordMatchDirty(true)}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                    }
                />

                <FormField
                    label=""
                    error={
                        serviceTermsAcceptedDirty && serviceTermsAcceptedError
                            ? serviceTermsAcceptedError
                            : undefined
                    }
                    input={
                        <HStack>
                            <Checkbox
                                checked={serviceTermsAccepted}
                                onChange={(e) =>
                                    setServiceTermsAccepted(e.target.checked)
                                }
                            >
                                {'I accept the '}
                            </Checkbox>
                            <Link
                                onClick={() => {
                                    setIsTermsOfServiceOpen(true);
                                }}
                            >
                                {'terms of service'}
                            </Link>
                        </HStack>
                    }
                />

                <Button
                    type="submit"
                    isDisabled={disabledButton}
                    isLoading={isLoading}
                >
                    {'Sign up'}
                </Button>
                <Modal
                    isOpen={isTermsOfServiceOpen}
                    onClose={() => setIsTermsOfServiceOpen(false)}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>
                            {'Terms of service'}
                            <ModalCloseButton />
                        </ModalHeader>
                        <ModalBody>
                            <Typography type="body">
                                {conf.termsOfService}
                            </Typography>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </PublicFormLayout>
        </Layout>
    );
}
