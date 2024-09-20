import { useState } from 'react';
import { Icon } from './Icon';
import { Box } from '@chakra-ui/react';

export function UserPhoto({ pictureUrl, onClick }: { pictureUrl?: string, onClick?: () => void }) {

    const [picUrl, setPicUrl] = useState(pictureUrl)

    return (
        <Box
            borderRadius={'50%'}
            bg={'neutral.800'}
            height={'40px'}
            width={'40px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            onClick={onClick}
            cursor={onClick ? 'pointer' : 'default'}
        >
            {picUrl ?
                <img className='rounded-full object-cover w-full h-full' src={picUrl} alt="User photo" onError={() => setPicUrl(undefined)} />
                :
                <span className='p-2'>
                    <Icon type={'user'} color={'neutral.0'} fontSize={'2xl'} />
                </span>
            }
        </Box >
    );
}
