import { sliderAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';
const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

export const SliderTheme = defineMultiStyleConfig({
    baseStyle: {
        thumb: {
            bg: 'primary.500',
            borderRadius: '2px',
            _focus: {
                boxShadow: 'inputFocus'
            }
        },
        filledTrack: {
            bg: 'primary.500'
        },
        track: {
            bg: 'background.700'
        }
    },
    sizes: {
        md: {
            thumb: {
                width: '18px',
                height: '18px'
            },

            track: {
                height: '5px'
            }
        }
    }
});
