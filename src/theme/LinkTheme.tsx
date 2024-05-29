import { defineStyleConfig } from '@chakra-ui/react';

export const LinkTheme = defineStyleConfig({
    baseStyle: {
        color: 'primary.100',
        fontSize: 'md',
        _hover: {
            textDecoration: 'none',
            color: 'primary.300'
        }

    }
});
