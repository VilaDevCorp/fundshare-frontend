import { HStack, Image } from '@chakra-ui/react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '/logo.svg';
import { Icon } from './Icon';

interface NavItem {
    label: string;
    path: string;
    icon?: React.ReactNode;
}

const navItems: NavItem[] = [
    {
        label: 'Home',
        path: '/',
        icon: <Icon type="home" />
    },
    {
        label: 'Groups',
        path: '/groups',
        icon: <Icon type="group" />
    },
    {
        label: 'Requests',
        path: '/requests',
        icon: <Icon type="request" />
    },
    {
        label: 'Settings',
        path: '/settings',
        icon: <Icon type="settings" />
    }
];

export function TopNav() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location.pathname.split('/')[1]);

    return (
        <HStack width={'100%'} height={'100%'} gap={'24px'}>
            <Image src={logo} alt="Logo" height={'100%'} />
            <nav className="flex gap-6">
                {navItems.map((item) => (
                    <a
                        className={`gap-2 flex items-center hover:spfont-bold cursor-pointer group  ${location.pathname.split('/')[1] === item.path.split('/')[1] ? 'text-primary-500' : ' transition-all ease-out hover:scale-105'} `}
                        key={item.label}
                        onClick={() => navigate(item.path)}
                    >
                        <span className="text-2xl flex justify-center ">
                            {item.icon}
                        </span>
                        <span
                            className={`text-xl font-light transition-all  ${location.pathname.split('/')[1] === item.path.split('/')[1] ? '!font-bold' : ''}`}
                        >
                            {item.label}
                        </span>
                    </a>
                ))}
            </nav>
        </HStack>
    );
}
