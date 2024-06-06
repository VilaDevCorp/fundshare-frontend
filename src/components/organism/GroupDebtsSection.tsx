import { Typography } from '../ui/Typography';
import { useGroup } from '../../hooks/useGroup';
import { useScreen } from '../../hooks/useScreen';
import { NoElementsMessage } from '../atom/NoElementsMessage';
import { GroupDebtCard } from '../atom/GroupDebtCard';

export function GroupDebtsSection() {
    const { isTablet } = useScreen();

    const { debts } = useGroup();

    return (
        <section className="w-full flex flex-col gap-4 bg-background-0 rounded-[2px]">
            {isTablet && (
                <Typography px={'24px'} py={'16px'} type="subtitle">
                    {'Group debts'}
                </Typography>
            )}
            <div className="flex flex-col">
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
        </section>
    );
}
