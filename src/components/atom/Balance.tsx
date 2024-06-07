import { HTMLAttributes } from 'react';

export function Balance({
    balance,
    className
}: {
    balance: number;
    className?: HTMLAttributes<HTMLSpanElement>['className'];
}) {
    return (
        <span
            className={`text-2xl text-nowrap font-bold ${balance >= 0 ? 'text-primary-500' : 'text-error-500'} ${className}`}
        >{`${balance != 0 ? (balance > 0 ? '+' : '-') : ''} ${Math.abs(balance)} €`}</span>
    );
}
