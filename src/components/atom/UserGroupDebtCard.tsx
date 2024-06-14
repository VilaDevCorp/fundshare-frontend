import { useNavigate } from 'react-router-dom';
import { GroupDebt } from '../../types/entities';
import { Balance } from './Balance';
import { IconButton } from '@chakra-ui/react';
import { Icon } from './Icon';
import { useReactQuery } from '../../hooks/useReactQuery';

export function UserGroupDebtCard({ groupDebt }: { groupDebt: GroupDebt }) {
    const navigate = useNavigate();
    const { queryClient } = useReactQuery();

    return (
        <article
            className={`flex gap-3 py-2 border-b w-full justify-between items-center first:border-t overflow-hidden  border-background-200`}
        >
            <div className="flex gap-2 items-center">
                <span className="text-sm font-bold">
                    {groupDebt.group.name}
                </span>
                <IconButton
                    variant={'ghost'}
                    aria-label={'Go to group' + groupDebt.group.name}
                    icon={
                        <Icon fontSize={'28px !important'} type="arrowRight" />
                    }
                    onClick={() => {
                        navigate(`/groups/${groupDebt.group.id}`);
                        //We update the user info because they could have appear new operations in the group and the balance could be outdated
                        queryClient.invalidateQueries({
                            queryKey: ['getUserInfo']
                        });
                    }}
                />
            </div>
            <Balance balance={groupDebt.amount} />
        </article>
    );
}
