import { useGroup } from '../../hooks/useGroup';
import { NoElementsMessage } from '../atom/NoElementsMessage';
import { GroupDebtCard } from '../atom/GroupDebtCard';
import { GroupDetailsSection } from '../atom/GroupDetailsSection';

export function GroupDebtsSection() {
    const { debts } = useGroup();

    return (
        <GroupDetailsSection title="Group debts">
            <div className="flex flex-col bg-background-0 overflow-auto">
                {debts?.content.length === 0 ? (
                    <NoElementsMessage label="No debts yet" />
                ) : (
                    debts?.content.map((debt) => (
                        <GroupDebtCard
                            key={`${debt.payee}-${debt.payer}`}
                            debt={debt}
                        />
                    ))
                )}
            </div>
        </GroupDetailsSection>
    );
}
