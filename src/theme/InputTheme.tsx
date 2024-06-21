import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { inputAnatomy } from '@chakra-ui/anatomy';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    inputAnatomy.keys
);

export const InputTheme = defineMultiStyleConfig({
    baseStyle: {
        field: {
            borderRadius: 2,
            color: 'neutral.900',
            fontSize: 'md'
        },
        addon: {
            fontSize: 'lg'
        }
    },
    variants: {
        outline: {
            field: {
                borderColor: 'neutral.700',
                padding: '10px',
                bg: 'neutral.200',
                color: 'neutral.800',

                height: '48px',

                _hover: {
                    boxShadow: 'inputHover'
                },
                _focus: {
                    borderColor: 'primary.500',
                    boxShadow: 'inputFocus',
                    color: 'neutral.900',
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
                        borderColor: 'neutral.100',
                        boxShadow: 'none'
                    },
                    borderColor: 'neutral.100',
                    opacity: 1,
                    bg: 'neutral.100',
                    cursor: 'default'
                }
            },
            addon: {
                bg: 'transparent',
                color: 'neutral.800',
                fontSize: 'xl',
                borderWidth: 0,
                height: 'auto'
            }
        }
    }
});
