import { Box, Icon, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function Pagination(props: PaginationProps) {
    return (
        <Box display={'flex'} gap={4} alignItems={'center'} width={'100%'} justifyContent={'space-evenly'}>
            <IconButton
                variant={'ghost'}
                size={'square'}
                aria-label={'previous-page'}
                onClick={() => props.onPageChange(props.page - 1)}
                icon={<Icon as={BiChevronLeft} />}
                isDisabled={props.page <= 0}
            />
            <Text fontSize={'md'}>{props.page + 1}</Text>
            <IconButton
                variant={'ghost'}
                size={'square'}
                aria-label={'next-page'}
                onClick={() => props.onPageChange(props.page + 1)}
                icon={<Icon as={BiChevronRight} />}
                isDisabled={props.page >= props.totalPages - 1}
            />
        </Box>
    );
}
