import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
import { numberInputAnatomy } from '@chakra-ui/anatomy';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    numberInputAnatomy.keys
);

export const NumberInputTheme = defineMultiStyleConfig({
    baseStyle: {
        field: {
            borderRadius: 2,
            color: 'neutral.500',
            fontSize: 'xl',
            textAlign: 'end'
        }
    },
    variants: {
        outline: {
            field: {
                borderColor: 'neutral.700',
                padding: '10px',
                height: '48px',
                bg: 'neutral.100',
                color: 'neutral.900',


                _hover: {
                    boxShadow: 'inputHover'
                },
                _focus: {
                    borderColor: 'primary.500',
                    boxShadow: 'inputFocus',
                    color: 'neutral.1000',
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
                    cursor: 'default'
                }
            }
        }
    }
});
