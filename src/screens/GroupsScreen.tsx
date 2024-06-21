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
import { NoElementsMessage } from '../components/atom/NoElementsMessage';
import { LoadingIndicator } from '../components/atom/LoadingIndicator';

export function GroupsScreen() {
    const { isTablet } = useScreen();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [page, setPage] = React.useState(0);

    const { search } = useCrud<Group>('group');

    const { data: groupPage, isLoading } = useQuery<Page<Group>>({
        queryKey: ['groups', page],
        queryFn: () => search(page, 10, {}),
        placeholderData: keepPreviousData
    });

    return (
        <Layout>
            <div className="max-w-[800px] w-full gap-4 flex flex-col ml-auto mr-auto h-full overflow-hidden">
                {isTablet ? (
                    <div className="flex justify-between">
                        <Typography type="title">{'Groups'}</Typography>
                        <Button leftIcon={<Icon type="add" />} onClick={onOpen}>
                            {'Create group'}
                        </Button>
                    </div>
                ) : (
                    <>
                        <Typography type="title">{'Groups'}</Typography>
                        <Button leftIcon={<Icon type="add" />} onClick={onOpen}>
                            {'Create group'}
                        </Button>
                    </>
                )}
                <div className="w-full flex flex-col overflow-hidden gap-4">
                    <div className="flex flex-col gap-2 items-center overflow-auto pr-2 min-h-[300px] pb-2">
                        {isLoading ? (
                            <LoadingIndicator />
                        ) : groupPage?.content.length === 0 ? (
                            <NoElementsMessage label="No groups found" />
                        ) : (
                            groupPage?.content?.map((group) => (
                                <GroupCard key={group.id} group={group} />
                            ))
                        )}
                    </div>
                    {groupPage?.content.length !== 0 && (
                        <Pagination
                            page={page}
                            onPageChange={(page) => setPage(page)}
                            hasNextPage={!!groupPage?.hasNext}
                        />
                    )}
                </div>
            </div>
            {isOpen && <CreateGroupModal isOpen={isOpen} onClose={onClose} />}
        </Layout>
    );
}
