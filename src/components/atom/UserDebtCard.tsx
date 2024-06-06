import { useAuth } from '../../hooks/useAuth';
import { Debt } from '../../types/entities';
import { UserPhoto } from './UserPhoto';

export function UserDebtCard({ debt }: { debt: Debt }) {
    const { user } = useAuth();

    const isPayer = debt.payer.username === user?.username;

    return (
        <article
            className={`flex gap-3 border-b py-4 px-6 w-full justify-between items-center first:border-t  border-background-200 `}
        >
            <div className="flex gap-2 items-center">
                <UserPhoto />
                <span className="text-sm font-bold">
                    {isPayer ? debt.payee.username : debt.payer.username}
                </span>
            </div>
            <span
                className={`${isPayer ? 'text-primary-500' : 'text-error-500'} font-bold text-xl`}
            >{`${isPayer ? '+' : '-'} ${debt.amount} €`}</span>
        </article>
    );
}
