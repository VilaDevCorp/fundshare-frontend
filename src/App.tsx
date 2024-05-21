import Body from './Body';
import { ApiProvider } from './providers/ApiProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ScreenProvider } from './providers/ScreenProvider';
import { FlagsProvider } from './providers/FlagsProvider';
import { ErrorProvider } from './providers/ErrorProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
    return (
        <ScreenProvider>
            <FlagsProvider>
                <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                        <ErrorProvider>
                            <ApiProvider>
                                <Body />
                            </ApiProvider>
                        </ErrorProvider>
                    </AuthProvider>
                </QueryClientProvider>
            </FlagsProvider>
        </ScreenProvider>
    );
}

export default App;
