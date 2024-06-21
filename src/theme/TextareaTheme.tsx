import { defineStyleConfig } from '@chakra-ui/react';

export const TextareaTheme = defineStyleConfig({
    baseStyle: {
        borderRadius: 2,
        color: 'neutral.800',
        fontSize: 'md'
    },
    variants: {
        outline: {
            borderColor: 'neutral.700',
            padding: '10px',
            height: '48px',
            resize: 'none',
            bg: 'neutral.200',

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
        }
    }
});
