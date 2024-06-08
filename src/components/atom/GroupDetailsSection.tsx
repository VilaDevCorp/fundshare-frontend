import React from 'react';
import { Typography } from '../ui/Typography';

export function GroupDetailsSection({
    children,
    title
}: {
    children: React.ReactNode;
    title: string;
}) {
    return (
        <section className="w-full flex flex-col gap-4 rounded-[2px] max-h-[calc((100%-32px)/2)] overflow-hidden">
            <Typography type="subtitle">{title}</Typography>
            {children}
        </section>
    );
}
