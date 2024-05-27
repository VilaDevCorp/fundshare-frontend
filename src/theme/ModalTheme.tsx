import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

export const ModalTheme = defineMultiStyleConfig({
    baseStyle: {
        dialog: {
            bg: 'background.0',
            borderRadius: '2px',
            boxShadow: 'md',
            maxW: '2xl',
            w: '100%',
            zIndex: 'modal',
            padding: '12px 24px',
            overflow: 'hidden'
        },
        header: {
            fontSize: '2xl',
            fontWeight: 'light',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px'
        },
        body: {
            padding: 0,
            overflowY: 'auto'
        },
        closeButton: {
            borderWidth: '1px',
            position: 'static',
            borderRadius: '2px',
            borderColor: 'primary.500'
        },
        footer: {
            marginTop: '24px',
            padding: 0
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
