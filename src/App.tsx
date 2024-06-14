import Body from './Body';
import { ApiProvider } from './providers/ApiProvider';
import { AuthProvider } from './providers/AuthProvider';
import { ScreenProvider } from './providers/ScreenProvider';
import { FlagsProvider } from './providers/FlagsProvider';
import { ErrorProvider } from './providers/ErrorProvider';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './theme/ChakraTheme';
import { ToastProvider } from './providers/ToastProvider';
import { StrictMode } from 'react';
import { ReactQueryProvider } from './providers/ReactQueryProvider';


  

function App() {
    return (
        <StrictMode>
            <ScreenProvider>
                <FlagsProvider>
                    <ReactQueryProvider>
                        <ToastProvider>
                            <AuthProvider>
                                <ErrorProvider>
                                    <ApiProvider>
                                        <ChakraProvider theme={theme}>
                                            <Body />
                                        </ChakraProvider>
                                    </ApiProvider>
                                </ErrorProvider>
                            </AuthProvider>
                        </ToastProvider>
                    </ReactQueryProvider>
                </FlagsProvider>
            </ScreenProvider>
        </StrictMode>
    );
}

export default App;
