import { defineStyleConfig } from '@chakra-ui/react';

export const ButtonTheme = defineStyleConfig({
    // The styles all button have in common
    baseStyle: {},
    // Two sizes: sm and md
    sizes: {},
    // Two variants: outline and solid
    variants: {
        outline: {
            border: '2px solid',
            borderColor: 'primary.600',
            _hover: {},
            _dark: {
                color: 'primary.200'
            },
            color: 'primary.900'
        },
        solid: {
            bg: 'primary.600',
            _hover: {
                bg: 'primary.500'
            },
            _disabled: {
                bg: 'primary.600 !important'
            },
            color: 'white'
        },
        ghost: {
            bg: 'transparent',
            _hover: {
                color: 'primary.900',
                bg: 'transparent !important'
            },
            _disabled: {
                color: 'primary.50'
            },
            color: 'primary.500'
        }
    },
    // The default size and variant values
    defaultProps: {}
});
