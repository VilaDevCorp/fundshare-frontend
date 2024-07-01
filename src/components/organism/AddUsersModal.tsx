import {
    Button,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { useCrud } from '../../hooks/useCrud';
import { CreateRequestForm, Request, User } from '../../types/entities';
import { useToast } from '../../hooks/useToast';
import { useError } from '../../hooks/useError';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useReactQuery } from '../../hooks/useReactQuery';
import { GroupContext } from '../../providers/GroupProvider';
import { Icon } from '../atom/Icon';
import { UserGroupCard } from '../atom/UserGroupCard';
import { ApiError, ErrorCode } from '../../types/types';
import StatusCode from 'status-code-enum';
import { Typography } from '../ui/Typography';
import { NoElementsMessage } from '../atom/NoElementsMessage';
import { LoadingIndicator } from '../atom/LoadingIndicator';
import { useScreen } from '../../hooks/useScreen';
import { useNavigate } from 'react-router-dom';

export function AddUsersModal({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { queryClient } = useReactQuery();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const { setError } = useError(navigate);

    const { isTablet } = useScreen();

    const { create: createReq } = useCrud<Request[]>('request');
    const { get: getUser, search: searchRelatedUsers } = useCrud<User>('user');
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const { group } = useContext(GroupContext);

    const [username, setUsername] = useState('');

    const createRequest = async () => {
        await createReq({
            usernames: selectedUsers.map((user) => user.username),
            groupId: group?.id
        } as CreateRequestForm);
    };

    const { data: relatedUsers, isLoading: isLoadingUsers } = useQuery({
        queryKey: ['relatedUsers'],
        queryFn: async () => {
            const result = await searchRelatedUsers(0, null, {
                groupId: group!.id
            });
            return result.content;
        }
    });

    const onAddUserByUsername = async (username: string) => {
        try {
            const user = await getUser(username);
            if (
                !group?.users ||
                !group?.users.find((u) => u.username === user.username)
            ) {
                if (selectedUsers.find((u) => u.username === user.username)) {
                    showToast('error', 'User already selected');
                    return;
                }
                setSelectedUsers([...selectedUsers, user]);
                setUsername('');
            } else {
                showToast('error', 'User already in group');
            }
        } catch (e) {
            if (e instanceof ApiError) {
                if (e.statusCode === StatusCode.ClientErrorNotFound) {
                    showToast('error', 'User not found');
                    return;
                }
                if (
                    e.statusCode === StatusCode.ClientErrorForbidden &&
                    e.code === ErrorCode.NOT_VALIDATED_ACCOUNT
                ) {
                    showToast('error', 'User account not validated');
                    return;
                }
            }
            if (e instanceof Error) {
                setError(e);
            }
        }
    };

    const { mutate: onCreateRequest, isPending: isLoadingInvitingUsers } =
        useMutation({
            mutationFn: createRequest,

            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['groupRequests'] });
                showToast('success', 'Users invited');
                onClose();
            },
            onError: (e) => {
                if (e instanceof Error) {
                    setError(e);
                }
            }
        });

    const isDisabled = selectedUsers.length <= 0 || isLoadingInvitingUsers;

    const filteredRelatedUsers = relatedUsers?.filter(
        (user) =>
            !selectedUsers.find(
                (selectedUser) => selectedUser.username === user.username
            )
    );

    return (
        isOpen && (
            <Modal isOpen={isOpen} onClose={onClose} size={'md'}>
                <ModalOverlay />
                <ModalContent px={0}>
                    <ModalHeader px={'24px'}>
                        {'Add users'}
                        <ModalCloseButton />
                    </ModalHeader>
                    <div className="flex flex-col h-full overflow-auto">
                        <ModalBody
                            display={'flex'}
                            flexDir={'column'}
                            gap={'24px'}
                            pb={'12px'}
                            px={'24px'}
                        >
                            <div className="flex flex-col gap-2">
                                <Typography
                                    fontWeight={'normal'}
                                    type={'subtitle'}
                                >
                                    {'Selected users'}
                                </Typography>
                                <div className="">
                                    {selectedUsers.length > 0 ? (
                                        selectedUsers.map((user) => (
                                            <UserGroupCard
                                                key={user.id}
                                                user={user}
                                                onRemove={(
                                                    username: string
                                                ) => {
                                                    setSelectedUsers(
                                                        selectedUsers.filter(
                                                            (u) =>
                                                                u.username !==
                                                                username
                                                        )
                                                    );
                                                }}
                                                noBorder
                                            />
                                        ))
                                    ) : (
                                        <NoElementsMessage
                                            label={'No users selected'}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Typography
                                    type={'subtitle'}
                                    fontWeight={'normal'}
                                >
                                    {'Add by username'}
                                </Typography>
                                <form
                                    className="flex gap-4"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        onAddUserByUsername(username);
                                    }}
                                >
                                    <Input
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                        placeholder={'Username'}
                                        value={username}
                                    />
                                    <IconButton
                                        type="submit"
                                        size={'square'}
                                        isDisabled={username.length <= 0}
                                        aria-label="Add user"
                                        icon={<Icon type="add" />}
                                    />
                                </form>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Typography
                                    type={'subtitle'}
                                    fontWeight={'normal'}
                                >
                                    {'Known users'}
                                </Typography>
                                <div className="flex flex-col min-h-[100px]">
                                    {isLoadingUsers ? (
                                        <LoadingIndicator />
                                    ) : filteredRelatedUsers?.length === 0 ? (
                                        <NoElementsMessage
                                            label={'No more known users to add'}
                                        />
                                    ) : (
                                        filteredRelatedUsers?.map(
                                            (filteredUser) => (
                                                <UserGroupCard
                                                    key={filteredUser.id}
                                                    user={filteredUser}
                                                    onAdd={(username: string) =>
                                                        onAddUserByUsername(
                                                            username
                                                        )
                                                    }
                                                />
                                            )
                                        )
                                    )}
                                </div>
                            </div>
                        </ModalBody>
                    </div>

                    <ModalFooter
                        position={'sticky'}
                        display={'flex'}
                        gap={4}
                        bottom={0}
                        px={'12px'}
                    >
                        {isTablet && (
                            <Button onClick={onClose} variant="outline">
                                Cancel
                            </Button>
                        )}
                        <Button
                            onClick={() => onCreateRequest()}
                            isDisabled={isDisabled}
                            isLoading={isLoadingInvitingUsers}
                            width={{ base: '100%', tablet: 'auto' }}
                        >
                            {'Invite'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    );
}
