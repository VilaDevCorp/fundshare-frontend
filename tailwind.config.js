import colors from 'tailwindcss/colors';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    safelist: [{ pattern: /.{background|primary}./ }],
    theme: {
        colors: {
            ...colors,
            primary: {
                50: '#C7E8E8',
                100: '#3E9A98',
                200: '#298988',
                300: '#187877',
                400: '#0A6866',
                500: '#005654',
                600: '#004E4D',
                700: '#004544',
                800: '#003D3C',
                900: '#003433',
                1000: '#002B2B',
                disabled: '#002322'
            },
        
            background: {
                0: '#F4F4F4',
                50: '#EEEEEE',
                100: '#E9E9E9',
                200: '#E3E3E3',
                300: '#DDDDDD',
                400: '#D8D8D8',
                500: '#D2D2D2',
                600: '#CDCDCD',
                700: '#B3B3B3',
                800: '#9F9F9F',
                900: '#888888'
            },
        
            text: {
                0: '#FFFFFF',
                50: '#F6F6F6',
                100: '#E9E9E9',
                200: '#D9D9D9',
                300: '#C8C8C8',
                400: '#B5B5B5',
                500: '#A0A0A0',
                600: '#898989',
                700: '#707070',
                800: '#555555',
                900: '#2D2D2D'
            },
        
            error: {
                50: '#FFEBEB',
                100: '#FFD1D1',
                200: '#FFB6B6',
                300: '#FF9A9A',
                400: '#FF7F7F',
                500: '#C84B4B',
                600: '#B93F3F',
                700: '#A93333',
                800: '#9A2727',
                900: '#8B1B1B'
            },
        
            transparent: 'transparent'
        },
        extend: {
            keyframes: {},
            animation: {}
        }
    },
    plugins: []
};
