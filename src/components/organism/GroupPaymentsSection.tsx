import { Typography } from '../ui/Typography';
import { useQuery } from '@tanstack/react-query';
import { useGroup } from '../../hooks/useGroup';
import { useCrud } from '../../hooks/useCrud';
import { Payment } from '../../types/entities';
import { useScreen } from '../../hooks/useScreen';
import { useState } from 'react';
import { PaymentCard } from '../atom/PaymentCard';
import { NoElementsMessage } from '../atom/NoElementsMessage';
import { Pagination } from '../ui/Pagination';

export function GroupPaymentsSection() {
    const { isTablet } = useScreen();

    const {group} = useGroup();

    const { search: searchPaym } = useCrud<Payment>('payment');

    const [page, setPage] = useState(0);

    const { data: groupPaymentsPage } = useQuery({
        queryKey: ['groupPayments', page],
        enabled: !!group?.id,
        queryFn: () => searchPaym(page, 10, { groupId: group!.id })
    });

    return (
        <section className="w-full flex flex-col gap-4 bg-background-0 rounded-[2px]">
            {isTablet && <Typography px={'24px'} py={'16px'} type="subtitle">{'History'}</Typography>}
            <div className='flex flex-col'>
                {groupPaymentsPage?.content.length === 0 ? (
                    <NoElementsMessage label="No payments yet" />
                ) : (
                    groupPaymentsPage?.content.map((payment) => (
                        <PaymentCard key={payment.id} payment={payment} />
                    ))
                )}
                {groupPaymentsPage?.content.length !== 0 && (
                    <Pagination
                        page={page}
                        onPageChange={(page) => setPage(page)}
                        hasNextPage={!!groupPaymentsPage?.hasNext}
                        boxProps={{ mt: '12px' }}
                    />
                )}
            </div>
        </section>
    );
}
