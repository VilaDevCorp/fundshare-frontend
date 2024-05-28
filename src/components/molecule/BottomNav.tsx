import { Icon } from '@chakra-ui/react';
import React from 'react';
import { BiHome, BiGroup } from 'react-icons/bi';
import { CiSettings } from 'react-icons/ci';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItem {
    path: string;
    icon?: React.ReactNode;
}

const navItems: NavItem[] = [
    {
        path: '/',
        icon: <Icon as={BiHome} />
    },
    {
        path: '/groups',
        icon: <Icon as={BiGroup} />
    },
    {
        path: '/requests',
        icon: <Icon as={FaRegQuestionCircle} />
    },
    {
        path: '/settings',
        icon: <Icon as={CiSettings} />
    }
];

export function BottomNav() {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <nav className="w-full flex justify-between px-6 py-3 gap-6 bg-background-0">
            {navItems.map((item) => (
                <a
                    onClick={() => navigate(item.path)}
                    key={item.path}
                    className={`flex text-3xl justify-center items-center w-10 h-10 ${pathname === item.path ? 'text-primary-500 text-4xl' : ''}`}
                >
                    {item.icon}
                </a>
            ))}
        </nav>
    );
}
