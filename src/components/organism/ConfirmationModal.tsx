import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';

export function ConfirmationModal({
    isOpen,
    onClose,
    title,
    message,
    onConfirm
}: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    onConfirm: () => void;
}) {
    return (
        isOpen && (
            <Modal isOpen={isOpen} onClose={onClose} size={'sm'}>
                <ModalOverlay />
                <ModalContent px={0}>
                    <ModalHeader px={'24px'}>
                        {title}
                        <ModalCloseButton />
                    </ModalHeader>
                    <ModalBody pb={'12px'} px={'24px'}>
                        {message}
                    </ModalBody>
                    <ModalFooter
                        px={'12px'}
                        display={'flex'}
                        flexDir={{ base: 'column', md: 'row' }}
                        gap={'12px'}
                    >
                        <Button
                            width={{ base: '100%', md: 'auto' }}
                            onClick={onClose}
                            variant={'solid'}
                        >
                            {'Cancel'}
                        </Button>
                        <Button
                            width={{ base: '100%', md: 'auto' }}
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            variant={'ghost_error'}
                        >
                            {'Confirm'}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    );
}
