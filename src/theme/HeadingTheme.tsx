import { defineStyleConfig } from '@chakra-ui/react';

export const HeadingTheme = defineStyleConfig({
    // The styles all button have in common
    baseStyle: {},
    // Two sizes: sm and md
    sizes: {
        xl: {
            fontSize: '3xl',
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
