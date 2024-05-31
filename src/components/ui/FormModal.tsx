import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter
} from '@chakra-ui/react';
import React from 'react';

interface FormModalProps {
    isOpen: boolean;
    onClose: () => void;
    size: 'sm' | 'md' | 'lg';
    form: React.ReactNode;
    buttons: React.ReactNode;
    onSubmit: () => void;
}

export function FormModal(props: FormModalProps) {
    const { isOpen, onClose, size, form, buttons, onSubmit } = props;

    return (
        isOpen && (
            <Modal isOpen={isOpen} onClose={onClose} size={size}>
                <ModalOverlay />
                <ModalContent px={0}>
                    <ModalHeader px={'24px'}>
                        Create group
                        <ModalCloseButton />
                    </ModalHeader>
                    <form
                        className="flex flex-col h-full overflow-auto"
                        onSubmit={(e) => {
                            e.preventDefault();
                            onSubmit();
                        }}
                    >
                        <ModalBody
                            display={'flex'}
                            flexDir={'column'}
                            gap={'12px'}
                            pb={'12px'}
                            px={'24px'}
                        >
                            {form}
                        </ModalBody>

                        <ModalFooter position={'sticky'} bottom={0} px={'12px'}>
                            {buttons}
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        )
    );
}
