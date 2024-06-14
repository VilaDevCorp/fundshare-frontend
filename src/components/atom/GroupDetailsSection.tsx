import React, { HtmlHTMLAttributes } from 'react';
import { Typography } from '../ui/Typography';
import { useScreen } from '../../hooks/useScreen';

export function GroupDetailsSection({
    children,
    title,
    showAlwaysTitle, //To show the title in mobile too
    className
}: {
    children: React.ReactNode;
    title: string;
    showAlwaysTitle?: boolean;
    className?: HtmlHTMLAttributes<HTMLSpanElement>[`className`];
}) {
    const { isLaptop } = useScreen();

    return (
        <section
            className={`w-full flex flex-col gap-4 rounded-[2px] overflow-hidden min-h-[100px] h-full ${className}`}
        >
            {(isLaptop || showAlwaysTitle) && (
                <Typography type="subtitle">{title}</Typography>
            )}
            {children}
        </section>
    );
}
