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
                    <ModalFooter px={'12px'} display={'flex'} gap={'12px'}>
                        <Button
                            onClick={onClose}
                            colorScheme={'gray'}
                            variant={'solid'}
                        >
                            {'Cancel'}
                        </Button>
                        <Button
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
