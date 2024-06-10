import React, { HtmlHTMLAttributes } from 'react';
import { Typography } from '../ui/Typography';
import { useScreen } from '../../hooks/useScreen';

export function GroupDetailsSection({
    children,
    title,
    className
}: {
    children: React.ReactNode;
    title: string;
    className?: HtmlHTMLAttributes<HTMLSpanElement>[`className`];
}) {
    const { isTablet } = useScreen();

    return (
        <section
            className={`w-full flex flex-col gap-4 rounded-[2px] overflow-hidden min-h-[100px] h-full ${className}`}
        >
            {isTablet && <Typography type="subtitle">{title}</Typography>}
            {children}
        </section>
    );
}
