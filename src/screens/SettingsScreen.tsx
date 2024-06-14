import { useState } from 'react';
import { Layout } from '../components/organism/Layout';
import { FormField } from '../components/ui/FormField';
import { useApi } from '../hooks/useApi';
import { useAuth } from '../hooks/useAuth';
import { RadioGroup, Radio, Button } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useError } from '../hooks/useError';
import { useToast } from '../hooks/useToast';
import { useReactQuery } from '../hooks/useReactQuery';
import { Typography } from '../components/ui/Typography';

export function SettingsScreen() {
    const { updateConf } = useApi();
    const { user: loggedUser } = useAuth();
    const { showToast } = useToast();
    const { setError } = useError();
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
                        <RadioGroup
                            display={'flex'}
                            flexWrap={'wrap'}
                            flexDir={{ base: 'column', md: 'row' }}
                            gap={{ base: '24px', md: '32px' }}
                            value={currency}
                            onChange={(value) => setCurrency(value)}
                        >
                            <Radio value="euro">Euro</Radio>
                            <Radio value="dollar">Dollar</Radio>
                        </RadioGroup>
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
