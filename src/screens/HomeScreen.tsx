import { Layout } from '../components/organism/Layout';
import { HomeDebtsSection } from '../components/organism/HomeDebtsSection';

export function HomeScreen() {
    return (
        <Layout>
            <div className="max-w-[1200px] w-full flex gap-6 ml-auto mr-auto">
                <HomeDebtsSection />
                <HomeDebtsSection />
            </div>
        </Layout>
    );
}
