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
import { BadgeTheme } from './BadgeTheme';

//Defined size values:
//4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px, 192px, 256px, 384px, 512px, 640px, 768px

const colors = {
    primary: {
        0: 'hsl(179, 100%, 92%)',
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
};

const fontSizes = {
    xs: '0.625rem', // 10px
    sm: '0.75rem', // 12px
    md: '0.875rem', // 14px
    lg: '1rem', // 16px
    xl: '1.125rem', // 18px
    '2xl': '1.375rem', // 22px
    '3xl': '1.75rem' // 28px
};

const fontWeights = {
    light: 300,
    normal: 400,
    medium: 500,
    bold: 700
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
    sm: '0px 1px 0px rgba(0,0,0,0.1)',
    sm_top: '0px -1px 0px rgba(0,0,0,0.1)',
    md: '0px 2px 0px rgba(0,0,0,0.1)',
    lg: '0px 4px 0px rgba(0,0,0,0.1)',
    inputFocus: '0 0 0 1px #005654',
    inputInvalid: '0 0 0 1px #C84B4B',
    inputHover: '0 0 0 1px #C8C8C8'
};

export const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                bg: 'neutral.200',
                color: 'neutral.900'
            }
        })
    },
    fontSizes,
    fontWeights,
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
        Checkbox: CheckboxTheme,
        Badge: BadgeTheme
    }
});
