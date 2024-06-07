import { useNavigate } from 'react-router-dom';
import { Group } from '../../types/entities';
import { Balance } from '../atom/Balance';
import { Typography } from '../ui/Typography';

export function GroupCard({ group }: { group: Group }) {
    const navigate = useNavigate();

    return (
        <article
            className="flex flex-col w-full px-4 py-2 bg-background-0 rounded-[2px] cursor-pointer shadow-md border-2 border-transparent hover:border-primary-300 transition-all"
            onClick={() => navigate(`/group/${group.id}`)}
        >
            <div className="flex justify-between mb-6 gap-3 items-center">
                <Typography flexShrink={1} type="subtitle">
                    {group.name}
                </Typography>
                <Balance
                    balance={group.balance !== undefined ? group.balance : 0}
                />
            </div>
            <Typography type="body">{group.description}</Typography>
        </article>
    );
}
