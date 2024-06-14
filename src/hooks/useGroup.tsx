import { useContext } from 'react';
import { GroupContext } from '../providers/GroupProvider';

export function useGroup() {
    const group = useContext(GroupContext);
    return group;
}
