import { useAuth } from '../hooks/useAuth';
import { Layout } from '../components/organism/Layout';

export function HomeScreen() {
    const { user } = useAuth();
    return (
        <Layout>
            <h1>{`HELLO, ${user?.username}`}</h1>
        </Layout>
    );
}
