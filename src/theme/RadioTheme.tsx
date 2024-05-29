import { radioAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    radioAnatomy.keys
);

export const RadioTheme = defineMultiStyleConfig({
    baseStyle: {
        control: {
            borderRadius: '50%',

            bg: 'background.0 !important',
            borderWidth: '1px',
            borderColor: 'primary.500 !important',
            _checked: {},
            _disabled: {
                bg: 'background.100',
                borderColor: 'background.100'
            },
            _before: {
                width: '73% !important',
                height: '73% !important',
                bg: 'primary.500 !important'
            }
        },
        label: {
            fontSize: 'xs',
            color: 'text.900',
            _checked: {
                color: 'primary.500'
            }
        }
    },
    sizes: {
        md: {
            control: {
                width: '16px',
                height: '16px',
                    
            },
            label: {
                marginLeft: '8px',
                fontSize: 'sm'
            }
        }
    }
});
