import { Typography } from '../ui/Typography';
import { Payment } from '../../types/entities';
import { NoElementsMessage } from '../atom/NoElementsMessage';
import { useQuery } from '@tanstack/react-query';
import { useCrud } from '../../hooks/useCrud';
import { useState } from 'react';
import { useScreen } from '../../hooks/useScreen';
import { PaymentCard } from '../atom/PaymentCard';
import { Pagination } from '../ui/Pagination';

export function HomePaymentsSection() {
    const { isTablet } = useScreen();

    const { search: searchPaym } = useCrud<Payment>('payment');

    const [page, setPage] = useState(0);

    const { data: userPaymentsPage } = useQuery({
        queryKey: ['groupPayments', page],
        queryFn: () => searchPaym(page, 10, { userRelated: true })
    });

    return (
        <section className="flex flex-col gap-4 w-full">
            {isTablet && (
                <Typography type="title">{'Recent payments'}</Typography>
            )}

            <div className="w-full flex flex-col gap-4 bg-background-0 rounded-[2px]">
                <div className="flex flex-col">
                    {userPaymentsPage?.content.length === 0 ? (
                        <NoElementsMessage label="No payments yet" />
                    ) : (
                        userPaymentsPage?.content.map((payment) => (
                            <PaymentCard
                                key={payment.id}
                                payment={payment}
                                showGroup
                            />
                        ))
                    )}
                    {userPaymentsPage?.content.length !== 0 && (
                        <Pagination
                            page={page}
                            onPageChange={(page) => setPage(page)}
                            hasNextPage={!!userPaymentsPage?.hasNext}
                            boxProps={{ mt: '12px' }}
                        />
                    )}
                </div>
            </div>
        </section>
    );
}
