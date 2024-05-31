import { Box, BoxProps, IconButton, Text } from '@chakra-ui/react';
import { Icon } from '../atom/Icon';

interface PaginationProps {
    page: number;
    hasNextPage: boolean;
    onPageChange: (page: number) => void;
    boxProps?: BoxProps
}

export function Pagination(props: PaginationProps) {
    
    return (
        <Box
            display={'flex'}
            gap={4}
            alignItems={'center'}
            width={'100%'}
            justifyContent={'space-evenly'}
            {...props.boxProps}
        >
            <IconButton
                variant={'ghost'}
                size={'square'}
                aria-label={'previous-page'}
                onClick={() => props.onPageChange(props.page - 1)}
                icon={<Icon type={'chevron-left'} />}
                isDisabled={props.page <= 0}
            />
            <Text fontSize={'md'}>{props.page + 1}</Text>
            <IconButton
                variant={'ghost'}
                size={'square'}
                aria-label={'next-page'}
                onClick={() => props.onPageChange(props.page + 1)}
                icon={<Icon type={'chevron-right'} />}
                isDisabled={!props.hasNextPage}
            />
        </Box>
    );
}
