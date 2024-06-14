import { HTMLAttributes } from 'react';
import { Currency } from './Currency';

export function Balance({
    balance,
    className
}: {
    balance: number | undefined;
    className?: HTMLAttributes<HTMLSpanElement>['className'];
}) {
    return (
        <span
            className={`text-xl overflow-hidden font-bold ${balance === undefined || balance >= 0 ? 'text-primary-500' : 'text-error-500'} ${className}`}
        >
            {`${balance != 0 && balance != undefined ? (balance > 0 ? '+' : '-') : ''} `}
            <Currency
                amount={balance !== undefined ? Math.abs(balance) : balance}
            />
        </span>
    );
}
