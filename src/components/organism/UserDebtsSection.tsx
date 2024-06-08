import { Debt } from '../../types/entities';
import { NoElementsMessage } from '../atom/NoElementsMessage';
import { useAuth } from '../../hooks/useAuth';
import { UserDebtCard } from '../atom/UserDebtCard';
import { useGroup } from '../../hooks/useGroup';
import { GroupDetailsSection } from '../atom/GroupDetailsSection';

export function UserDebtsSection() {
    const { user } = useAuth();

    const { debts: groupDebts } = useGroup();

    const ownDebts = groupDebts?.content.filter(
        (debt: Debt) =>
            debt.payer.username === user?.username ||
            debt.payee.username === user?.username
    );

    return (
        <GroupDetailsSection title="Your debts">
            <div className="flex flex-col bg-background-0 overflow-auto">
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
        </GroupDetailsSection>
    );
}
