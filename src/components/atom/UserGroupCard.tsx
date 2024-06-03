import { IconButton } from '@chakra-ui/react';
import { User } from '../../types/entities';
import { Typography } from '../ui/Typography';
import { Icon } from './Icon';
import { UserPhoto } from './UserPhoto';

export function UserGroupCard({
    user,
    onRemove,
    isPending
}: {
    user: User;
    onRemove?: (username: string) => void;
    isPending?: boolean;
}) {
    return (
        <article
            className={`flex gap-3 items-center ${isPending && 'opacity-70'}`}
        >
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
            <Typography type="subtitle">{user.username}</Typography>
            {isPending && <span className="ml-auto">{'Pending'}</span>}
        </article>
    );
}
