import { defineStyleConfig } from '@chakra-ui/react';

export const ButtonTheme = defineStyleConfig({
    // The styles all button have in common
    baseStyle: {
        borderRadius: '2px',
        borderWidth: '2px !important',
        _disabled: {
            cursor: 'default'
        },
    },
    sizes: {
        md: {
            padding: '8px 16px',
            fontSize: 'lg',
            fontWeight: 'normal',
            svg: {
                fontSize: '1.2em',
            },
            height: 'auto !important',
        },
        lg: {
            padding: '12px 24px',
            fontSize: 'xl',
            fontWeight: 'normal',
            svg: {
                fontSize: '1.2em',
            },
            height: 'auto !important',
        },
        square: {
            padding: '12px 24px',
            fontSize: 'xl',
            fontWeight: 'normal',
            svg: {
                fontSize: '1.2em',
            },
        },
    },
    variants: {
        solid: {
            bg: 'primary.500',
            padding: '10px',
            borderColor: 'transparent',
            _hover: {
                bg: 'primary.300'
            },
            _active: {
                bg: 'primary.200',
            },
            _disabled: {
                bg: 'primary.100 !important',
            },
            color: 'background.50',

        },
        outline: {
            borderColor: 'primary.500',
            _hover: {
                bg: 'background.100',
            },
            _active: {
                bg: 'background.200',
            },
            _disabled: {
                borderColor: 'primary.100',
                color: 'primary.100'
            },
            color: 'primary.500'
        },

        ghost: {
            bg: 'transparent',
            borderColor: 'transparent',
            _hover: {
                color: 'primary.300',
                bg: 'background.100'
            },
            _active: {
                bg: 'background.200'
            },
            _disabled: {
                color: 'primary.100'
            },
            color: 'primary.500'
        }
    },
    // The default size and variant values
    defaultProps: {}
});
