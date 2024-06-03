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
import { useMutation } from '@tanstack/react-query';
import { useReactQuery } from '../../hooks/useReactQuery';
import { GroupContext } from '../../providers/GroupProvider';
import { Icon } from '../atom/Icon';
import { UserGroupCard } from '../atom/UserGroupCard';
import { ApiError } from '../../types/types';
import StatusCode from 'status-code-enum';

export function AddUsersModal({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { queryClient } = useReactQuery();
    const { showToast } = useToast();
    const { setError } = useError();

    const { create: createReq } =
        useCrud<Request[]>('request');
    const { get: getUser } = useCrud<User>('user');
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const group = useContext(GroupContext);

    const [username, setUsername] = useState('');

    const createRequest = async () => {
        await createReq({
            usernames: selectedUsers.map((user) => user.username),
            groupId: group?.id
        } as CreateRequestForm);
    };

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
            }
            if (e instanceof Error) {
                setError(e);
            }
        }
    };

    const { mutate: onCreateRequest, isPending: isLoading } = useMutation({
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

    const isDisabled = selectedUsers.length <= 0 || isLoading;

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
                            gap={'12px'}
                            pb={'12px'}
                            px={'24px'}
                        >
                            <div className="flex gap-4">
                                <Input
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    placeholder={'Username'}
                                    value={username}
                                />
                                <IconButton
                                    onClick={() =>
                                        onAddUserByUsername(username)
                                    }
                                    size={'square'}
                                    aria-label="Add user"
                                    icon={<Icon type="add" />}
                                />
                            </div>
                            {selectedUsers.map((user) => (
                                <UserGroupCard
                                    key={user.id}
                                    user={user}
                                    onRemove={(username: string) => {
                                        setSelectedUsers(
                                            selectedUsers.filter(
                                                (u) => u.username !== username
                                            )
                                        );
                                    }}
                                />
                            ))}
                        </ModalBody>
                    </div>

                    <ModalFooter position={'sticky'} bottom={0} px={'12px'}>
                        <Button
                            onClick={() => onCreateRequest()}
                            disabled={isDisabled}
                        >
                            {'Invite'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    );
}
