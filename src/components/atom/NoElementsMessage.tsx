import { HtmlHTMLAttributes } from 'react';
import { NotFoundIcon } from './NotFoundIcon';


export function NoElementsMessage({
    label,
    className
}: {
    label: string;
    className?: HtmlHTMLAttributes<HTMLSpanElement>[`className`];
}) {
    return (
        <div
            className={`w-full gap-1 flex flex-col justify-center items-center ${className}`}
        >
            <NotFoundIcon width={'44'} className='text-neutral-800'  />
            <span className={` text-neutral-700`}>{label}</span>
        </div>
    );
}
