import { extendTheme } from '@chakra-ui/react';
import {} from '@chakra-ui/anatomy';
import { ButtonTheme } from './ButtonTheme';
import { HeadingTheme } from './HeadingTheme';
import { InputTheme } from './InputTheme';
import { NumberInputTheme } from './NumberInputTheme';
import { LinkTheme } from './LinkTheme';
import { TextareaTheme } from './TextareaTheme';
import { RadioTheme } from './RadioTheme';
import { SliderTheme } from './SliderTheme';
import { TabsTheme } from './TabsTheme';
import { ModalTheme } from './ModalTheme';
import { CheckboxTheme } from './CheckboxTheme';

const colors = {
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
        50: '#E9AEAE',
        100: '#E39B9B',
        200: '#DD8A8A',
        300: '#D87979',
        400: '##D26868',
        500: '#C84B4B',
        600: '#B93F3F',
        700: '#A93333',
        800: '#9A2727',
        900: '#8B1B1B'
    },

    transparent: 'transparent'
};

const fontSizes = {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '1.875rem',
    '3xl': '2rem'
};

const breakpoints = {
    base: '0em', // 0px,
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1440px'
};

const shadows = {
    inputFocus: '0 0 0 1px #005654',
    inputInvalid: '0 0 0 1px #C84B4B',
    inputHover: '0 0 0 1px #C8C8C8'
};

export const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                bg: 'background.50',
                color: 'text.900'
            }
        })
    },
    fontSizes,
    colors,
    shadows,
    breakpoints,
    components: {
        Button: ButtonTheme,
        Heading: HeadingTheme,
        Input: InputTheme,
        NumberInput: NumberInputTheme,
        Link: LinkTheme,
        Textarea: TextareaTheme,
        Radio: RadioTheme,
        Slider: SliderTheme,
        Tabs: TabsTheme,
        Modal: ModalTheme,
        Checkbox: CheckboxTheme
    }
});
