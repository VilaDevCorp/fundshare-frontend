import { useGroup } from '../../hooks/useGroup';
import { NoElementsMessage } from '../atom/NoElementsMessage';
import { GroupDebtCard } from '../atom/GroupDebtCard';
import { GroupDetailsSection } from '../atom/GroupDetailsSection';
import { LoadingIndicator } from '../atom/LoadingIndicator';

export function GroupDebtsSection() {
    const { debts, isLoadingDebts } = useGroup();

    return (
        <GroupDetailsSection title="Group debts">
            {isLoadingDebts ? (
                <LoadingIndicator />
            ) : debts?.content.length === 0 ? (
                <NoElementsMessage label="No debts yet" className='mt-[10%]' />
            ) : (
                <div className="flex flex-col bg-background-0 overflow-auto">
                    {debts?.content.map((debt) => (
                        <GroupDebtCard
                            key={`${debt.payee}-${debt.payer}`}
                            debt={debt}
                        />
                    ))}
                </div>
            )}
        </GroupDetailsSection>
    );
}
