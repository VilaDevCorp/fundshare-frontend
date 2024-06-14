import { useScreen } from '../../hooks/useScreen';
import { Debt } from '../../types/entities';
import { Currency } from './Currency';
import { Icon } from './Icon';
import { UserPhoto } from './UserPhoto';

export function GroupDebtCard({ debt }: { debt: Debt }) {
    const { isTablet } = useScreen();

    return (
        <article
            className={`flex gap-3 border-b py-4 px-4 md:px-6 w-full justify-between first:border-t  border-background-200 `}
        >
            <div className="flex gap-2 items-center w-[25%] overflow-hidden">
                {isTablet && <UserPhoto />}
                <span className="text-sm font-bold overflow-hidden">{debt.payee.username}</span>
            </div>
            <div className="flex gap-4 items-center justify-evenly w-[50%] overflow-hidden">
                <Icon type="doubleChevronRight" />
                <span className=" font-bold">
                    <Currency amount={debt.amount} />
                </span>
                <Icon type="doubleChevronRight" />
            </div>
            <div className="flex gap-2 items-center w-[25%] justify-end overflow-hidden ">
                {isTablet && <UserPhoto />}
                <span className="text-sm font-bold overflow-hidden ">{debt.payer.username}</span>
            </div>
        </article>
    );
}
