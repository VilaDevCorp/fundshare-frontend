import { useNavigate } from 'react-router-dom';
import { Group } from '../../types/entities';
import { Balance } from '../atom/Balance';
import { Typography } from '../ui/Typography';
import { useReactQuery } from '../../hooks/useReactQuery';

export function GroupCard({ group }: { group: Group }) {
    const navigate = useNavigate();
    const { queryClient } = useReactQuery();

    return (
        <article
            className="flex flex-col w-full px-4 py-2 bg-neutral-0 rounded-[2px] cursor-pointer border-2 border-transparent 
             transition-all shadow-md hover:bg-neutral-100 active:shadow-none active:bg-neutral-300"
            onClick={() => {
                navigate(`/groups/${group.id}`);
                //We update the user info because they could have appear new operations in the group and the balance could be outdated
                queryClient.invalidateQueries({
                    queryKey: ['getUserInfo']
                });
            }}
        >
            <div className="flex justify-between mb-2 gap-3 items-center">
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
