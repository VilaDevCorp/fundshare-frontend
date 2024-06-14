import { Typography } from '../ui/Typography';
import { Payment } from '../../types/entities';
import { NoElementsMessage } from '../atom/NoElementsMessage';
import { useQuery } from '@tanstack/react-query';
import { useCrud } from '../../hooks/useCrud';
import { useState } from 'react';
import { useScreen } from '../../hooks/useScreen';
import { PaymentCard } from '../atom/PaymentCard';
import { Pagination } from '../ui/Pagination';
import { LoadingIndicator } from '../atom/LoadingIndicator';

export function HomePaymentsSection() {
    const { isTablet } = useScreen();

    const { search: searchPaym } = useCrud<Payment>('payment');

    const [page, setPage] = useState(0);

    const { data: userPaymentsPage, isLoading } = useQuery({
        queryKey: ['groupPayments', page],
        queryFn: () => searchPaym(page, 10, { userRelated: true })
    });

    return (
        <section className="flex flex-col gap-4 w-full h-full overflow-hidden">
            {isTablet && (
                <Typography type="title">{'Recent payments'}</Typography>
            )}

            <div className="w-full flex flex-col rounded-[2px] overflow-hidden gap-4">
                <div className="flex flex-col overflow-auto  min-h-[300px] bg-background-0">
                    {isLoading ? (
                        <LoadingIndicator />
                    ) : userPaymentsPage?.content.length === 0 ? (
                        <NoElementsMessage className='mt-[24px]' label="No payments yet" />
                    ) : (
                        userPaymentsPage?.content.map((payment) => (
                            <PaymentCard
                                key={payment.id}
                                payment={payment}
                                showGroup
                            />
                        ))
                    )}
                </div>
                {userPaymentsPage?.content.length !== 0 && (
                    <Pagination
                        page={page}
                        onPageChange={(page) => setPage(page)}
                        hasNextPage={!!userPaymentsPage?.hasNext}
                    />
                )}
            </div>
        </section>
    );
}
