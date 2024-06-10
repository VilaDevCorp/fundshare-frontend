import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../atom/Icon';
import { useReactQuery } from '../../hooks/useReactQuery';

interface NavItem {
    path: string;
    icon?: React.ReactNode;
}

const navItems: NavItem[] = [
    {
        path: '/',
        icon: <Icon type="home" />
    },
    {
        path: '/groups',
        icon: <Icon type="group" />
    },
    {
        path: '/requests',
        icon: <Icon type="request" />
    },
    {
        path: '/settings',
        icon: <Icon type="settings" />
    }
];

export function BottomNav() {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { queryClient } = useReactQuery();

    return (
        <nav
            className="w-full h-16 sticky bottom-0 flex justify-between px-6 py-3 gap-6 
        bg-background-0"
        >
            {navItems.map((item) => (
                <a
                    onClick={() => {
                        navigate(item.path);
                        //We update the user info because they could have appear new operations in the group and the balance could be outdated
                        queryClient.invalidateQueries({
                            queryKey: ['getUserInfo']
                        });
                    }}
                    key={item.path}
                    className={`flex text-3xl justify-center items-center w-10 h-10 ${pathname === item.path ? 'text-primary-500 text-4xl' : ''}`}
                >
                    {item.icon}
                </a>
            ))}
        </nav>
    );
}
