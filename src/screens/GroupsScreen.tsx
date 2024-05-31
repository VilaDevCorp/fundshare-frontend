import React from 'react';
import { Layout } from '../components/organism/Layout';
import { Typography } from '../components/ui/Typography';
import { Button, useDisclosure } from '@chakra-ui/react';
import { Icon } from '../components/atom/Icon';
import { GroupCard } from '../components/molecule/GroupCard';
import { useScreen } from '../hooks/useScreen';
import { CreateGroupModal } from '../components/organism/CreateGroupModal';
import { useCrud } from '../hooks/useCrud';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Page } from '../types/types';
import { Group } from '../types/entities';
import { Pagination } from '../components/ui/Pagination';

export function GroupsScreen() {
    const { isTablet } = useScreen();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [page, setPage] = React.useState(0);

    const { search } = useCrud<Group>('group');

    const { data: groupPage } = useQuery<Page<Group>>({
        queryKey: ['groups', page],
        queryFn: () => search(page, 10, {}),
        placeholderData: keepPreviousData
    });

    return (
        <Layout>
            <div className="max-w-[800px] w-full gap-8 flex flex-col ml-auto mr-auto">
                {isTablet ? (
                    <div className="flex justify-between">
                        <Typography type="title">{'Groups'}</Typography>
                        <Button leftIcon={<Icon type="add" />} onClick={onOpen}>
                            {'Create group'}
                        </Button>
                    </div>
                ) : (
                    <>
                        <Typography type="title">{'My groups'}</Typography>
                        <Button leftIcon={<Icon type="add" />} onClick={onOpen}>
                            {'Create group'}
                        </Button>
                    </>
                )}
                <div className="flex justify-center flex-col gap-4 items-center">
                    {groupPage?.content?.map((group) => (
                        <GroupCard key={group.id} group={group} />
                    ))}
                </div>
                <div>
                    <Pagination
                        page={page}
                        onPageChange={(page) => setPage(page)}
                        hasNextPage={!!groupPage?.hasNext}
                        boxProps={{ mt: '12px' }}
                    />
                </div>
                {isOpen && (
                    <CreateGroupModal isOpen={isOpen} onClose={onClose} />
                )}
            </div>
        </Layout>
    );
}
