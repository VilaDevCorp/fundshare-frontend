import { useQuery } from '@tanstack/react-query';
import { useGroup } from '../../hooks/useGroup';
import { useCrud } from '../../hooks/useCrud';
import { Payment } from '../../types/entities';
import { useState } from 'react';
import { PaymentCard } from '../atom/PaymentCard';
import { NoElementsMessage } from '../atom/NoElementsMessage';
import { Pagination } from '../ui/Pagination';
import { GroupDetailsSection } from '../atom/GroupDetailsSection';
import { LoadingIndicator } from '../atom/LoadingIndicator';

export function GroupPaymentsSection() {
    const { group } = useGroup();

    const { search: searchPaym } = useCrud<Payment>('payment');

    const [page, setPage] = useState(0);

    const { data: groupPaymentsPage, isLoading } = useQuery({
        queryKey: ['groupPayments', page],
        enabled: !!group?.id,
        queryFn: () => searchPaym(page, 10, { groupId: group!.id })
    });

    return (
        <GroupDetailsSection title="History">
            <div className="flex flex-col gap-4 overflow-hidden h-full ">
                {isLoading ? (
                    <LoadingIndicator />
                ) : groupPaymentsPage?.content.length === 0 ? (
                    <NoElementsMessage className='mt-[10%]' label="No payments yet" />
                ) : (
                    <div className="flex flex-col bg-neutral-100 overflow-auto md:shadow-sm h-full md:mb-1">
                        {groupPaymentsPage?.content.map((payment) => (
                            <PaymentCard key={payment.id} payment={payment} />
                        ))}
                    </div>
                )}
                {groupPaymentsPage?.content.length !== 0 && (
                    <Pagination
                        boxProps={{ className: 'mt-auto' }}
                        page={page}
                        onPageChange={(page) => setPage(page)}
                        hasNextPage={!!groupPaymentsPage?.hasNext}
                    />
                )}
            </div>
        </GroupDetailsSection>
    );
}
