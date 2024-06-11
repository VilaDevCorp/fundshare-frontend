import { HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { TopNav } from '../atom/TopNav';
import { useScreen } from '../../hooks/useScreen';
import { useAuth } from '../../hooks/useAuth';
import { Icon } from '../atom/Icon';
import { UserPhoto } from '../atom/UserPhoto';
import { Balance } from '../atom/Balance';

export function TopMenu() {
    const { isLaptop } = useScreen();
    const { user, logout } = useAuth();

    return (
        <header
            className="flex justify-between items-center h-24  
        bg-primary-50 w-full px-8 py-4 gap-4 z-50"
        >
            {isLaptop && <TopNav />}
            <HStack
                overflow={'hidden'}
                gap={'16px'}
                width={{ base: '100%', laptop: '300px' }}
                justifyContent={{ base: 'space-between', laptop: 'flex-end' }}
            >
                <HStack gap={'16px'} overflow={'hidden'}>
                    <UserPhoto />
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
                            <Balance
                                className="text-sm text-wrap"
                                balance={user?.balance}
                            />
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
