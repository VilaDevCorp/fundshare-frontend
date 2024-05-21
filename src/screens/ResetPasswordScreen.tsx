import { useState, useEffect } from 'react';
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
import { BiCheck } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

export function ResetPasswordScreen() {
    const navigate = useNavigate();
    const { resetPassword, forgottenPassword } = useApi();
    const [step, setStep] = useState<number>(1);
    const [password, setPassword] = useState<string>('');
    const [repeatPassword, setRepeatPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [passwordDirty, passwordError, passwordMessage, passwordValidate] =
        useValidator(password, [
            notEmptyValidator,
            minLength8Validator,
            upperLowerCaseValidator
        ]);
    const [passwordMatchError, setPasswordMatchError] = useState<string>('');
    const [passwordMatchDirty, setPasswordMatchDirty] =
        useState<boolean>(false);
    const [codeError, setCodeError] = useState<string>('');
    const { code, username } = useParams();

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

    const onValidate = async () => {
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
            console.log('The code was succesfully sent!');
            // toast({
            //     title: 'The code was succesfully sent!',
            //     status: 'success',
            //     duration: 5000
            // });
        } catch (e) {
            setCodeError('An internal error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout isPublic>
            <PublicFormLayout title={'Reset password'}>
                {step === 1 ? (
                    <>
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
                        <input
                            placeholder="Repeat password"
                            type="password"
                            value={repeatPassword}
                            onChange={(e) => setRepeatPassword(e.target.value)}
                        />
                        {passwordMatchDirty && passwordMatchError != '' ? (
                            <span className="text-error-600">
                                {passwordMatchError}
                            </span>
                        ) : (
                            <></>
                        )}
                        <button
                            disabled={disabledButton}
                            onClick={() => onValidate()}
                        >
                            {isLoading ? 'Loading...' : 'Change password'}
                        </button>
                    </>
                ) : (
                    <>
                        {codeError ? (
                            <>
                                <div className="flex gap-2">
                                    <IoMdClose className="text-3xl text-error" />
                                    <span className="mb-4">{codeError}</span>
                                </div>
                                <span className="flex">
                                    <span>{`Try to `}</span>
                                    <a
                                        className="text-blue-500"
                                        onClick={() => onSendCode()}
                                    >
                                        {' send another code'}
                                    </a>
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="flex gap-2">
                                    <BiCheck className="text-3xl text-success" />
                                    <span className="mb-4">
                                        {'Your password has been changed'}
                                    </span>
                                </div>
                                <span className="flex">
                                    <span>{`Now you can `}</span>
                                    <a
                                        className="text-blue-500"
                                        onClick={() => navigate('/login')}
                                    >
                                        {' sign in'}
                                    </a>
                                </span>
                            </>
                        )}
                    </>
                )}
            </PublicFormLayout>
        </Layout>
    );
}
