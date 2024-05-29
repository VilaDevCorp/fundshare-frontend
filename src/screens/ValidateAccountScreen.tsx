import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { ApiError, ErrorCode } from '../types/types';
import StatusCode from 'status-code-enum';
import { PublicFormLayout } from '../components/organism/PublicFormLayout';
import { Layout } from '../components/organism/Layout';
import { useToast } from '../hooks/useToast';
import { CircularProgress, Link } from '@chakra-ui/react';
import { Icon } from '../components/atom/Icon';

export function ValidateAccountScreen() {
    const navigate = useNavigate();
    const { validateAccount, sendValidationCode } = useApi();
    const [step, setStep] = useState<number>(1);
    const { code, username } = useParams();
    const [codeError, setCodeError] = useState<string>('');

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { showToast } = useToast();

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
            showToast('success', 'The code was succesfully sent!');
        } catch (e) {
            if (e instanceof ApiError) {
                if (e.statusCode === StatusCode.ClientErrorConflict) {
                    showToast('error', 'The account is already validated');
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
                        <CircularProgress
                            size={'32px'}
                            isIndeterminate
                            color="primary.300"
                        />
                    </div>
                ) : (
                    <div className="w-full flex justify-center items-center flex-col gap-6">
                        {codeError ? (
                            <>
                                <div className="flex gap-2 items-center">
                                    <Icon
                                        type={'warning'}
                                        color={'error.500'}
                                        fontSize={'2xl'}
                                    />
                                    <span>{codeError}</span>
                                </div>
                                <span className="flex">
                                    {isLoading ? (
                                        <CircularProgress
                                            size={'32px'}
                                            isIndeterminate
                                            color="primary.300"
                                        />
                                    ) : (
                                        <>
                                            <span>
                                                {`Try to `}
                                                <Link
                                                    onClick={() =>
                                                        onResendCode()
                                                    }
                                                >
                                                    {' send another code'}
                                                </Link>
                                            </span>
                                        </>
                                    )}
                                </span>
                            </>
                        ) : (
                            <>
                                <div className="flex gap-2">
                                    <Icon
                                        type={'check'}
                                        fontSize={'2xl'}
                                        color={'primary.500'}
                                    />
                                    <span>
                                        {'Your email has been validated'}
                                    </span>
                                </div>
                                <span>
                                    {`Now you can `}
                                    <Link onClick={() => navigate('/login')}>
                                        {' sign in'}
                                    </Link>
                                </span>
                            </>
                        )}
                    </div>
                )}
            </PublicFormLayout>
        </Layout>
    );
}
