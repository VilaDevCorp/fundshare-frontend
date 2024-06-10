import {
    Button,
    Input,
    InputGroup,
    InputRightAddon,
    NumberInput,
    NumberInputField,
    Radio,
    RadioGroup,
    Tooltip
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FormField } from '../ui/FormField';
import {
    notEmptyValidator,
    upperThanZeroValidator,
    useValidator
} from '../../hooks/useValidator';
import { useCrud } from '../../hooks/useCrud';
import {
    CreatePaymentForm,
    Payment,
    PaymentType,
    User
} from '../../types/entities';
import { useToast } from '../../hooks/useToast';
import { useError } from '../../hooks/useError';
import { useMutation } from '@tanstack/react-query';
import { FormModal } from '../ui/FormModal';
import { useReactQuery } from '../../hooks/useReactQuery';
import { useGroup } from '../../hooks/useGroup';
import { PaymentAllocator } from '../molecule/PaymentAllocator';
import { Icon } from '../atom/Icon';
import {
    calculateBaseCurrency,
    getCurrencySymbol
} from '../../utils/utilFunctions';
import { useAuth } from '../../hooks/useAuth';

export interface PaymentInfo {
    totalAmount: string;
    selectedUsers: User[];
    userAmounts: UserAmounts;
}
export type UserAmounts = { [username: string]: string };

export function AddPaymentModal({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [description, setDescription] = useState('');
    const descriptionInputRef = useRef<HTMLInputElement>(null);
    const [
        descriptionDirty,
        descriptionError,
        descriptionMessage,
        descriptionValidate
    ] = useValidator(description, [notEmptyValidator], descriptionInputRef);

    const [amount, setAmount] = useState<string>('0');
    const amountInputRef = useRef<HTMLInputElement>(null);
    const [amountDirty, amountError, amountMessage, amountValidate] =
        useValidator(
            amount,
            [notEmptyValidator, upperThanZeroValidator],
            amountInputRef
        );

    const [paymentType, setPaymentType] = useState<PaymentType>('total');

    const [totalAmount, setTotalAmount] = useState<string>('0');
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [userAmounts, setUserAmounts] = useState<UserAmounts>({});

    const { create } = useCrud<Payment>('payment');
    const { queryClient } = useReactQuery();
    const { showToast } = useToast();
    const { setError } = useError();

    const { group } = useGroup();

    const { user: loggedUser } = useAuth();

    const createPayment = async () => {
        if (
            descriptionValidate() &&
            amountValidate() &&
            Object.values(userAmounts).some((amount) => Number(amount) > 0)
        ) {
            await create({
                description,
                groupId: group!.id,
                payees: selectedUsers.map((user) => {
                    if (Number(userAmounts[user.username]) > 0) {
                        return {
                            amount: calculateBaseCurrency(
                                Number(userAmounts[user.username]),
                                loggedUser?.conf?.currency
                            ),
                            username: user.username
                        };
                    }
                })
            } as CreatePaymentForm);
        } else {
            showToast('error', 'There are errors in the form');
        }
    };

    const { mutate: onCreatePayment, isPending: isLoading } = useMutation({
        mutationFn: createPayment,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groupPayments'] });
            queryClient.invalidateQueries({ queryKey: ['groupDebts'] });
            queryClient.invalidateQueries({ queryKey: ['getUserInfo'] });
            showToast('success', 'Payment created!');
            onClose();
        },
        onError: (e) => {
            if (e instanceof Error) {
                setError(e);
            }
        }
    });

    const isDisabled =
        descriptionError ||
        Object.values(userAmounts).every((amount) => Number(amount) <= 0) ||
        isLoading;

    return (
        <FormModal
            isOpen={isOpen}
            title="Create payment"
            onClose={onClose}
            onSubmit={() => onCreatePayment()}
            size="lg"
            form={
                <>
                    <FormField
                        label="Description"
                        error={
                            descriptionDirty && descriptionError
                                ? descriptionMessage
                                : ''
                        }
                        input={
                            <Input
                                ref={descriptionInputRef}
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                        }
                    />
                    <FormField
                        label="Payment type"
                        input={
                            <RadioGroup
                                display={'flex'}
                                flexDirection={'column'}
                                gap={'16px'}
                                value={paymentType}
                                onChange={(value) =>
                                    setPaymentType(value as PaymentType)
                                }
                            >
                                <Radio value="total">
                                    Total amount
                                    <Tooltip
                                        label="Set the total amount of the payment and then adjust the percentages of each payee."
                                        placement="bottom"
                                    >
                                        <span>
                                            <Icon
                                                ml={'4px'}
                                                color={'primary.200'}
                                                type="info"
                                            />
                                        </span>
                                    </Tooltip>
                                </Radio>
                                <Radio value="divided">
                                    Amount per person
                                    <Tooltip
                                        label="Set an amount an pick the users that will receive that quantity."
                                        placement="bottom"
                                    >
                                        <span>
                                            <Icon
                                                ml={'4px'}
                                                color={'primary.200'}
                                                type="info"
                                            />
                                        </span>
                                    </Tooltip>
                                </Radio>
                            </RadioGroup>
                        }
                    />
                    <FormField
                        label="Amount"
                        error={amountDirty && amountError ? amountMessage : ''}
                        input={
                            <InputGroup>
                                <NumberInput
                                    w={120}
                                    value={amount ? amount : '0'}
                                    onChange={(value) =>
                                        setAmount(value ? value : '0')
                                    }
                                    min={0}
                                >
                                    <NumberInputField ref={amountInputRef} />
                                </NumberInput>
                                <InputRightAddon>
                                    {getCurrencySymbol(
                                        loggedUser?.conf?.currency
                                    )}
                                </InputRightAddon>
                            </InputGroup>
                        }
                    />
                    <PaymentAllocator
                        amount={amount}
                        type={paymentType}
                        selectedUsers={selectedUsers}
                        setSelectedUsers={setSelectedUsers}
                        totalAmount={totalAmount}
                        setTotalAmount={setTotalAmount}
                        userAmounts={userAmounts}
                        setUserAmounts={setUserAmounts}
                    />
                </>
            }
            buttons={
                <>
                    <Button onClick={onClose} variant="outline">
                        Cancel
                    </Button>
                    <Button
                        isLoading={isLoading}
                        isDisabled={isDisabled}
                        type="submit"
                        variant="solid"
                        width={{ base: '100%', tablet: 'auto' }}
                    >
                        Create
                    </Button>
                </>
            }
        />
    );
}
