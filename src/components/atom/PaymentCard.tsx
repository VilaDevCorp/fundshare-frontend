import { Payment } from '../../types/entities';
import moment from 'moment';
import { conf } from '../../../conf';
import { Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useReactQuery } from '../../hooks/useReactQuery';
import { Currency } from './Currency';

export function PaymentCard({
    payment,
    showGroup
}: {
    payment: Payment;
    showGroup?: boolean;
}) {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { queryClient } = useReactQuery();

    return (
        <article
            className={`flex  bg-background-0 justify-between gap-4 border-b py-4 px-6  first:border-t-0 last:!border-b-0 border-background-300 `}
        >
            <div className="flex flex-col">
                <span className="text-sm font-bold">
                    {moment(payment.createdAt).format(conf.dateTimeFormat)}
                </span>

                <span className="text-lg">{payment.description}</span>
                {showGroup && (
                    <Link
                        onClick={() => {
                            navigate(`/groups/${payment.group.id}`);
                            //We update the user info because they could have appear new operations in the group and the balance could be outdated
                            queryClient.invalidateQueries({
                                queryKey: ['getUserInfo']
                            });
                        }}
                    >
                        {payment.group?.name}
                    </Link>
                )}
            </div>
            <div className="flex flex-col w-full">
                <div
                    className={`flex w-full justify-end gap-2 items-end text-error-500 ${user?.username === payment.createdBy?.username ? 'font-bold' : ''} `}
                >
                    <span className="overflow-hidden line-clamp-3">{payment.createdBy?.username}</span>
                    <span className="text-wrap overflow-hidden">
                        - <Currency amount={payment.totalAmount} />
                    </span>
                </div>

                {payment.userPayments &&
                    payment.userPayments.map((userPayment) => (
                        <div
                            className={`flex justify-end gap-2 items-end text-primary-500 ${user?.username === userPayment.user.username ? 'font-bold' : ''} `}
                            key={userPayment.id}
                        >
                            <span className='overflow-hidden  line-clamp-3'>{userPayment.user.username}</span>
                            <span className="text-right whitespace-nowrap">
                                + <Currency amount={userPayment.amount} />
                            </span>
                        </div>
                    ))}
            </div>
        </article>
    );
}
