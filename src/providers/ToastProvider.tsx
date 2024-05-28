import { Box, Icon, Text, useToast } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons';
import { BiError } from 'react-icons/bi';
import { TiTick } from 'react-icons/ti';

type MessageType = 'success' | 'error';

interface ToastContext {
    showToast: (type: MessageType, message: string) => void;
}

interface ToastProps {
    color: string;
    icon: IconType;
}

const getToastProps = (type: MessageType): ToastProps => {
    switch (type) {
        case 'success':
            return { color: 'primary.500', icon: TiTick };
        case 'error':
            return { color: 'error.500', icon: BiError };
    }
};

export const ToastContext = React.createContext<ToastContext>(
    {} as ToastContext
);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const toast = useToast();

    const showToast = (type: MessageType, message: string) => {
        toast({
            title: message,
            status: type,
            duration: 3000,
            isClosable: true,
            render: () => {
                const toastProps = getToastProps(type);
                return (
                    <Box
                        bg={'background.0'}
                        borderWidth={'2px'}
                        borderColor={toastProps.color}
                        borderRadius={'2px'}
                        px={'16px'}
                        py={'8px'}
                        display={'flex'}
                        gap={'8px'}
                        alignItems={'center'}
                        color={toastProps.color}
                        fontSize={'lg'}
                    >
                        <Icon
                            as={toastProps.icon}
                            fontSize={'2xl'}
                            color={toastProps.color}
                        />
                        <Text>{message}</Text>
                    </Box>
                );
            }
        });
    };

    const value: ToastContext = { showToast };

    return (
        <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
    );
}
