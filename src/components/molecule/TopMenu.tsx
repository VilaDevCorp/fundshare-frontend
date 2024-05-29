import { Box, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { TopNav } from '../atom/TopNav';
import { useScreen } from '../../hooks/useScreen';
import { useAuth } from '../../hooks/useAuth';
import { Icon } from '../atom/Icon';

export function TopMenu() {
    const { isLaptop } = useScreen();
    const { user, logout } = useAuth();

    return (
        <header className="flex justify-between items-center h-24  bg-primary-50 w-full px-8 py-4 gap-4 sticky top-0">
            {isLaptop && <TopNav />}
            <HStack
                overflow={'hidden'}
                gap={'16px'}
                width={{ base: '100%', laptop: '300px' }}
                justifyContent={{ base: 'space-between', laptop: 'flex-end' }}
            >
                <HStack gap={'16px'} overflow={'hidden'}>
                    <Box
                        borderRadius={'50%'}
                        bg={'background.800'}
                        height={'50px'}
                        width={'50px'}
                        padding={'10px'}
                    >
                        <Icon
                            type={'user'}
                            color={'background.0'}
                            fontSize={'2xl'}
                        />
                    </Box>
                    <VStack
                        gap={0}
                        alignItems={'flex-start'}
                        overflow={'hidden'}
                    >
                        <Text
                            as={'span'}
                            fontSize={'md'}
                            color={'text.900'}
                            fontWeight={'bold'}
                            textOverflow={'ellipsis'}
                            overflow={'hidden'}
                            whiteSpace={'nowrap'}
                            maxWidth={'100%'}
                        >
                            {user?.username}
                        </Text>
                        <Text
                            as={'span'}
                            fontSize={'lg'}
                            color={'error.500'}
                            fontWeight={'bold'}
                            textOverflow={'ellipsis'}
                            overflow={'hidden'}
                            whiteSpace={'nowrap'}
                            maxWidth={'100%'}
                        >
                            -10333.15 €
                        </Text>
                    </VStack>
                </HStack>
                <IconButton
                    size={'square'}
                    variant={'ghost'}
                    aria-label="Log out"
                    onClick={() => logout()}
                    icon={<Icon type={'logout'} />}
                ></IconButton>
            </HStack>
        </header>
    );
}
