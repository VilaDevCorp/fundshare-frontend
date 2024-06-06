import { Typography } from '../ui/Typography';
import { Debt } from '../../types/entities';
import { NoElementsMessage } from '../atom/NoElementsMessage';
import { useAuth } from '../../hooks/useAuth';
import { UserDebtCard } from '../atom/UserDebtCard';
import { useGroup } from '../../hooks/useGroup';

export function UserDebtsSection() {
    const { user } = useAuth();

    const { debts: groupDebts } = useGroup();

    const ownDebts = groupDebts?.content.filter(
        (debt: Debt) =>
            debt.payer.username === user?.username ||
            debt.payee.username === user?.username
    );

    return (
        <section className="w-full flex flex-col gap-4 bg-background-0 rounded-[2px]">
            <Typography px={'24px'} py={'16px'} type="subtitle">
                {'Your debts'}
            </Typography>
            <div className="flex flex-col">
                {ownDebts?.length === 0 ? (
                    <NoElementsMessage label="No debts yet" />
                ) : (
                    ownDebts?.map((debt) => (
                        <UserDebtCard
                            key={`${debt.payee}-${debt.payer}`}
                            debt={debt}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
