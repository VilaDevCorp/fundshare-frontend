import { ReactNode, createContext } from 'react';
import { Group } from '../types/entities';

export const GroupContext = createContext<Group | undefined>(undefined);

export function GroupProvider({
    group,
    children
}: {
    group: Group | undefined;
    children: ReactNode;
}) {
    return (
        <GroupContext.Provider value={group}>{children}</GroupContext.Provider>
    );
}
