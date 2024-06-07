import { useAuth } from '../../hooks/useAuth';
import { Debt } from '../../types/entities';
import { Balance } from './Balance';
import { UserPhoto } from './UserPhoto';

export function UserDebtCard({
    debt,
    onClick
}: {
    debt: Debt;
    onClick?: () => void;
}) {
    const { user } = useAuth();

    const isPayer = debt.payer.username === user?.username;

    return (
        <article
            className={`flex gap-3 border-b py-4 px-6 w-full justify-between items-center first:border-t  border-background-200 cursor-pointer hover:bg-background-100 transition-all `}
            onClick={onClick}
        >
            <div className="flex gap-2 items-center">
                <UserPhoto />
                <span className="text-sm font-bold">
                    {isPayer ? debt.payee.username : debt.payer.username}
                </span>
            </div>
            <Balance balance={isPayer ? debt.amount : -debt.amount} />
        </article>
    );
}
