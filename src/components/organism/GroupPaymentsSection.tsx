import { useQuery } from '@tanstack/react-query';
import { useGroup } from '../../hooks/useGroup';
import { useCrud } from '../../hooks/useCrud';
import { Payment } from '../../types/entities';
import { useState } from 'react';
import { PaymentCard } from '../atom/PaymentCard';
import { NoElementsMessage } from '../atom/NoElementsMessage';
import { Pagination } from '../ui/Pagination';
import { GroupDetailsSection } from '../atom/GroupDetailsSection';

export function GroupPaymentsSection() {
    const { group } = useGroup();

    const { search: searchPaym } = useCrud<Payment>('payment');

    const [page, setPage] = useState(0);

    const { data: groupPaymentsPage } = useQuery({
        queryKey: ['groupPayments', page],
        enabled: !!group?.id,
        queryFn: () => searchPaym(page, 10, { groupId: group!.id })
    });

    return (
        <GroupDetailsSection title="History">
            <div className="flex flex-col gap-4 overflow-hidden">
                {groupPaymentsPage?.content.length === 0 ? (
                    <NoElementsMessage label="No payments yet" />
                ) : (
                    <div className="flex flex-col bg-background-0 overflow-auto">
                        {groupPaymentsPage?.content.map((payment) => (
                            <PaymentCard key={payment.id} payment={payment} />
                        ))}
                    </div>
                )}
                {groupPaymentsPage?.content.length !== 0 && (
                    <Pagination
                        page={page}
                        onPageChange={(page) => setPage(page)}
                        hasNextPage={!!groupPaymentsPage?.hasNext}
                    />
                )}
            </div>
        </GroupDetailsSection>
    );
}
