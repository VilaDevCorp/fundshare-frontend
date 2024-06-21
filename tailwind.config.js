import colors from 'tailwindcss/colors';

//Defined size values:
//4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 192px, 256px, 384px, 512px, 640px, 768px

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    safelist: [{ pattern: /.{background|primary}./ }],
    theme: {
        fontSize: {
            xs: ['0.625rem', '1rem'], // 10px
            sm: ['0.75rem', '1.25rem'], // 12px
            md: ['0.875rem', '1.5rem'], // 14px
            lg: ['1rem', '1.75rem'], // 16px
            xl: ['1.125rem', '1.75rem'], // 18px
            '2xl': ['1.375rem', '2rem'], // 22px
            '3xl': ['1.75rem', '2.25rem'] // 28px
        },
        colors: {
            ...colors,
            primary: {
                0: 'hsl(173, 89%, 90%)',
                100: 'hsl(179, 79%, 58%)',
                200: 'hsl(179, 78%, 40%)',
                300: 'hsl(179, 75%, 35%)',
                400: 'hsl(179, 76%, 30%)',
                500: 'hsl(179, 70%, 25%)',
                600: 'hsl(179, 78%, 18%)',
                700: 'hsl(180, 79%, 13%)',
                800: 'hsl(180, 84%, 10%)',
                900: 'hsl(180, 85%, 8%)'
            },
            neutral: {
                0: 'hsl(210, 22%, 98%)',
                100: 'hsl(210, 22%, 96%)',
                200: 'hsl(210, 21%, 94%)',
                300: 'hsl(210, 21%, 88%)',
                400: 'hsl(210, 17%, 77%)',
                500: 'hsl(210, 15%, 74%)',
                600: 'hsl(210, 14%, 70%)',
                700: 'hsl(210, 13%, 67%)',
                800: 'hsl(210, 12%, 63%)',
                900: 'hsl(210, 10%, 30%)',
                1000: 'hsl(210, 10%, 20%)'
            },
            accent: {
                100: 'hsl(89, 92%, 80%)',
                200: 'hsl(90, 88%, 74%)',
                300: 'hsl(92, 82%, 69%)',
                400: 'hsl(95, 60%, 57%)',
                500: 'hsl(97, 54%, 50%)',
                600: 'hsl(97, 63%, 44%)',
                700: 'hsl(97, 79%, 34%)',
                800: 'hsl(97, 83%, 30%)',
                900: 'hsl(97, 88%, 27%)'
            },

            error: {
                100: 'hsl(0, 100%, 85%)',
                200: 'hsl(2, 91%, 82%)',
                300: 'hsl(3, 89%, 79%)',
                400: 'hsl(6, 59%, 55%)',
                500: 'hsl(6, 55%, 46%)',
                600: 'hsl(6, 59%, 39%)',
                700: 'hsl(6, 65%, 30%)',
                800: 'hsl(6, 78%, 20%)',
                900: 'hsl(6, 95%, 15%)'
            },

            transparent: 'transparent'
        },
        extend: {
            boxShadow: {
                sm: '0px 1px 0px rgba(0,0,0,0.1)',
                sm_top: '0px -1px 0px rgba(0,0,0,0.1)',
                md: '0px 2px 0px rgba(0,0,0,0.1)',
                lg: '0px 4px 0px rgba(0,0,0,0.1)'
            },

            keyframes: {},
            animation: {}
        }
    },
    plugins: []
};
