import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { inputAnatomy } from "@chakra-ui/anatomy";

const { defineMultiStyleConfig: defineMultiStyleConfigInput } =
    createMultiStyleConfigHelpers(inputAnatomy.keys);

export const InputTheme = defineMultiStyleConfigInput({
    baseStyle: {

        field: {
            borderRadius: 2,
            color: 'text.500',
            fontSize: 'sm',
        },
        addon: {
            fontSize: 'lg',
        },
    },
    variants: {
        outline: {
            field: {
                borderColor: 'text.700',

                _hover: {
                    boxShadow: 'inputHover',

                },
                _focus: {
                    borderColor: 'primary.500',
                    boxShadow: 'inputFocus',
                    color: 'text.900',
                    _invalid: {
                        borderColor: 'error.500',
                        boxShadow: 'inputInvalid',
                    },
                },
                _invalid: {
                    borderColor: 'error.500',
                    boxShadow: 'inputInvalid',
                },
                _disabled: {
                    _hover: {
                        borderColor: 'background.100',
                        boxShadow: 'none',

                    },
                    borderColor: 'background.100',
                    opacity: 1,
                    bg: 'background.100',
                    cursor: 'default',
                },
            },
            addon: {
            },
        },
    },


});