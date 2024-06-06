import { Button } from '@chakra-ui/react';
import { Request } from '../../types/entities';
import { Typography } from '../ui/Typography';
import { Icon } from '../atom/Icon';
import { useApi } from '../../hooks/useApi';
import { useMutation } from '@tanstack/react-query';
import { useReactQuery } from '../../hooks/useReactQuery';
import { useToast } from '../../hooks/useToast';

export function RequestCard({ request }: { request: Request }) {
    const { respondRequest } = useApi();
    const { queryClient } = useReactQuery();
    const { showToast } = useToast();

    const { mutate: onAcceptRequest, isPending: isLoadingAccept } = useMutation(
        {
            mutationFn: () => respondRequest(request.id, true),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['requests'] });
            },
            onError: () => {
                showToast('error', 'There was an error accepting the request');
            }
        }
    );

    const { mutate: onDeclineRequest, isPending: isLoadingDecline } =
        useMutation({
            mutationFn: () => respondRequest(request.id, false),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['requests'] });
            },
            onError: () => {
                showToast('error', 'There was an error declining the request');
            }
        });

    return (
        <article className="flex flex-col sm:flex-row justify-between w-full px-4 py-2 gap-3 bg-background-0 rounded-[2px] shadow-md border-2 border-transparent">
            <Typography flexShrink={1} type="body">
                <b>{request.group.createdBy?.username}</b>
                {` invited you to join `}
                <b>{request.group?.name}</b>
                {`. Do you want to join?`}
            </Typography>
            <div className="flex  flex-row sm:flex-col justify-between gap-3 items-center">
                <Button
                    w={'100%'}
                    maxW={36}
                    isDisabled={isLoadingAccept || isLoadingDecline}
                    isLoading={isLoadingAccept}
                    onClick={() => onAcceptRequest()}
                    leftIcon={<Icon type="check" />}
                >
                    {'Accept'}
                </Button>
                <Button
                    w={'100%'}
                    maxW={36}
                    isLoading={isLoadingDecline}
                    isDisabled={isLoadingAccept || isLoadingDecline}
                    variant={'solid_error'}
                    onClick={() => onDeclineRequest()}
                    leftIcon={<Icon type="close" />}
                >
                    {'Decline'}{' '}
                </Button>
            </div>
        </article>
    );
}
