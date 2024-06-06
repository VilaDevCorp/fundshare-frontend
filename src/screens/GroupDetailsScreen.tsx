import { Layout } from '../components/organism/Layout';
import { Typography } from '../components/ui/Typography';
import {
    Button,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useDisclosure
} from '@chakra-ui/react';
import { Icon } from '../components/atom/Icon';
import { useScreen } from '../hooks/useScreen';
import { useCrud } from '../hooks/useCrud';
import { useQuery } from '@tanstack/react-query';
import { Group } from '../types/entities';
import { useParams } from 'react-router-dom';
import { GroupUsersSection } from '../components/organism/GroupUsersSection';
import { GroupProvider } from '../providers/GroupProvider';
import { AddPaymentModal } from '../components/organism/AddPaymentModal';
import { GroupPaymentsSection } from '../components/organism/GroupPaymentsSection';

export function GroupDetailsScreen() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isTablet } = useScreen();

    const { id } = useParams();

    const { get } = useCrud<Group>('group');

    const { data: group } = useQuery<Group>({
        queryKey: ['group', id],
        enabled: !!id,
        queryFn: () => get(id as string)
    });

    return (
        <Layout>
            <GroupProvider group={group}>
                <div className="max-w-[1200px] w-full flex flex-col ml-auto mr-auto">
                    {group ? (
                        <>
                            {isTablet ? (
                                <>
                                    <div className="flex justify-between mb-4">
                                        <Typography type="title">
                                            {group?.name}
                                        </Typography>

                                        <Button
                                            leftIcon={<Icon type="money" />}
                                            onClick={onOpen}
                                        >
                                            {'Add payment'}
                                        </Button>
                                    </div>
                                    <Typography type="body">
                                        {group?.description}
                                    </Typography>
                                </>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <Typography type="title">
                                        {group?.name}
                                    </Typography>
                                    <Typography type="body">
                                        {group?.description}
                                    </Typography>
                                    <Button
                                        leftIcon={<Icon type="money" />}
                                        onClick={onOpen}
                                    >
                                        {'Add payment'}
                                    </Button>
                                </div>
                            )}
                            {isTablet ? (
                                <div className="w-full grid-cols-2 grid gap-4 mt-8">
                                    <GroupUsersSection />
                                    <GroupPaymentsSection />
                                    <GroupUsersSection />
                                    <GroupUsersSection />
                                </div>
                            ) : (
                                <Tabs marginTop={'1rem'}>
                                    <TabList>
                                        <Tab>{'History'}</Tab>
                                        <Tab>{'Debts'}</Tab>
                                        <Tab>{'Users'}</Tab>
                                    </TabList>

                                    <TabPanels>
                                        <TabPanel>
                                            <GroupPaymentsSection />
                                        </TabPanel>
                                        <TabPanel>
                                            <p>two!</p>
                                        </TabPanel>
                                        <TabPanel>
                                            <GroupUsersSection />
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            )}{' '}
                        </>
                    ) : (
                        <Typography type="title">{'Loading...'}</Typography>
                    )}

                    {isOpen && (
                        <AddPaymentModal isOpen={isOpen} onClose={onClose} />
                    )}
                </div>
            </GroupProvider>
        </Layout>
    );
}
