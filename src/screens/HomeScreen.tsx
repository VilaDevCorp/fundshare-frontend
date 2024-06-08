import { Layout } from '../components/organism/Layout';
import { HomeDebtsSection } from '../components/organism/HomeDebtsSection';
import { HomePaymentsSection } from '../components/organism/HomePaymentsSection';
import { useScreen } from '../hooks/useScreen';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';

export function HomeScreen() {
    const { isTablet } = useScreen();

    return (
        <Layout>
            {isTablet ? (
                <div
                    className={`max-w-[1200px] w-full flex flex-col  gap-8 ml-auto mr-auto md:flex-row`}
                >
                    <HomeDebtsSection />
                    <HomePaymentsSection />
                </div>
            ) : (
                <Tabs>
                    <TabList>
                        <Tab>{'My debts'}</Tab>
                        <Tab>{'Recent payments'}</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <HomeDebtsSection />
                        </TabPanel>
                        <TabPanel>
                            <HomePaymentsSection />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            )}
        </Layout>
    );
}
