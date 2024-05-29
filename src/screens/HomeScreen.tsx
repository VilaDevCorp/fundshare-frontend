import { useAuth } from '../hooks/useAuth';
import { Layout } from '../components/organism/Layout';

export function HomeScreen() {
    const { user } = useAuth();
    return (
        <Layout>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
            <h1 className='mb-10'>{`HELLO, ${user?.username}`}</h1>
        </Layout>
    );
}
