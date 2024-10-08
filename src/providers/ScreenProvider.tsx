import { createContext, ReactNode, useEffect, useState } from 'react';

interface ScreenContext {
    screenWidth: number;
    screenHeight: number;
    isDesktop: boolean;
    isLaptop: boolean;
    isTablet: boolean;
    isMobileL: boolean;
    isMobileM: boolean;
}

const ScreenWidthEnum = {
    MOBILE_S: 320,
    MOBILE_M: 375,
    MOBILE_L: 425,
    TABLET: 768,
    LAPTOP: 1024,
    DESKTOP: 1440
};

export const ScreenContext = createContext<ScreenContext>({} as ScreenContext);

export const ScreenProvider = ({ children }: { children: ReactNode }) => {
    const [screenWidth, setScreenWidth] = useState<number>(window.screen.width);
    const [screenHeight, setScreenHeight] = useState<number>(
        window.screen.height
    );
    const isMobileM = screenWidth >= ScreenWidthEnum.MOBILE_M;
    const isMobileL = screenWidth >= ScreenWidthEnum.MOBILE_L;
    const isTablet = screenWidth >= ScreenWidthEnum.TABLET;
    const isLaptop = screenWidth >= ScreenWidthEnum.LAPTOP;
    const isDesktop = screenWidth >= ScreenWidthEnum.DESKTOP;

    const onResize = () => {
        console.log(isTablet, isMobileL, isMobileM, isLaptop, isDesktop)
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, []);

    const value: ScreenContext = {
        screenWidth,
        screenHeight,
        isDesktop,
        isLaptop,
        isTablet,
        isMobileL,
        isMobileM
    };

    return (
        <ScreenContext.Provider value={value}>
            {children}
        </ScreenContext.Provider>
    );
};
