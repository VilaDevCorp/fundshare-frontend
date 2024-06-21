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
            className="flex justify-between items-center h-24 min-h-24  
        bg-primary-0 w-full px-4 py-2 gap-4 z-50 shadow-sm"
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
                            data-cy={'top_menu_username'}
                            as={'span'}
                            fontSize={'md'}
                            color={'neutral.900'}
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
                            fontWeight={'bold'}
                            textOverflow={'ellipsis'}
                            overflow={'hidden'}
                            whiteSpace={'nowrap'}
                            noOfLines={2}
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
