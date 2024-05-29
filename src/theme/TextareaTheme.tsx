import { defineStyleConfig } from '@chakra-ui/react';

export const TextareaTheme = defineStyleConfig({
    baseStyle: {
        borderRadius: 2,
        color: 'text.500',
        fontSize: 'sm'
    },
    variants: {
        outline: {
            borderColor: 'text.700',
            padding: '10px',
            height: '48px',
            resize: 'none',

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
        }
    }
});
