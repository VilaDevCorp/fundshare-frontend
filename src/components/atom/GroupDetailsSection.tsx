import React from 'react';
import { Typography } from '../ui/Typography';
import { useScreen } from '../../hooks/useScreen';

export function GroupDetailsSection({
    children,
    title
}: {
    children: React.ReactNode;
    title: string;
}) {
    const { isTablet } = useScreen();

    return (
        <section className="w-full flex flex-col gap-4 rounded-[2px] max-h-[calc((100%-32px)/2)] overflow-hidden">
            {isTablet && <Typography type="subtitle">{title}</Typography>}
            {children}
        </section>
    );
}
