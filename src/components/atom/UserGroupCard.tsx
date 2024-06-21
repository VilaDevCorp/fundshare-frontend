import { Badge, IconButton } from '@chakra-ui/react';
import { User } from '../../types/entities';
import { Typography } from '../ui/Typography';
import { Icon } from './Icon';
import { UserPhoto } from './UserPhoto';

export function UserGroupCard({
    user,
    onAdd,
    onRemove,
    isPending,
    isAdmin,
    loggedUserIsAdmin,
    noBorder
}: {
    user: User;
    onAdd?: (username: string) => void;
    onRemove?: (username: string) => void;
    isPending?: boolean;
    isAdmin?: boolean;
    loggedUserIsAdmin?: boolean;
    noBorder?: boolean;
}) {
    return (
        <article
            className={`flex bg-neutral-0 h-[64px] min-h-[64px] gap-3  
                px-4 md:py-2 items-center overflow-hidden w-full  
                ${loggedUserIsAdmin && !onAdd && !onRemove && '!pl-[calc(48px+16px+12px)]'}
                ${!noBorder && 'border-b first:border-t border-background-200'}`}
                
        >
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
            <UserPhoto />
            <Typography overflow={'hidden'} flexShrink={1} type="body">
                {user.username}
            </Typography>
            {isPending && (
                <Typography
                    minW={'fit-content'}
                    type="detail"
                    className="ml-auto"
                >
                    <Badge bg={'neutral.300'} color={'neutral.900'}>{'Pending'}</Badge>
                </Typography>
            )}
            {isAdmin && (
                <Typography
                    minW={'fit-content'}
                    flexShrink={0}
                    type="detail"
                    className="ml-auto"
                >
                    <Badge bg={'primary.300'} color={'neutral.0'} >{'Admin'}</Badge>
                </Typography>
            )}
        </article>
    );
}
