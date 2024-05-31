export function Balance({ balance }: { balance: number }) {
    return (
        <span
            className={`text-2xl text-nowrap font-bold ${balance >= 0 ? 'text-primary-500' : 'text-error-500'}`}
        >{`${balance != 0 ? (balance > 0 ? '+' : '-') : ''} ${Math.abs(balance)} €`}</span>
    );
}
