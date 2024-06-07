import { useNavigate } from 'react-router-dom';
import { GroupDebt } from '../../types/entities';
import { Balance } from './Balance';
import { UserPhoto } from './UserPhoto';

export function UserGroupDebtCard({ groupDebt }: { groupDebt: GroupDebt }) {
    const navigate = useNavigate();

    return (
        <article
            className={`flex gap-3 py-2 border-b w-full justify-between items-center first:border-t  border-background-200 cursor-pointer hover:bg-background-100 transition-all px-6`}
            onClick={() => navigate(`/group/${groupDebt.group.id}`)}
        >
            <div className="flex gap-2 items-center">
                <UserPhoto />
                <span className="text-sm font-bold">
                    {groupDebt.group.name}
                </span>
            </div>
            <Balance balance={groupDebt.amount} />
        </article>
    );
}
