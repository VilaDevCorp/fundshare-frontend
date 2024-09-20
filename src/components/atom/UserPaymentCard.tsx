import {
    IconButton,
    InputGroup,
    InputRightAddon,
    NumberInput,
    NumberInputField,
    Slider,
    SliderFilledTrack,
    SliderMark,
    SliderThumb,
    SliderTrack
} from '@chakra-ui/react';
import { User } from '../../types/entities';
import { Typography } from '../ui/Typography';
import { Icon } from './Icon';
import { UserPhoto } from './UserPhoto';
import { getCurrencySymbol } from '../../utils/utilFunctions';
import { useAuth } from '../../hooks/useAuth';
import { useScreen } from '../../hooks/useScreen';

export function UserPaymentCard({
    user,
    onAdd,
    onRemove,
    amount,
    setAmount,
    percentage,
    setPercentage
}: {
    user: User;
    onAdd?: (username: string) => void;
    onRemove?: (username: string) => void;
    amount?: string;
    setAmount?: (amount: string) => void;
    percentage?: string;
    setPercentage?: (percentage: string) => void;
}) {
    const { user: loggedUser } = useAuth();
    const { isTablet } = useScreen();

    return (
        <article className="flex flex-col gap-4 w-full overflow-hidden">
            <div className={`flex gap-3 items-center`}>
                {onAdd && (
                    <IconButton
                        aria-label="Add user to group"
                        color={'primary.500'}
                        icon={<Icon type="addUser" />}
                        size={'square'}
                        variant={'ghost'}
                        onClick={() => onAdd(user.username)}
                    />
                )}
                {onRemove && (
                    <IconButton
                        aria-label="kick user from group"
                        color={'error.500'}
                        icon={<Icon type="deleteUser" />}
                        size={'square'}
                        variant={'ghost_error'}
                        onClick={() => onRemove(user.username)}
                    />
                )}
                {isTablet && <UserPhoto pictureUrl={user.pictureUrl} />}
                <Typography overflow={'hidden'} flexShrink={1} type="body">{user.username === loggedUser?.username ? 'Me' : user.username}</Typography>
                {setAmount ? (
                    <InputGroup justifyContent={'end'} ml={'auto'} w={'auto'}>
                        <NumberInput
                            w={'100px'}
                            value={amount}
                            precision={2}
                            onChange={(value) => setAmount(value)}
                            min={0}
                        >
                            <NumberInputField />
                        </NumberInput>
                        <InputRightAddon>
                            {getCurrencySymbol(loggedUser?.conf?.currency)}
                        </InputRightAddon>
                    </InputGroup>
                ) : (
                    amount !== undefined && (
                        <span className="ml-auto whitespace-nowrap">
                            {amount}{' '}
                            {getCurrencySymbol(loggedUser?.conf?.currency)}
                        </span>
                    )
                )}
            </div>
            {setAmount ? (
                <div className="px-6">
                    <Slider
                        value={Number(percentage)}
                        max={100}
                        focusThumbOnChange={false}
                        min={0}
                        step={0.5}
                        onChange={(e) => {
                            setPercentage && setPercentage(e.toFixed(2));
                        }}
                    >
                        <SliderMark
                            color={'primary.500'}
                            w={'40px'}
                            top={'20px'}
                            fontWeight={'bold'}
                            transform={'translateX(-50%)'}
                            display={'flex'}
                            justifyContent={'center'}
                            value={Math.min(
                                Number(Number(percentage).toFixed(2)),
                                100
                            )}
                        >
                            {isNaN(Number(percentage)) ? 0 : percentage}%
                        </SliderMark>
                        <SliderTrack>
                            <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                    </Slider>
                </div>
            ) : (
                <></>
            )}
        </article>
    );
}
