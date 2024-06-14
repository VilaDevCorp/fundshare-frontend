import { HtmlHTMLAttributes } from 'react';

export function NoElementsMessage({
    label,
    className
}: {
    label: string;
    className?: HtmlHTMLAttributes<HTMLSpanElement>[`className`];
}) {
    return (
        <span
            className={`w-full flex justify-center text-text-700 ${className}`}
        >
            {label}
        </span>
    );
}
