import { extendTheme } from '@chakra-ui/react';
import {} from '@chakra-ui/anatomy';
import { ButtonTheme } from './ButtonTheme';
import { HeadingTheme } from './HeadingTheme';

const colors = {};

export const theme = extendTheme({
    styles: {
        global: () => ({
            body: {
                bg: 'background',
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
