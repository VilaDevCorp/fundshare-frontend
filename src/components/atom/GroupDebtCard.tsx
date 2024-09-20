import { useCurrency } from '../../hooks/useCurrency';
import { useScreen } from '../../hooks/useScreen';
import { Debt } from '../../types/entities';
import { Icon } from './Icon';
import { UserPhoto } from './UserPhoto';

export function GroupDebtCard({ debt }: { debt: Debt }) {
    const { isTablet } = useScreen();

    const calcCurrency = useCurrency();

    return (
        <article
            className={`flex gap-3 border-b py-2 h-[64px] min-h-[64px] px-4 md:px-6 w-full justify-between first:border-t  
                border-background-200 bg-neutral-0 `}
        >
            <div className="flex gap-2 items-center w-[25%] overflow-hidden">
                {isTablet && <UserPhoto pictureUrl={debt.payee.pictureUrl} />}
                <span className="text-sm font-bold overflow-hidden">
                    {debt.payee.username}
                </span>
            </div>
            <div className="flex gap-4 items-center justify-evenly w-[50%] overflow-hidden">
                <Icon color={'primary.500'} type="doubleChevronRight" />
                <span className=" font-bold">{calcCurrency(debt.amount)}</span>
                <Icon color={'primary.500'} type="doubleChevronRight" />
            </div>
            <div className="flex gap-2 items-center w-[25%] justify-end overflow-hidden ">
                {isTablet && <UserPhoto pictureUrl={debt.payer.pictureUrl} />}
                <span className="text-sm font-bold overflow-hidden ">
                    {debt.payer.username}
                </span>
            </div>
        </article>
    );
}
