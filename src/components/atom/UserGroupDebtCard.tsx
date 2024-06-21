import { useNavigate } from 'react-router-dom';
import { GroupDebt } from '../../types/entities';
import { Balance } from './Balance';
import { Link } from '@chakra-ui/react';
import { useReactQuery } from '../../hooks/useReactQuery';

export function UserGroupDebtCard({ groupDebt }: { groupDebt: GroupDebt }) {
    const navigate = useNavigate();
    const { queryClient } = useReactQuery();

    return (
        <article
            className={`flex gap-3 py-2 border-b w-full justify-between items-center first:border-t overflow-hidden  border-background-200`}
        >
            <div className="flex gap-2 items-center">
                <Link
                    className=" font-bold"
                    onClick={() => {
                        navigate(`/groups/${groupDebt.group.id}`);
                        //We update the user info because they could have appear new operations in the group and the balance could be outdated
                        queryClient.invalidateQueries({
                            queryKey: ['getUserInfo']
                        });
                    }}
                >
                    {groupDebt.group.name}
                </Link>
            </div>
            <Balance balance={groupDebt.amount} />
        </article>
    );
}
