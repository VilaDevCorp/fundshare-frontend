import React, { useEffect } from 'react';
import { PaymentType, User } from '../../types/entities';
import { Typography } from '../ui/Typography';
import { useGroup } from '../../hooks/useGroup';
import { useAuth } from '../../hooks/useAuth';
import { UserPaymentCard } from '../atom/UserPaymentCard';
import { Tooltip } from '@chakra-ui/react';
import { Icon } from '../atom/Icon';
import { getCurrencySymbol } from '../../utils/utilFunctions';

type UserAmounts = { [username: string]: string };

export interface PaymentAllocatorProps {
    amount: string;
    type: PaymentType;
    totalAmount: string;
    setTotalAmount: React.Dispatch<React.SetStateAction<string>>;
    selectedUsers: User[];
    setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
    userAmounts: UserAmounts;
    setUserAmounts: React.Dispatch<React.SetStateAction<UserAmounts>>;
}

export function PaymentAllocator(props: PaymentAllocatorProps) {
    const {
        amount,
        selectedUsers,
        setSelectedUsers,
        setTotalAmount,
        setUserAmounts,
        totalAmount,
        type,
        userAmounts
    } = props;

    const { group } = useGroup();
    const { user: loggedUser } = useAuth();

    const unassignedUsers = group?.users?.filter(
        (user) =>
            !selectedUsers.find(
                (selectedUser) => selectedUser.username === user.username
            )
    );

    const totalAssignedAmount = Object.values(userAmounts).reduce(
        (acc, curr) => acc + Number(curr),
        0
    );

    useEffect(() => {
        if (type === 'total') {
            setTotalAmount(amount);
        } else {
            setTotalAmount((Number(amount) * selectedUsers.length).toFixed(2));
            const newUserAmounts: UserAmounts = {};
            selectedUsers.forEach((selectedUser) => {
                newUserAmounts[selectedUser.username] = amount;
            });
            setUserAmounts(newUserAmounts);
        }
    }, [amount, type, selectedUsers.length]);

    useEffect(() => {
        if (type === 'total') {
            const newUserAmounts: UserAmounts = {};
            selectedUsers.forEach((selectedUser) => {
                newUserAmounts[selectedUser.username] = '0';
            });
            setUserAmounts(newUserAmounts);
        }
    }, [type]);

    const onAddUserToPayment = (user: User) => {
        setSelectedUsers([...selectedUsers, user]);
        setUserAmounts((prev) => {
            const newUserAmounts = { ...prev };
            newUserAmounts[user.username] = '0';
            return newUserAmounts;
        });
    };

    const onRemoveUserFromPayment = (user: User) => {
        setSelectedUsers(
            selectedUsers.filter((u) => u.username !== user.username)
        );
        setUserAmounts((prev) => {
            const newUserAmounts = { ...prev };
            delete newUserAmounts[user.username];
            return newUserAmounts;
        });
    };

    return (
        <div className="flex flex-col gap-4 mt-4 w-full">
            <Typography
                position={'sticky'}
                w={'100%'}
                display={'flex'}
                justifyContent={'center'}
                top={0}
                borderRadius={'2px'}
                py={'8px'}
                gap={2}
                zIndex={10}
                backdropFilter={'opacity(0.4) blur(4px)'}
                type="subtitle"
            >
                {!Object.values(userAmounts).some(
                    (amount) => Number(amount) > 0
                ) && (
                        <Tooltip
                            label={
                                'You have to pick at least one user with an amount over 0.'
                            }
                            bg={'error.700'}
                            color={'neutral.0'}
                            placement="bottom"
                        >
                            <span>
                                <Icon
                                    color={'error.500'}
                                    fontSize={'lg'}
                                    type={'warning'}
                                />
                            </span>
                        </Tooltip>
                    )}
                {type === 'divided' ? (
                    `Total: ${totalAmount} ${getCurrencySymbol(loggedUser?.conf?.currency)}`
                ) : Number(totalAmount) - totalAssignedAmount === 0 ? (
                    <span className="text-primary-500">{'Completed:'}</span>
                ) : Number(totalAmount) - totalAssignedAmount < 0 ? (
                    <span className="text-error-500">{'Overallocated:'}</span>
                ) : (
                    <span className="text-error-500">{'Underallocated:'}</span>
                )}
                {type === 'total' &&
                    `${Math.abs(Number(totalAmount) - totalAssignedAmount).toFixed(2)} ${getCurrencySymbol(loggedUser?.conf?.currency)} 
                        (${isNaN(
                        (Math.abs(
                            Number(totalAmount) - totalAssignedAmount
                        ) /
                            Number(totalAmount)) *
                        100
                    )
                        ? '100'
                        : (
                            (Math.abs(
                                Number(totalAmount) -
                                totalAssignedAmount
                            ) /
                                Number(totalAmount)) *
                            100
                        ).toFixed(2)
                    }%)`}
            </Typography>
            <div>
                {selectedUsers.length !== 0 ? (
                    <div className="mb-4 flex flex-col gap-8">
                        {selectedUsers.map((selectedUser) => {
                            const userAmount = userAmounts[
                                selectedUser.username
                            ]
                                ? userAmounts[selectedUser.username]
                                : 0;
                            const userPercentage = userAmounts[
                                selectedUser.username
                            ]
                                ? (Number(userAmounts[selectedUser.username]) /
                                    Number(totalAmount)) *
                                100
                                : 0;
                            return (
                                <UserPaymentCard
                                    user={selectedUser}
                                    key={selectedUser.username}
                                    onRemove={() =>
                                        onRemoveUserFromPayment(selectedUser)
                                    }
                                    amount={userAmount.toString()}
                                    setAmount={
                                        type === 'total'
                                            ? (amount) =>
                                                setUserAmounts((prev) => {
                                                    const newUserAmounts = {
                                                        ...prev
                                                    };
                                                    newUserAmounts[
                                                        selectedUser.username
                                                    ] = amount;

                                                    return newUserAmounts;
                                                })
                                            : undefined
                                    }
                                    percentage={(
                                        Math.round(userPercentage * 10) / 10
                                    ).toString()}
                                    setPercentage={
                                        type === 'total'
                                            ? (percentage) =>
                                                setUserAmounts((prev) => {
                                                    const newUserAmounts = {
                                                        ...prev
                                                    };
                                                    newUserAmounts[
                                                        selectedUser.username
                                                    ] = (
                                                        Number(amount) *
                                                        (Number(percentage) /
                                                            100)
                                                    ).toFixed(2);
                                                    return newUserAmounts;
                                                })
                                            : undefined
                                    }
                                />
                            );
                        })}
                    </div>
                ) : (
                    <></>
                )}

                {/*We do this to keep the logged user at the top of the list*/}
                {unassignedUsers && unassignedUsers.length !== 0 ? (
                    <div className="flex flex-col gap-2">
                        {unassignedUsers.filter(user => user.username === loggedUser?.username).length > 0 ?
                            <UserPaymentCard
                                user={loggedUser!}
                                key={loggedUser?.username}
                                onAdd={() =>
                                    onAddUserToPayment(loggedUser!)
                                }
                            /> : <></>}
                        {unassignedUsers.map((notSelectedUser) => (
                            notSelectedUser.username === loggedUser?.username ? <></> :
                                <UserPaymentCard
                                    user={notSelectedUser}
                                    key={notSelectedUser.username}
                                    onAdd={() =>
                                        onAddUserToPayment(notSelectedUser)
                                    }
                                />
                        ))}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
