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
            className={`flex gap-3 border-b py-2 px-4 h-[64px] min-h-[64px]  w-full justify-between items-center 
                first:border-t bg-neutral-0  border-background-200 
                ${onClick && 'hover:bg-neutral-100 active:shadow-none active:bg-neutral-300  cursor-pointer hover:bg-background-100 transition-all shadow-md'} `}
            onClick={onClick}
        >
            <div className="flex gap-2 items-center overflow-hidden min-w-[150px]">
                <UserPhoto pictureUrl={isPayer ? debt.payee.pictureUrl : debt.payer.pictureUrl} />
                <span className="text-sm font-bold overflow-hidden ">
                    {isPayer ? debt.payee.username : debt.payer.username}
                </span>
            </div>
            <Balance
                className="overflow-hidden text-wrap"
                balance={isPayer ? debt.amount : -debt.amount}
            />
        </article>
    );
}
