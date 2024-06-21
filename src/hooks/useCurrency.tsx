import { useAuth } from './useAuth';
import { calculateCurrency, getCurrencySymbol } from '../utils/utilFunctions';

export function useCurrency() {
    const { user } = useAuth();
    return (amount: number | undefined) =>
        calculateCurrency(amount, user?.conf?.currency).toFixed(2) +
        ' ' +
        getCurrencySymbol(user?.conf?.currency);
}
