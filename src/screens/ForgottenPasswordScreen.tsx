import { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useValidator, notEmptyValidator } from '../hooks/useValidator';
import { PublicFormLayout } from '../components/organism/PublicFormLayout';
import { Layout } from '../components/organism/Layout';

export function ForgottenPasswordScreen() {
    const { forgottenPassword } = useApi();

    const [username, setUsername] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [usernameDirty, usernameError, usernameMessage, usernameValidate] =
        useValidator(username, [notEmptyValidator]);

    const disabledButton = isLoading || username === '';

    const onSendCode = async () => {
        if (usernameValidate()) {
            setIsLoading(true);
            try {
                await forgottenPassword(username);
                console.log('The code was succesfully sent!');
                // toast({
                //     title: 'The code was succesfully sent!',
                //     status: 'success',
                //     duration: 5000
                // });
            } catch (e) {
                console.error('There was an error sending the new code', e);
                // toast({
                //     title: 'There was an error sending the new code. Try again',
                //     status: 'error',
                //     duration: 5000
                // });
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Layout isPublic>
            <PublicFormLayout title={'Reset password'}>
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {usernameError && usernameDirty ? (
                    <span className="text-error-600">{usernameMessage}</span>
                ) : (
                    <></>
                )}
                <button
                    type="submit"
                    disabled={disabledButton}
                    onClick={onSendCode}
                >
                    {isLoading ? 'Loading...' : 'Reset password'}
                </button>
            </PublicFormLayout>
        </Layout>
    );
}
