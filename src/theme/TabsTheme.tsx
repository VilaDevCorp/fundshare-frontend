import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    tabsAnatomy.keys
);

// export the component theme
export const TabsTheme = defineMultiStyleConfig({
    baseStyle: {
        root: {
            borderRadius: '2px',
            height: '100%'
        },
        tab: {
            bg: 'neutral.100',
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
            bg: 'neutral.100',
            height: '45px',
            boxShadow: 'sm',
            gap: '0px',
            padding: '0px'
        },
        tabpanels: {
            height: 'calc(100% - 45px)'
        },
        tabpanel: {
            height: '100%',
            padding: '0',
            overflowY: 'hidden',
            bg: 'neutral.100',
            boxShadow: 'md'
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
