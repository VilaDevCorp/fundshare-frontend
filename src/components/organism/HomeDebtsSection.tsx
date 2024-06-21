import { Typography } from '../ui/Typography';
import { Debt, User } from '../../types/entities';
import { NoElementsMessage } from '../atom/NoElementsMessage';
import { UserDebtCard } from '../atom/UserDebtCard';
import { useQuery } from '@tanstack/react-query';
import { useCrud } from '../../hooks/useCrud';
import { DebtModal } from './DebtModal';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useScreen } from '../../hooks/useScreen';
import { LoadingIndicator } from '../atom/LoadingIndicator';

export function HomeDebtsSection() {
    const { search: searchDebts } = useCrud<Debt>('debt');
    const { user: loggedUser } = useAuth();

    const { isTablet } = useScreen();

    const [selectedUser, setSelectedUser] = useState<User | undefined>(
        undefined
    );

    const { data: debts, isLoading } = useQuery({
        queryKey: ['userDebts'],
        queryFn: () => searchDebts(0, null, { ownDebts: true })
    });

    return (
        <section className="flex flex-col gap-4 w-full h-full overflow-hidden">
            {isTablet && <Typography type="title">{'Your debts'}</Typography>}
            <div className="w-full flex flex-col gap-4 rounded-[2px] overflow-hidden">
                <div className="flex flex-col gap-2 overflow-auto pr-2 min-h-[300px] pb-2">
                    {isLoading ? (
                        <LoadingIndicator />
                    ) : debts?.content.length === 0 ? (
                        <NoElementsMessage className='mt-[24px]' label="No debts yet" />
                    ) : (
                        debts?.content.map((debt) => (
                            <UserDebtCard
                                key={`${debt.payee.username}-${debt.payer.username}`}
                                debt={debt}
                                onClick={() =>
                                    setSelectedUser(
                                        debt.payer.username !==
                                            loggedUser?.username
                                            ? debt.payer
                                            : debt.payee
                                    )
                                }
                            />
                        ))
                    )}
                </div>
                {selectedUser !== undefined && (
                    <DebtModal
                        user={selectedUser}
                        onClose={() => setSelectedUser(undefined)}
                    />
                )}
            </div>
        </section>
    );
}
