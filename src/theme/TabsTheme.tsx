import { tabsAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
    tabsAnatomy.keys
);

// export the component theme
export const TabsTheme = defineMultiStyleConfig({
    baseStyle: {
        tab: {
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
            borderBottomColor: 'background.700 !important',
            gap: '0px',
            padding: '0px'
        }
    },
    sizes: {
        md: {
            tab: {
                fontSize: 'sm',
                padding: '10px 20px'
            }
        }
    }
});
