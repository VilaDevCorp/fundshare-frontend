import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import {
    useValidator,
    notEmptyValidator,
    minLength8Validator,
    upperLowerCaseValidator
} from '../hooks/useValidator';
import { ApiError, ErrorCode } from '../types/types';
import StatusCode from 'status-code-enum';
import { PublicFormLayout } from '../components/organism/PublicFormLayout';
import { Layout } from '../components/organism/Layout';
import { useToast } from '../hooks/useToast';
import { Icon } from '../components/atom/Icon';
import { Button, Input, Link } from '@chakra-ui/react';
import { FormField } from '../components/ui/FormField';

export function ResetPasswordScreen() {
    const navigate = useNavigate();
    const { resetPassword, forgottenPassword } = useApi();
    const [step, setStep] = useState<number>(1);
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

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
    const [codeError, setCodeError] = useState<string>('');
    const { code, username } = useParams();

    const { showToast } = useToast();

    const disabledButton =
        isLoading || passwordError || passwordMatchError !== '';

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

    useEffect(() => {
        passwordMatchValidate();
    }, [password, repeatPassword]);

    const onChangePassword = async () => {
        const passwordValid = passwordValidate();
        if (passwordValid) {
            setIsLoading(true);
            try {
                await resetPassword(username!, code!, password);
            } catch (e) {
                if (e instanceof ApiError) {
                    if (e.statusCode === StatusCode.ClientErrorConflict) {
                        setCodeError('The code has already been used');
                        return;
                    }
                    if (e.statusCode === StatusCode.ClientErrorGone) {
                        setCodeError('The code has expired');
                        return;
                    }
                    if (
                        e.statusCode === StatusCode.ClientErrorUnauthorized &&
                        e.code === ErrorCode.INCORRECT_VALIDATION_CODE
                    ) {
                        setCodeError('The code is invalid');
                        return;
                    }
                }
                setCodeError('An internal error occurred');
            } finally {
                setIsLoading(false);
                setStep(2);
            }
        }
    };
    const onSendCode = async () => {
        setIsLoading(true);
        try {
            await forgottenPassword(username!);
            showToast('success', 'The code was succesfully sent!');
        } catch (e) {
            setCodeError('An internal error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout isPublic>
            {step === 1 ? (
                <PublicFormLayout
                    onSubmit={() => onChangePassword()}
                    title={'Reset password'}
                >
                    <FormField
                        label="Password"
                        error={
                            passwordDirty && passwordError
                                ? passwordMessage
                                : ''
                        }
                        input={
                            <Input
                                ref={passwordInputRef}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        }
                    />
                    <FormField
                        label="Repeat password"
                        error={
                            passwordMatchDirty && passwordMatchError !== ''
                                ? passwordMatchError
                                : ''
                        }
                        input={
                            <Input
                                value={repeatPassword}
                                type="password"
                                onChange={(e) =>
                                    setRepeatPassword(e.target.value)
                                }
                            />
                        }
                    />
                    <Button
                        isDisabled={disabledButton}
                        type="submit"
                        isLoading={isLoading}
                    >
                        {'Change password'}
                    </Button>
                </PublicFormLayout>
            ) : (
                <PublicFormLayout title={'Reset password'}>
                    {codeError ? (
                        <div className="w-full flex justify-center items-center flex-col gap-6">
                            <div className="flex gap-2 items-center">
                                <Icon
                                    type={'close'}
                                    color={'error.500'}
                                    fontSize={'2xl'}
                                />
                                <span>{codeError}</span>
                            </div>
                            <span>
                                {`Try to `}
                                <Link onClick={() => onSendCode()}>
                                    {' send another code'}
                                </Link>
                            </span>
                        </div>
                    ) : (
                        <div className="w-full flex justify-center items-center flex-col gap-6">
                            <div className="flex gap-2 items-center">
                                <Icon
                                    type={'check'}
                                    color={'primary.500'}
                                    fontSize={'2xl'}
                                />
                                <span>{'Your password has been changed'}</span>
                            </div>
                            <span>
                                {`Now you can `}
                                <Link onClick={() => navigate('/login')}>
                                    {' sign in'}
                                </Link>
                            </span>
                        </div>
                    )}
                </PublicFormLayout>
            )}
        </Layout>
    );
}
