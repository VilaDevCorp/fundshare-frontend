import { extendTheme } from '@chakra-ui/react';
import { } from '@chakra-ui/anatomy';
import { ButtonTheme } from './ButtonTheme';
import { HeadingTheme } from './HeadingTheme';

const colors = {
    primary: {
        50: "#55ABA9",
        100: "#3E9A98",
        200: "#298988",
        300: "#187877",
        400: "#0A6866",
        500: "#005654",
        600: "#004E4D",
        700: "#004544",
        800: "#003D3C",
        900: "#003433",
        1000: "#002B2B",
        disabled: "#002322",
    },

    background: {
        50: "#F6F6F6",
        100: "#E9E9E9",
        200: "#D9D9D9",
        300: "#C8C8C8",
        400: "#B5B5B5",
        500: "#A0A0A0",
        600: "#898989",
        700: "#707070",
        800: "#555555",
        900: "#2D2D2D",
    },
   
    transparent: "transparent",
};
export const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                bg: 'background.50',
                color: 'primary.900'
            }
        })
    },

    colors,
    components: {
        Button: ButtonTheme,
        Heading: HeadingTheme
    }
});
