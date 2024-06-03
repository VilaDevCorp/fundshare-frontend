import { Layout } from '../components/organism/Layout';
import { Typography } from '../components/ui/Typography';
import { Button, useDisclosure } from '@chakra-ui/react';
import { Icon } from '../components/atom/Icon';
import { useScreen } from '../hooks/useScreen';
import { CreateGroupModal } from '../components/organism/CreateGroupModal';
import { useCrud } from '../hooks/useCrud';
import { useQuery } from '@tanstack/react-query';
import { Group } from '../types/entities';
import { useParams } from 'react-router-dom';
import { GroupUsersSection } from '../components/organism/GroupUsersSection';
import { GroupProvider } from '../providers/GroupProvider';

export function GroupDetailsScreen() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isTablet } = useScreen();

    const { id } = useParams();

    const { get } = useCrud<Group>('group');

    const { data: group } = useQuery<Group>({
        queryKey: ['group', id],
        enabled: !!id,
        queryFn: () => get(id as string)
    });

    return (
        <Layout>
            <GroupProvider group={group}>
                <div className="max-w-[800px] w-full gap-8 flex flex-col ml-auto mr-auto">
                    {group ? (
                        <>
                            {isTablet ? (
                                <>
                                    <div className="flex justify-between">
                                        <Typography type="title">
                                            {group?.name}
                                        </Typography>

                                        <Button
                                            leftIcon={<Icon type="money" />}
                                            onClick={onOpen}
                                        >
                                            {'Add payment'}
                                        </Button>
                                    </div>
                                    <Typography type="subtitle">
                                        {group?.description}
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Typography type="title">
                                        {group?.name}
                                    </Typography>
                                    <Typography type="subtitle">
                                        {group?.description}
                                    </Typography>
                                    <Button
                                        leftIcon={<Icon type="money" />}
                                        onClick={onOpen}
                                    >
                                        {'Add payment'}
                                    </Button>
                                </>
                            )}
                            <div className="w-full flex flex-row gap-4">
                                <GroupUsersSection />
                                <GroupUsersSection />
                            </div>
                        </>
                    ) : (
                        <Typography type="title">{'Loading...'}</Typography>
                    )}

                    {isOpen && (
                        <CreateGroupModal isOpen={isOpen} onClose={onClose} />
                    )}
                </div>
            </GroupProvider>
        </Layout>
    );
}
