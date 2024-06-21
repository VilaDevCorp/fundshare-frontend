import { defineStyleConfig } from '@chakra-ui/react';

export const BadgeTheme = defineStyleConfig({
    // The styles all button have in common
    baseStyle: {},
    sizes: {
        md: {
        }
    },
    variants: {
        pending: {},
        admin: {}
    },
    // The default size and variant values
    defaultProps: {}
});
