import { defineStyleConfig } from '@chakra-ui/react';

export const HeadingTheme = defineStyleConfig({
    // The styles all button have in common
    baseStyle: {
        color:'neutral.900'
    },
    // Two sizes: sm and md
    sizes: {
        xl: {
            fontSize: '2xl',
            fontWeight: 'light'
        },
        lg: {
            fontSize: 'xl',
            fontWeight: 'normal'
        },
        md: {
            fontSize: 'md',
            fontWeight: 'normal'
        },
        sm: {
            fontSize: 'sm',
            fontWeight: 'normal'
        },
    }
});
