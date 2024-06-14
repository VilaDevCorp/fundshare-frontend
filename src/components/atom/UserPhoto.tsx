import { Icon } from './Icon';
import { Box } from '@chakra-ui/react';

export function UserPhoto() {
    return (
        <Box
            borderRadius={'50%'}
            bg={'background.800'}
            height={'40px'}
            width={'40px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            padding={'10px'}
        >
            <Icon type={'user'} color={'background.0'} fontSize={'2xl'} />
        </Box>
    );
}
