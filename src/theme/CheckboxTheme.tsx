import { checkboxAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    checkboxAnatomy.keys
);

export const CheckboxTheme = defineMultiStyleConfig({
    baseStyle: {
        control: {
            borderColor: 'text.700',
            borderWidth: '1px',
            _checked: {
                bg: 'primary.500',
                borderColor: 'primary.500'
            }
        }
    },
    sizes: {
        md: {
            control: {
                width: '24px',
                height: '24px'
            }
        }
    }
});
