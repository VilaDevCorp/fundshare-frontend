import { ReactNode, createContext } from 'react';
import { Debt, Group } from '../types/entities';
import { Page } from '../types/types';

interface GroupContext {
    group: Group | undefined;
    isLoadingGroup: boolean;
    debts: Page<Debt> | undefined;
    isLoadingDebts: boolean;
}

export const GroupContext = createContext<GroupContext>({} as GroupContext);

export function GroupProvider({
    value,
    children
}: {
    value: GroupContext;
    children: ReactNode;
}) {
    return (
        <GroupContext.Provider value={value}>{children}</GroupContext.Provider>
    );
}
