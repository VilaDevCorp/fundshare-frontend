import { defineStyleConfig } from '@chakra-ui/react';

export const LinkTheme = defineStyleConfig({
    baseStyle: {
        color: 'primary.100',
        fontSize: 'sm',
        _hover: {
            textDecoration: 'none',
            color: 'primary.300'
        }

    }
});
