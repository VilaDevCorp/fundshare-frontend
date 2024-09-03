import {
    Icon as ChakraIcon,
    IconProps as ChakraIconProps
} from '@chakra-ui/react';
import {
    BiError,
    BiGroup,
    BiHome,
    BiMoney,
    BiPlus,
    BiUserPlus,
    BiWrench,
    BiShow,
    BiHide
} from 'react-icons/bi';
import { CgUserAdd, CgUserRemove } from 'react-icons/cg';
import { FaRegQuestionCircle, FaUser } from 'react-icons/fa';
import { FaAnglesRight } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';
import {
    IoArrowForwardCircle,
    IoChevronBack,
    IoChevronForward
} from 'react-icons/io5';
import { PiEmpty } from 'react-icons/pi';
import { TiTick, TiTimes } from 'react-icons/ti';

type IconType =
    | 'check'
    | 'close'
    | 'warning'
    | 'home'
    | 'group'
    | 'request'
    | 'settings'
    | 'logout'
    | 'chevron-left'
    | 'chevron-right'
    | 'user'
    | 'add'
    | 'money'
    | 'addUser'
    | 'deleteUser'
    | 'info'
    | 'doubleChevronRight'
    | 'arrowRight'
    | 'empty'
    | 'show'
    | 'hide';

interface IconProps extends ChakraIconProps {
    type: IconType;
}

const getIcon = (type: IconType) => {
    switch (type) {
        case 'home':
            return BiHome;
        case 'group':
            return BiGroup;
        case 'request':
            return BiUserPlus;
        case 'settings':
            return BiWrench;
        case 'logout':
            return FiLogOut;
        case 'chevron-left':
            return IoChevronBack;
        case 'chevron-right':
            return IoChevronForward;
        case 'user':
            return FaUser;
        case 'check':
            return TiTick;
        case 'close':
            return TiTimes;
        case 'warning':
            return BiError;
        case 'add':
            return BiPlus;
        case 'money':
            return BiMoney;
        case 'addUser':
            return CgUserAdd;
        case 'deleteUser':
            return CgUserRemove;
        case 'info':
            return FaRegQuestionCircle;
        case 'doubleChevronRight':
            return FaAnglesRight;
        case 'arrowRight':
            return IoArrowForwardCircle;
        case 'empty':
            return PiEmpty;
        case 'show':
            return BiShow;
        case 'hide':
            return BiHide;
    }
};

export function Icon(props: IconProps) {
    const { type, ...chakraIconProps } = props;
    return <ChakraIcon as={getIcon(type)} {...chakraIconProps} />;
}
