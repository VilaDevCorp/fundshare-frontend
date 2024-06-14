import React, { useEffect } from 'react';
import { Layout } from '../components/organism/Layout';
import { Typography } from '../components/ui/Typography';
import { useCrud } from '../hooks/useCrud';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { Page } from '../types/types';
import { Pagination } from '../components/ui/Pagination';
import { RequestCard } from '../components/molecule/RequestCard';
import { Request } from '../types/entities';
import { NoElementsMessage } from '../components/atom/NoElementsMessage';
import { LoadingIndicator } from '../components/atom/LoadingIndicator';

export function RequestsScreen() {
    const [page, setPage] = React.useState(0);

    const { search } = useCrud<Request>('request');

    const { data: requestPage, isLoading } = useQuery<Page<Request>>({
        queryKey: ['requests', page],
        queryFn: () => search(page, 2, {}),
        placeholderData: keepPreviousData
    });

    useEffect(() => {
        if (requestPage?.content.length === 0 && page > 0) {
            setPage(page - 1);
        }
    }, [requestPage]);

    return (
        <Layout>
            <div className="max-w-[800px] w-full gap-8 flex flex-col ml-auto mr-auto h-full overflow-hidden ">
                <Typography type="title">{'Requests'}</Typography>
                <div className="w-full flex flex-col overflow-hidden gap-4">
                    <div className="flex flex-col gap-4 items-center overflow-auto pr-2 min-h-[300px]">
                        {isLoading ? (
                            <LoadingIndicator />
                        ) : requestPage?.content.length === 0 ? (
                            <NoElementsMessage label="No requests found" />
                        ) : (
                            requestPage?.content?.map((request) => (
                                <RequestCard
                                    key={request.id}
                                    request={request}
                                />
                            ))
                        )}
                    </div>
                    {requestPage?.content.length !== 0 && (
                        <Pagination
                            page={page}
                            onPageChange={(page) => setPage(page)}
                            hasNextPage={!!requestPage?.hasNext}
                        />
                    )}
                </div>
            </div>
        </Layout>
    );
}
