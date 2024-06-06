import {
    Icon as ChakraIcon,
    IconProps as ChakraIconProps
} from '@chakra-ui/react';
import { BiError, BiGroup, BiHome, BiMoney, BiPlus } from 'react-icons/bi';
import { CgUserAdd, CgUserRemove } from 'react-icons/cg';
import { CiSettings } from 'react-icons/ci';
import { FaRegQuestionCircle, FaUser } from 'react-icons/fa';
import { FaAnglesRight } from 'react-icons/fa6';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
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
    | 'doubleChevronRight';

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
            return FaRegQuestionCircle;
        case 'settings':
            return CiSettings;
        case 'logout':
            return MdLogout;
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
    }
};

export function Icon(props: IconProps) {
    const { type, ...chakraIconProps } = props;
    return <ChakraIcon as={getIcon(type)} {...chakraIconProps} />;
}
