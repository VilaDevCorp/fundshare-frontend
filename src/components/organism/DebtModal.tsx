import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useApi } from '../../hooks/useApi';
import { UserPhoto } from '../atom/UserPhoto';
import { User } from '../../types/entities';
import { Balance } from '../atom/Balance';
import { UserGroupDebtCard } from '../atom/UserGroupDebtCard';
import { LoadingIndicator } from '../atom/LoadingIndicator';

export function DebtModal({
    user,
    onClose
}: {
    user?: User;
    onClose: () => void;
}) {
    const { getDebtWithUser } = useApi();

    const { data: userGroupDebts, isLoading } = useQuery({
        queryKey: ['userGroupDebts'],
        enabled: !!user,
        queryFn: async () => {
            const result = await getDebtWithUser(user!.username);
            return result;
        }
    });

    const totalAmount = userGroupDebts?.reduce(
        (acc, user) => acc + user.amount,
        0
    );

    return (
        user !== undefined && (
            <Modal isOpen={user !== undefined} onClose={onClose} size={'md'}>
                <ModalOverlay />
                <ModalContent px={0}>
                    <ModalHeader px={'24px'}>
                        {'Debt details'}
                        <ModalCloseButton />
                    </ModalHeader>
                    <div className="flex flex-col h-full overflow-auto">
                        <ModalBody
                            display={'flex'}
                            flexDir={'column'}
                            gap={'16px'}
                            pb={'12px'}
                            px={'24px'}
                        >
                            {isLoading ? (
                                <LoadingIndicator />
                            ) : (
                                <>
                                    <div className="flex flex-col gap-1 ml-auto mr-auto justify-center items-center overflow-hidden w-full ">
                                        <UserPhoto />
                                        <span className="font-bold text-lg w-full text-wrap">
                                            {user.username}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-6 w-full">
                                        <div className="w-full flex justify-between gap-4 overflow-hidden">
                                            <span className="font-bold text-xl">
                                                {'Total'}
                                            </span>
                                            <Balance
                                                balance={
                                                    totalAmount !== undefined
                                                        ? totalAmount
                                                        : 0
                                                }
                                            />
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            {userGroupDebts?.map(
                                                (userGroupDebt) => (
                                                    <UserGroupDebtCard
                                                        key={
                                                            userGroupDebt.group
                                                                .id
                                                        }
                                                        groupDebt={
                                                            userGroupDebt
                                                        }
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </ModalBody>
                    </div>
                </ModalContent>
            </Modal>
        )
    );
}
