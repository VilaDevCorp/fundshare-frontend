import { useAuth } from '../../hooks/useAuth';
import { calculateCurrency, getCurrencySymbol } from '../../utils/utilFunctions';



export function Currency({ amount }: { amount: number | undefined }) {
    const { user } = useAuth();
    return (
        <>
            {calculateCurrency(amount, user?.conf?.currency).toFixed(2)}{' '}
            {getCurrencySymbol(user?.conf?.currency)}
        </>
    );
}
