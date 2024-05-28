import { useAuth } from '../../hooks/useAuth';
import logo from '/logo.svg';
import { TopMenu } from '../molecule/TopMenu';
import { BottomNav } from '../molecule/BottomNav';
import { useScreen } from '../../hooks/useScreen';

export function Layout({
    children,
    isPublic
}: {
    children: React.ReactNode;
    isPublic?: boolean;
}) {
    const { user } = useAuth();
    const { isLaptop } = useScreen();

    return isPublic || user ? (
        //Public Layout
        isPublic ? (
            <main className="min-h-full flex-col md:h-auto md:min-h-full w-full p-4 flex backdrop-blur-sm items-center justify-center overflow-auto">
                {children}
            </main>
        ) : (
            //Private layout
            <>
                <TopMenu />
                <main
                    className={`w-full flex flex-col h-full max-w-[500px] m-auto p-8 gap-8`}
                >
                    {children}
                </main>
                {!isLaptop && <BottomNav />}
            </>
        )
    ) : (
        //Not logged in layout
        <div
            className={`min-h-full flex  flex-col items-center bg-center md:min-h-full h-screen w-full`}
        >
            <main
                className={`flex rounded-lg h-full md:h-auto items-center flex-col gap-6 w-full overflow-auto`}
            >
                <img
                    src={logo}
                    alt="Web logo"
                    className="mb-10 self-center  w-[200px]"
                />
                <h2>{'You need an account to view this page'}</h2>
                <Button onClick={() => navigate('/login')}>{'Sign in'}</Button>
            </main>
        </div>
    );
}
