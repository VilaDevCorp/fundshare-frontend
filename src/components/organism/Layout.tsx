// import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '@chakra-ui/react';
import { TopMenu } from '../molecule/TopMenu';
import { BottomNav } from '../molecule/BottomNav';
import { useScreen } from '../../hooks/useScreen';
import { PublicFormLayout } from './PublicFormLayout';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../ui/Typography';

export function Layout({
    children,
    isPublic,
    minH
}: {
    children: React.ReactNode;
    isPublic?: boolean;
    minH?: string;
}) {
    const { user } = useAuth();
    const navigate = useNavigate();

    const { isLaptop } = useScreen();

    return isPublic || user ? (
        //Public Layout
        isPublic ? (
            <main
                className="min-h-full flex-col md:h-auto md:min-h-full w-full p-4 flex 
            backdrop-blur-sm items-center overflow-auto"
            >
                {children}
            </main>
        ) : (
            //Private layout
            <>
                <TopMenu />
                <main
                    className={`w-full flex flex-col px-4 py-2 md:px-8 md:py-4 gap-8 
                    h-[calc(100vh-96px-104px)] md:h-[calc(100vh-96px)] ${minH}`}
                >
                    {children}
                </main>
                {!isLaptop && <BottomNav />}
            </>
        )
    ) : (
        //Not logged in layout
        <main className="min-h-full flex-col md:h-auto md:min-h-full w-full p-4 flex backdrop-blur-sm items-center justify-center overflow-auto">
            <PublicFormLayout>
                <Typography type="subtitle" textAlign={'center'}>
                    {'You need an account to view this page'}
                </Typography>
                <Button
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    {'Sign in  '}
                </Button>
            </PublicFormLayout>
        </main>
    );
}
