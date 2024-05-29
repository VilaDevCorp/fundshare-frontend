import { useRef, useState } from 'react';
import { useApi } from '../hooks/useApi';
import { useValidator, notEmptyValidator } from '../hooks/useValidator';
import { PublicFormLayout } from '../components/organism/PublicFormLayout';
import { Layout } from '../components/organism/Layout';
import { FormField } from '../components/ui/FormField';
import { Button, Input } from '@chakra-ui/react';
import { useToast } from '../hooks/useToast';

export function ForgottenPasswordScreen() {
    const { forgottenPassword } = useApi();

    const [username, setUsername] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const usernameInputRef = useRef<HTMLInputElement>(null);
    const [usernameDirty, usernameError, usernameMessage, usernameValidate] =
        useValidator(username, [notEmptyValidator], usernameInputRef);

    const disabledButton = isLoading || usernameError;

    const { showToast } = useToast();

    const onSendCode = async () => {
        if (usernameValidate()) {
            setIsLoading(true);
            try {
                await forgottenPassword(username);
                showToast('success', 'The code was succesfully sent!');
            } catch (e) {
                showToast('error', 'There was an error sending the new code');
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Layout isPublic>
            <PublicFormLayout onSubmit={onSendCode} title={'Reset password'}>
                <FormField
                    label="Username"
                    input={
                        <Input
                            ref={usernameInputRef}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    }
                    error={
                        usernameDirty && usernameError ? usernameMessage : ''
                    }
                />
                <Button
                    isDisabled={disabledButton}
                    isLoading={isLoading}
                    type="submit"
                >
                    {'Reset password'}
                </Button>
            </PublicFormLayout>
        </Layout>
    );
}
