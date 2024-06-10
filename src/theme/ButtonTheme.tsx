import { defineStyleConfig } from '@chakra-ui/react';

export const ButtonTheme = defineStyleConfig({
    // The styles all button have in common
    baseStyle: {
        borderRadius: '2px',
        borderWidth: '2px !important',
        _disabled: {
            cursor: 'default'
        },
        _focus: {
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
            height: 'auto !important'
        },
        square: {
            padding: '12px 24px',
            fontSize: 'xl',
            height: '48px',
            width: '48px',
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
                bg: 'primary.200'
            },
            _disabled: {
                bg: 'primary.100 !important'
            },
            color: 'text.0'
        },
        solid_error: {
            bg: 'error.500',
            borderColor: 'transparent',
            _hover: {
                bg: 'error.300'
            },
            _active: {
                bg: 'error.200'
            },
            _disabled: {
                bg: 'error.100 !important'
            },
            color: 'text.0'
        },
        outline: {
            borderColor: 'primary.500',
            _hover: {
                bg: 'background.100'
            },
            _active: {
                bg: 'background.200'
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
            _enabled: {
                _hover: {
                    bg: 'transparent',
                    color: 'primary.300',
                    backdropFilter: 'brightness(0.95)'
                }
            },

            _active: {
                bg: 'transparent',
                color: 'primary.300',

                backdropFilter: 'brightness(0.90)'
            },
            _disabled: {
                color: 'primary.100'
            },
            color: 'primary.500'
        },
        ghost_error: {
            bg: 'transparent',
            borderColor: 'transparent',
            _enabled: {
                _hover: {
                    bg: 'transparent',
                    color: 'error.300',
                    backdropFilter: 'brightness(0.95)'
                }
            },
            _active: {
                bg: 'transparent',
                color: 'error.300',

                backdropFilter: 'brightness(0.90)'
            },
            _disabled: {
                color: 'error.100'
            },
            color: 'error.500'
        }
    },
    // The default size and variant values
    defaultProps: {}
});
