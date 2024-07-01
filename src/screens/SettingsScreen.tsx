import { useState } from 'react';
import { Layout } from '../components/organism/Layout';
import { FormField } from '../components/ui/FormField';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../hooks/useAuth';
import { Button } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useError } from '../hooks/useError';
import { useToast } from '../hooks/useToast';
import { useReactQuery } from '../hooks/useReactQuery';
import { Typography } from '../components/ui/Typography';
import { CurrencySelector } from '../components/molecule/CurrencySelector';
import { useNavigate } from 'react-router-dom';

export function SettingsScreen() {
    const { updateConf } = useApi();
    const { user: loggedUser } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const { setError } = useError(navigate);
    const { queryClient } = useReactQuery();

    const [currency, setCurrency] = useState(
        loggedUser?.conf?.currency || 'euro'
    );

    const { mutate: onSaveConf, isPending } = useMutation({
        mutationFn: async () => {
            if (currency) {
                await updateConf({
                    currency
                });
            }
        },
        onSuccess: () => {
            showToast('success', 'Settings updated!');
            queryClient.invalidateQueries({ queryKey: ['getUserInfo'] });
        },
        onError: (e) => {
            if (e instanceof Error) {
                setError(e);
            }
        }
    });

    return (
        <Layout>
            <div className="flex w-full flex-col gap-4 max-w-[500px] ml-auto mr-auto">
                <Typography type="title">{'Settings'}</Typography>
                <FormField
                    label="Currency"
                    input={
                        <CurrencySelector
                            currency={currency}
                            setCurrency={setCurrency}
                        />
                    }
                />
                <Button
                    mt={'24px'}
                    onClick={() => onSaveConf()}
                    isLoading={isPending}
                    isDisabled={isPending}
                >
                    {'Save'}
                </Button>
            </div>
        </Layout>
    );
}
