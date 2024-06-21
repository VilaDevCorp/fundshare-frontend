import { defineStyleConfig } from '@chakra-ui/react';

export const ButtonTheme = defineStyleConfig({
    // The styles all button have in common
    baseStyle: {
        borderRadius: '2px',
        boxShadow: 'sm',
        borderWidth: '2px !important',
        _disabled: {
            cursor: 'default'
        },
        _focus: {
            boxShadow: 'sm'
        },
        _active: {
            boxShadow: 'none'
        }
    },
    sizes: {
        md: {
            padding: '8px 16px',
            fontSize: 'lg',
            fontWeight: 'normal',
            svg: {
                fontSize: '1.2em'
            },
            height: 'auto !important',
        },
        square: {
            flexShrink: 0,
            padding: '12px 24px',
            fontSize: 'xl',
            height: '48px',
            width: '48px',
            minWidth: '48px',
            minHeight: '48px',
            fontWeight: 'normal',
            svg: {
                fontSize: '1.2em'
            }
        }
    },
    variants: {
        solid: {
            bg: 'primary.500',
            borderColor: 'transparent',
            _hover: {
                bg: 'primary.300'
            },
            _active: {
                bg: 'primary.600',
                boxShadow: 'none'
            },
            _focus: {
                boxShadow: 'sm'
            },
            _disabled: {
                bg: 'primary.300 !important',
                filter: 'brightness(0.7)'
            },
            color: 'neutral.100'
        },
        solid_error: {
            bg: 'error.500',
            borderColor: 'transparent',
            _hover: {
                bg: 'error.300'
            },
            _active: {
                bg: 'error.600',
                boxShadow: 'none'
            },
            _disabled: {
                bg: 'error.100 !important'
            },
            color: 'neutral.0'
        },
        outline: {
            borderColor: 'primary.500',
            bg: 'neutral.100',
            _hover: {
                bg: 'neutral.0'
            },
            _active: {
                bg: 'neutral.200'
            },
            _disabled: {
                borderColor: 'primary.100',
                color: 'primary.100'
            },
            color: 'primary.500'
        },
        ghost: {
            bg: 'transparent',
            boxShadow: 'none',
            borderColor: 'transparent !important',
            _hover: {
                bg:'transparent',
                backdropFilter: 'brightness(0.95)'
            },
            _active: {
                bg: 'transparent',
                color: 'primary.700',
                backdropFilter: 'brightness(0.90)'
            },
            _disabled: {
                opacity: 0.2
            },
            color: 'primary.500'
        },
        ghost_error: {
            bg: 'transparent',
            borderColor: 'transparent',
            boxShadow: 'none !important',
            _hover: {
                backdropFilter: 'brightness(0.95)'
            },
            _active: {
                bg: 'transparent',
                color: 'error.700',

                backdropFilter: 'brightness(0.90)'
            },
            color: 'error.500'
        }
    },
    // The default size and variant values
    defaultProps: {}
});
