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
import { ConfirmationModal } from './ConfirmationModal';
import { useState } from 'react';
import { LoadingIndicator } from '../atom/LoadingIndicator';
import { useScreen } from '../../hooks/useScreen';

export function GroupUsersSection() {
    const {
        isOpen: isOpenAddUsers,
        onOpen: onOpenAddUsers,
        onClose: onCloseAddUsers
    } = useDisclosure();

    const {
        isOpen: isOpenConfirm,
        onOpen: onOpenConfirm,
        onClose: onCloseConfirm
    } = useDisclosure();

    const { setError } = useError();
    const { showToast } = useToast();

    const { kickGroupUser } = useApi();
    const { queryClient } = useReactQuery();

    const { user: loggedUser } = useAuth();
    const { group } = useGroup();

    const { isTablet } = useScreen();

    const [userToKick, setUserToKick] = useState<string | undefined>(undefined);

    const { mutate: onKickUser } = useMutation({
        mutationFn: async (username: string) => {
            if (group) {
                await kickGroupUser(group.id, username);
            }
        },
        onSuccess: () => {
            showToast('success', 'User kicked!');
            queryClient.invalidateQueries({ queryKey: ['group'] });
            queryClient.invalidateQueries({ queryKey: ['groupDebts'] });
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

    const { data: groupRequests, isLoading: isLoadingRequests } = useQuery({
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
        <GroupDetailsSection
            title="Users"
            topButton={
                loggedUser?.username === group?.createdBy?.username && (
                    <Button
                        variant={'outline'}
                        w={'fit-content'}
                        leftIcon={<Icon type="addUser" />}
                        onClick={() => onOpenAddUsers()}
                    >
                        {'Add users'}
                    </Button>
                )
            }
        >
            {!isTablet &&
                loggedUser?.username === group?.createdBy?.username && (
                    <Button
                        variant={'outline'}
                        w={'full'}
                        leftIcon={<Icon type="addUser" />}
                        onClick={() => onOpenAddUsers()}
                    >
                        {'Add users'}
                    </Button>
                )}
            <div className="flex flex-col overflow-auto h-full">
                {isLoadingRequests ? (
                    <LoadingIndicator />
                ) : (
                    <div className="flex flex-col overflow-auto bg-neutral-100 md:shadow-sm h-full md:mb-1">
                        {groupRequests?.content.map((request) => (
                            <UserGroupCard
                                key={request.id}
                                user={request.user}
                                onRemove={
                                    loggedUser?.username ===
                                    group?.createdBy?.username
                                        ? () => onRemoveRequest(request.id)
                                        : undefined
                                }
                                isPending
                            />
                        ))}
                        {group?.users &&
                            group?.users?.map((user) => (
                                <UserGroupCard
                                    key={user.username}
                                    user={user}
                                    onRemove={
                                        group?.createdBy?.username !==
                                            user.username &&
                                        loggedUser?.username ===
                                            group?.createdBy?.username
                                            ? () => {
                                                  setUserToKick(user.username);
                                                  onOpenConfirm();
                                              }
                                            : undefined
                                    }
                                    loggedUserIsAdmin={
                                        group?.createdBy?.username ===
                                        loggedUser?.username
                                    }
                                    isAdmin={
                                        group?.createdBy?.username ===
                                        user.username
                                    }
                                />
                            ))}
                    </div>
                )}
            </div>
            {isOpenAddUsers && (
                <AddUsersModal
                    isOpen={isOpenAddUsers}
                    onClose={onCloseAddUsers}
                />
            )}
            {isOpenConfirm && (
                <ConfirmationModal
                    isOpen={isOpenConfirm}
                    title="Kick user"
                    message="Are you sure you want to kick this user? 
                    (they will be removed from the payments and the debts will be recalculated.)"
                    onConfirm={() => {
                        userToKick && onKickUser(userToKick);
                        setUserToKick(undefined);
                    }}
                    onClose={onCloseConfirm}
                />
            )}
        </GroupDetailsSection>
    );
}
