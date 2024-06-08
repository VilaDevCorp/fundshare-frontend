import { defineStyleConfig } from '@chakra-ui/react';

export const LinkTheme = defineStyleConfig({
    baseStyle: {
        color: 'primary.100',
        fontSize: 'md',
        textDecoration: 'underline',
        _hover: {
            color: 'primary.300'
        }
    }
});
