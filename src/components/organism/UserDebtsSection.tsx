import { Debt } from '../../types/entities';
import { NoElementsMessage } from '../atom/NoElementsMessage';
import { useAuth } from '../../hooks/useAuth';
import { UserDebtCard } from '../atom/UserDebtCard';
import { useGroup } from '../../hooks/useGroup';
import { GroupDetailsSection } from '../atom/GroupDetailsSection';
import { LoadingIndicator } from '../atom/LoadingIndicator';

export function UserDebtsSection() {
    const { user } = useAuth();

    const { debts: groupDebts, isLoadingDebts } = useGroup();

    const ownDebts = groupDebts?.content.filter(
        (debt: Debt) =>
            debt.payer.username === user?.username ||
            debt.payee.username === user?.username
    );

    return (
        <GroupDetailsSection title="Your debts" showAlwaysTitle className='!h-[200px] md:!h-full'>
            <div className="flex flex-col gap-4 overflow-hidden">
                {isLoadingDebts ? (
                    <LoadingIndicator />
                ) : ownDebts?.length === 0 ? (
                    <NoElementsMessage className='mt-[10%]' label="No debts yet" />
                ) : (
                    <div className="flex flex-col bg-background-0 overflow-auto">
                        {ownDebts?.map((debt) => (
                            <UserDebtCard
                                key={`${debt.payee}-${debt.payer}`}
                                debt={debt}
                            />
                        ))}
                    </div>
                )}
            </div>
        </GroupDetailsSection>
    );
}
