import { Layout } from '../components/organism/Layout';
import { Typography } from '../components/ui/Typography';
import {
    Button,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tooltip,
    useDisclosure
} from '@chakra-ui/react';
import { Icon } from '../components/atom/Icon';
import { useScreen } from '../hooks/useScreen';
import { useCrud } from '../hooks/useCrud';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Debt, Group } from '../types/entities';
import { useNavigate, useParams } from 'react-router-dom';
import { GroupUsersSection } from '../components/organism/GroupUsersSection';
import { GroupProvider } from '../providers/GroupProvider';
import { AddPaymentModal } from '../components/organism/AddPaymentModal';
import { GroupPaymentsSection } from '../components/organism/GroupPaymentsSection';
import { GroupDebtsSection } from '../components/organism/GroupDebtsSection';
import { UserDebtsSection } from '../components/organism/UserDebtsSection';
import { ConfirmationModal } from '../components/organism/ConfirmationModal';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';
import { useError } from '../hooks/useError';
import { ApiError, ErrorCode } from '../types/types';
import { LoadingIndicator } from '../components/atom/LoadingIndicator';

export function GroupDetailsScreen() {
    const {
        isOpen: isOpenPayment,
        onOpen: onOpenPayment,
        onClose: onClosePayment
    } = useDisclosure();

    const {
        isOpen: isOpenConfirm,
        onOpen: onOpenConfirm,
        onClose: onCloseConfirm
    } = useDisclosure();

    const { isLaptop } = useScreen();
    const navigate = useNavigate();
    const { user: loggedUser } = useAuth();
    const { showToast } = useToast();
    const { kickGroupUser } = useApi();

    const { id } = useParams();

    const { get } = useCrud<Group>('group');

    const { data: group, isLoading: isLoadingGroup } = useQuery<Group>({
        queryKey: ['group', id],
        enabled: !!id,
        queryFn: () => get(id as string)
    });

    const { setError } = useError();

    const { search: searchDebts } = useCrud<Debt>('debt');

    const { data: debts, isLoading: isLoadingDebts } = useQuery({
        queryKey: ['groupDebts'],
        enabled: !!group?.id,
        queryFn: () => searchDebts(0, null, { groupId: group!.id })
    });

    const { mutate: onLeaveGroup } = useMutation({
        mutationFn: async () => {
            if (group && loggedUser) {
                await kickGroupUser(group.id, loggedUser.username);
            }
        },
        onSuccess: () => {
            showToast('success', `You have left the group ${group?.name}`);
            navigate('/groups');
        },
        onError: (e) => {
            if (e instanceof Error) {
                if (e instanceof ApiError) {
                    if (e.code === ErrorCode.NON_ZERO_BALANCE)
                        showToast(
                            'error',
                            'You cant leave the group with a non zero balance'
                        );
                }
            } else {
                setError(e);
            }
        }
    });

    return (
        <Layout minH="lg:min-h-[750px] !h-auto lg:!h-[calc(100vh-96px)]">
            <GroupProvider
                value={{ group, debts, isLoadingGroup, isLoadingDebts }}
            >
                <div className="max-w-[1200px] w-full flex flex-col ml-auto mr-auto h-full overflow-hidden">
                    {group ? (
                        <>
                            {isLaptop ? (
                                <div className="h-[80px]">
                                    <div className="flex justify-between mb-4">
                                        <Typography type="title">
                                            {group?.name}
                                        </Typography>
                                        <div className="flex gap-4">
                                            <Tooltip
                                                label={
                                                    group.createdBy
                                                        ?.username ===
                                                        loggedUser?.username &&
                                                    "You can't leave a group that you created"
                                                }
                                            >
                                                <Button
                                                    isDisabled={
                                                        group.createdBy
                                                            ?.username ===
                                                        loggedUser?.username
                                                    }
                                                    variant={'ghost_error'}
                                                    onClick={onOpenConfirm}
                                                >
                                                    {'Leave group'}
                                                </Button>
                                            </Tooltip>
                                            <Button
                                                leftIcon={<Icon type="money" />}
                                                onClick={onOpenPayment}
                                            >
                                                {'Add payment'}
                                            </Button>
                                        </div>
                                    </div>
                                    <Typography type="body">
                                        {group?.description}
                                    </Typography>
                                </div>
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
                                        onClick={onOpenPayment}
                                    >
                                        {'Add payment'}
                                    </Button>
                                    <Button
                                        isDisabled={
                                            group.createdBy?.username ===
                                            loggedUser?.username
                                        }
                                        variant={'ghost_error'}
                                        onClick={onOpenConfirm}
                                    >
                                        {'Leave group'}
                                    </Button>

                                    <UserDebtsSection />
                                </div>
                            )}
                            {isLaptop ? (
                                <div className="w-full flex flex-col gap-8 py-6 h-[calc(100%-80px)]">
                                    <div className="w-full h-1/3 flex gap-8">
                                        <UserDebtsSection />
                                        <GroupDebtsSection />
                                    </div>
                                    <div className="w-full h-2/3 flex gap-8">
                                        <GroupPaymentsSection />
                                        <GroupUsersSection />
                                    </div>
                                </div>
                            ) : (
                                <Tabs marginTop={'1rem'} height={'400px'}>
                                    <TabList>
                                        <Tab>{'History'}</Tab>
                                        <Tab>{'Debts'}</Tab>
                                        <Tab>{'Users'}</Tab>
                                    </TabList>

                                    <TabPanels height={'345px'}>
                                        <TabPanel>
                                            <GroupPaymentsSection />
                                        </TabPanel>
                                        <TabPanel>
                                            <GroupDebtsSection />
                                        </TabPanel>
                                        <TabPanel paddingTop={'8px'}>
                                            <GroupUsersSection />
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                            )}{' '}
                        </>
                    ) : (
                        <article className="flex flex-col  items-center justify-center h-[300px]">
                            <LoadingIndicator />
                        </article>
                    )}

                    {isOpenPayment && (
                        <AddPaymentModal
                            isOpen={isOpenPayment}
                            onClose={onClosePayment}
                        />
                    )}
                    {isOpenConfirm && (
                        <ConfirmationModal
                            isOpen={isOpenConfirm}
                            title="Leave group"
                            message="Are you sure you want to leave the group?"
                            onConfirm={() => onLeaveGroup()}
                            onClose={onCloseConfirm}
                        />
                    )}
                </div>
            </GroupProvider>
        </Layout>
    );
}
