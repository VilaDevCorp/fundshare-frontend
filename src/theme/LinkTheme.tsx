import { defineStyleConfig } from '@chakra-ui/react';

export const LinkTheme = defineStyleConfig({
    baseStyle: {
        color: 'accent.600',
        fontSize: 'md',
        _hover: {
            textDecoration: 'underline',
        }
    }
});
