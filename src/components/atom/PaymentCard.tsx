import { Payment } from '../../types/entities';
import { Icon } from './Icon';
import moment from 'moment';
import { conf } from '../../../conf';

export function PaymentCard({ payment }: { payment: Payment }) {
    return (
        <article
            className={`flex flex-col gap-3 border-b py-4 px-6 w-full first:border-t last:!border-b-0 border-background-600 `}
        >
            <span className="text-sm font-bold">
                {moment(payment.createdAt).format(conf.dateTimeFormat)}
            </span>
            <div className="flex justify-between">
                <span>{payment.description}</span>
                <span className="font-bold text-lg">
                    {payment.totalAmount} €
                </span>
            </div>
            <div className="flex justify-between items-center w-full">
                <span className="font-bold w-[20%]">
                    {payment.createdBy?.username}
                </span>
                <Icon type="doubleChevronRight" />
                <div className="flex flex-col w-[70%] max-w-[250px] ">
                    {payment.userPayments.map((userPayment) => (
                        <div
                            className="flex justify-end gap-4 "
                            key={userPayment.id}
                        >
                            <span>{userPayment.user.username}</span>
                            <span className="font-bold text-right">
                                {userPayment.amount} €
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    );
}
