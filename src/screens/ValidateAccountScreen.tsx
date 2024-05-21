import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { ApiError, ErrorCode } from '../types/types';
import StatusCode from 'status-code-enum';
import { PublicFormLayout } from '../components/organism/PublicFormLayout';
import { Layout } from '../components/organism/Layout';
import { BiCheck } from 'react-icons/bi';
import { IoMdClose } from 'react-icons/io';

export function ValidateAccountScreen() {
    const navigate = useNavigate();
    const { validateAccount, sendValidationCode } = useApi();
    const [step, setStep] = useState<number>(1);
    const { code, username } = useParams();
    const [codeError, setCodeError] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        onValidate();
    }, []);

    const onValidate = async () => {
        setIsLoading(true);
        try {
            await validateAccount(username!, code!);
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
            setStep(2);
            setIsLoading(false);
        }
    };
    const onResendCode = async () => {
        setIsLoading(true);
        try {
            await sendValidationCode(username!);
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
            setCodeError('An internal error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout isPublic>
            <PublicFormLayout title={'Email validation'}>
                {step === 1 ? (
                    <div className="ml-auto mr-auto mt-2 flex flex-col items-center gap-4">
                        <span className="mb-4">{'Validating...'}</span>
                    </div>
                ) : (
                    <>
                        {codeError ? (
                            <>
                                <div className="flex gap-2">
                                    <IoMdClose className="text-3xl text-error" />
                                    <span className="mb-4">{codeError}</span>
                                </div>
                                <span className="flex">
                                    {isLoading ? (
                                        <span>{'Sending...'}</span>
                                    ) : (
                                        <>
                                            <span>{`Try to`}</span>
                                            <a
                                                className="text-blue-500"
                                                onClick={() => onResendCode()}
                                            >
                                                {' send another code'}
                                            </a>
                                        </>
                                    )}
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="flex gap-2">
                                    <BiCheck className="text-3xl text-success" />
                                    <span className="mb-4">
                                        {'Your email has been validated'}
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
