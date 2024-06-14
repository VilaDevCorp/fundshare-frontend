import { Progress } from '@chakra-ui/react';

export function LoadingIndicator() {
    return (
        <Progress
            size="md"
            w={'60%'}
            bg={'transparent'}
            colorScheme="primary"
            borderRadius={'2px'}
            m={'auto'}
            isIndeterminate
        />
    );
}
