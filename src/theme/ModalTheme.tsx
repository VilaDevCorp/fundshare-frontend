import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

export const ModalTheme = defineMultiStyleConfig({
    baseStyle: {
        dialog: {
            bg: 'neutral.0',
            borderRadius: '2px',
            boxShadow: 'lg',
            maxW: '2xl',
            w: '100%',
            zIndex: 'modal',
            overflow: 'hidden'
        },
        overlay: {
            backdropFilter: 'blur(4px) brightness(0.8)',
            bg:'transparent'
        },
        header: {
            fontSize: '2xl',
            fontWeight: 'light',
            padding: { base: '12px 12px !important', tablet: '12px 24px !important' },
            display: 'flex',
            alignItems: 'center',
            letterSpacing: '0.5px',
            justifyContent: 'space-between',
            paddingBottom: '12px !important',
            shadow: 'sm',
            marginBottom: '1px',
        },
        body: {
            padding: { base: '12px 12px !important', tablet: '12px 24px !important' },
            bg: 'neutral.100',
            overflowY: 'auto'
        },
        closeButton: {
            borderWidth: '2px',
            position: 'static',
            fontSize: 'lg',
            bg: 'neutral.100',
            shadow: 'sm',
            _hover: {
                bg: 'neutral.0'
            },
            _active: {
                bg: 'neutral.200',
                boxShadow: 'none'
            },
            borderRadius: '2px',
            borderColor: 'primary.500'
        },
        footer: {
            shadow: 'sm_top',
            padding: { base: '12px 12px !important', tablet: '12px 24px !important' },
            marginTop: '1px',
        }
    },
    sizes: {
        sm: {
            dialog: {
                maxW: { base: '100%', tablet: '500px' },
                height: { base: '100%', tablet: '250px' },
                marginTop: { base: '0', tablet: '75px' },
                marginBottom: { base: '0', tablet: '75px' }
            }
        },
        md: {
            dialog: {
                maxW: { base: '100%', tablet: '500px' },
                height: { base: '100%', tablet: '500px' },
                marginTop: { base: '0', tablet: '75px' },
                marginBottom: { base: '0', tablet: '75px' }
            }
        },
        lg: {
            dialog: {
                maxW: { base: '100%', tablet: '800px' },
                height: { base: '100%', tablet: '500px' },
                marginTop: { base: '0', tablet: '75px' },
                marginBottom: { base: '0', tablet: '75px' }
            }
        }
    }
});
