import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { inputAnatomy } from '@chakra-ui/anatomy';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys
);

export const InputTheme = defineMultiStyleConfig({
    baseStyle: {
        field: {
            borderRadius: 2,
            color: 'text.500',
            fontSize: 'sm'
        },
        addon: {
            fontSize: 'lg'
        }
    },
    variants: {
        outline: {
            field: {
                borderColor: 'text.700',
                padding: '10px',
                height: '48px',

                _hover: {
                    boxShadow: 'inputHover'
                },
                _focus: {
                    borderColor: 'primary.500',
                    boxShadow: 'inputFocus',
                    color: 'text.900',
                    _invalid: {
                        borderColor: 'error.500',
                        boxShadow: 'inputInvalid'
                    }
                },
                _invalid: {
                    borderColor: 'error.500',
                    boxShadow: 'inputInvalid'
                },
                _disabled: {
                    _hover: {
                        borderColor: 'background.100',
                        boxShadow: 'none'
                    },
                    borderColor: 'background.100',
                    opacity: 1,
                    bg: 'background.100',
                    cursor: 'default'
                }
            },
            addon: {
                bg: 'background.50',
                color: 'text.800',
                fontSize: 'lg',
                borderWidth: 0,
                height: 'auto',
            }
        }
    }
});
