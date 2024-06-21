export function CurrencyCard({
    name,
    symbol,
    onClick,
    isSelected
}: {
    name: string;
    symbol: string;
    onClick: () => void;
    isSelected: boolean;
}) {
    return (
        <div
            className={`cursor-pointer border-2 border-transparent px-4 py-2 rounded-[2px] 
                bg-neutral-0 shadow-sm flex flex-col
                 items-center ${
                     isSelected
                         ? '!border-primary-400'
                         : 'hover:bg-neutral-100 active:shadow-none active:bg-neutral-300'
                 }`}
            onClick={onClick}
        >
            <span className="text-xl font-bold">{symbol}</span>
            <span className="text-neutral-800">{name}</span>
        </div>
    );
}
