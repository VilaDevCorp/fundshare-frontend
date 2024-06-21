import { conf } from '../../../conf';
import { CurrencyCard } from '../atom/CurrencyCard';

export function CurrencySelector({
    currency,
    setCurrency
}: {
    currency: string;
    setCurrency: React.Dispatch<React.SetStateAction<string>>;
}) {
    return (
        <div className="flex gap-2">
            {conf.currencies.map((curr) => (
                <CurrencyCard
                    key={curr.id}
                    name={curr.name}
                    symbol={curr.symbol}
                    onClick={() => setCurrency(curr.id)}
                    isSelected={currency === curr.id}
                />
            ))}
        </div>
    );
}
