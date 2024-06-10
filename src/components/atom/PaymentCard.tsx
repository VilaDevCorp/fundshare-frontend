import { Payment } from '../../types/entities';
import moment from 'moment';
import { conf } from '../../../conf';
import { Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useReactQuery } from '../../hooks/useReactQuery';

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
            className={`flex justify-between gap-3 border-b py-4 px-6 w-full first:border-t-0 last:!border-b-0 border-background-300 `}
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
            <div className="flex flex-col w-[70%] max-w-[250px]  ">
                <div
                    className={`flex justify-end gap-2 items-center text-error-500 ${user?.username === payment.createdBy?.username ? 'font-bold' : ''} `}
                >
                    <span className="">{payment.createdBy?.username}</span>
                    <span className="">
                        - {payment.totalAmount.toFixed(2)} €
                    </span>
                </div>

                {payment.userPayments &&
                    payment.userPayments.map((userPayment) => (
                        <div
                            className={`flex justify-end gap-2 items-center text-primary-500 ${user?.username === userPayment.user.username ? 'font-bold' : ''} `}
                            key={userPayment.id}
                        >
                            <span>{userPayment.user.username}</span>
                            <span className="text-right">
                                + {userPayment.amount.toFixed(2)} €
                            </span>
                        </div>
                    ))}
            </div>
        </article>
    );
}
