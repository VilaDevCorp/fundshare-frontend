import { Typography } from '../ui/Typography';
import { Button, useDisclosure } from '@chakra-ui/react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AddUsersModal } from './AddUsersModal';
import { useApi } from '../../hooks/useApi';
import { useError } from '../../hooks/useError';
import { useToast } from '../../hooks/useToast';
import { UserGroupCard } from '../atom/UserGroupCard';
import { useGroup } from '../../hooks/useGroup';
import { useCrud } from '../../hooks/useCrud';
import { Request } from '../../types/entities';
import { useReactQuery } from '../../hooks/useReactQuery';
import { Icon } from '../atom/Icon';
import { useAuth } from '../../hooks/useAuth';
import { useScreen } from '../../hooks/useScreen';

export function GroupUsersSection() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { setError } = useError();
    const { showToast } = useToast();

    const { kickGroupUser } = useApi();
    const { queryClient } = useReactQuery();

    const { isTablet } = useScreen();

    const { user: loggedUser } = useAuth();

    const group = useGroup();

    const { mutate: onKickUser } = useMutation({
        mutationFn: async (username: string) => {
            if (group) {
                await kickGroupUser(group.id, username);
            }
        },
        onSuccess: () => {
            showToast('success', 'User kicked!');
            queryClient.invalidateQueries({ queryKey: ['group'] });
            queryClient.invalidateQueries({ queryKey: ['groupRequests'] });
        },
        onError: (e) => {
            if (e instanceof Error) {
                setError(e);
            }
        }
    });

    const { search: searchReq, remove: removeRequest } =
        useCrud<Request>('request');

    const { data: groupRequests } = useQuery({
        queryKey: ['groupRequests'],
        enabled: !!group?.id,
        queryFn: () => searchReq(0, null, { groupId: group!.id })
    });

    const { mutate: onRemoveRequest } = useMutation({
        mutationFn: async (id: string) => {
            await removeRequest(id);
        },
        onSuccess: () => {
            showToast('success', 'Request removed!');
            queryClient.invalidateQueries({ queryKey: ['groupRequests'] });
        },
        onError: (e) => {
            if (e instanceof Error) {
                setError(e);
            }
        }
    });

    return (
        <section className="w-full flex flex-col gap-4 bg-background-0 py-4 px-6 rounded-[2px]">
            {isTablet &&<Typography type="subtitle">{'Users'}</Typography>}
            {loggedUser?.username === group?.createdBy?.username && (
                <Button
                    variant={'outline'}
                    leftIcon={<Icon type="addUser" />}
                    onClick={() => onOpen()}
                >
                    {'Add users'}
                </Button>
            )}
            {groupRequests?.content.map((request) => (
                <UserGroupCard
                    key={request.id}
                    user={request.user}
                    onRemove={
                        loggedUser?.username === group?.createdBy?.username
                            ? () => onRemoveRequest(request.id)
                            : undefined
                    }
                    isPending
                />
            ))}

            {group?.users &&
                group?.users.map((user) => (
                    <UserGroupCard
                        key={user.username}
                        user={user}
                        onRemove={
                            group.createdBy?.username !== user.username &&
                            loggedUser?.username === group.createdBy?.username
                                ? (username: string) => onKickUser(username)
                                : undefined
                        }
                        isAdmin={group.createdBy?.username === user.username}
                    />
                ))}
            {isOpen && <AddUsersModal isOpen={isOpen} onClose={onClose} />}
        </section>
    );
}
