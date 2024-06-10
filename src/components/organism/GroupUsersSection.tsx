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
import { GroupDetailsSection } from '../atom/GroupDetailsSection';

export function GroupUsersSection() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { setError } = useError();
    const { showToast } = useToast();

    const { kickGroupUser } = useApi();
    const { queryClient } = useReactQuery();

    const { user: loggedUser } = useAuth();
    const { group } = useGroup();

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
            queryClient.invalidateQueries({ queryKey: ['groupPayments'] });
            queryClient.invalidateQueries({ queryKey: ['getUserInfo'] });
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
        <GroupDetailsSection title="Users">
            {loggedUser?.username === group?.createdBy?.username && (
                <Button
                    variant={'outline'}
                    leftIcon={<Icon type="addUser" />}
                    onClick={() => onOpen()}
                >
                    {'Add users'}
                </Button>
            )}
            <div className="flex flex-col overflow-auto bg-background-0">
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
                                loggedUser?.username ===
                                    group.createdBy?.username
                                    ? (username: string) => onKickUser(username)
                                    : undefined
                            }
                            isAdmin={
                                group.createdBy?.username === user.username
                            }
                        />
                    ))}
            </div>
            {isOpen && <AddUsersModal isOpen={isOpen} onClose={onClose} />}
        </GroupDetailsSection>
    );
}
