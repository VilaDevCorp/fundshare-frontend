import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    tabsAnatomy.keys
);

// export the component theme
export const TabsTheme = defineMultiStyleConfig({
    baseStyle: {
        root: {
            borderRadius: '2px'
        },
        tab: {
            bg: 'background.0',
            width: '100%',
            transition: 'font-weight .2s ease',

            _selected: {
                color: 'primary.500',
                borderBottom: '4px solid',
                fontWeight: 'bold'
            },

            _hover: {
                color: 'primary.500',
                fontWeight: 'bold'
            }
        },
        tablist: {
            bg: 'background.0',

            borderBottomColor: 'background.700 !important',
            gap: '0px',
            padding: '0px'
        },
        tabpanel: {
            padding: '0',
            bg: 'background.0'
        }
    },
    sizes: {
        md: {
            tab: {
                fontSize: 'md',
                padding: '10px 20px'
            }
        }
    }
});
