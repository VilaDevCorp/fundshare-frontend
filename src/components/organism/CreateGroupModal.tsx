import { Button, Input, Textarea } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { FormField } from '../ui/FormField';
import { notEmptyValidator, useValidator } from '../../hooks/useValidator';
import { useCrud } from '../../hooks/useCrud';
import { CreateGroupForm, Group } from '../../types/entities';
import { useToast } from '../../hooks/useToast';
import { useError } from '../../hooks/useError';
import { useMutation } from '@tanstack/react-query';
import { FormModal } from '../ui/FormModal';
import { useReactQuery } from '../../hooks/useReactQuery';

export function CreateGroupModal({
    isOpen,
    onClose
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const nameInputRef = useRef<HTMLInputElement>(null);
    const [nameDirty, nameError, nameMessage, nameValidate] = useValidator(
        name,
        [notEmptyValidator],
        nameInputRef
    );

    const { create } = useCrud<Group>('group');
    const { queryClient } = useReactQuery();
    const { showToast } = useToast();
    const { setError } = useError();

    const createGroup = async () => {
        if (nameValidate()) {
            await create({ name, description } as CreateGroupForm);
        } else {
            showToast('error', 'There are errors in the form');
        }
    };

    const { mutate: onCreateGroup, isPending: isLoading } = useMutation({
        mutationFn: createGroup,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['groups'] });
            showToast('success', 'Group created!');
            onClose();
        },
        onError: (e) => {
            if (e instanceof Error) {
                setError(e);
            }
        }
    });

    const isDisabled = !name || isLoading;

    return (
        <FormModal
            isOpen={isOpen}
            title='Create group'
            onClose={onClose}
            onSubmit={onCreateGroup}
            size="md"
            form={
                <>
                    <FormField
                        label="Name"
                        error={nameDirty && nameError ? nameMessage : ''}
                        input={
                            <Input
                                ref={nameInputRef}
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        }
                    />
                    <FormField
                        label="Description"
                        input={
                            <Textarea
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                            />
                        }
                    />
                </>
            }
            buttons={
                <Button
                    isLoading={isLoading}
                    isDisabled={isDisabled}
                    type="submit"
                    variant="solid"
                    width={{ base: '100%', tablet: 'auto' }}
                >
                    Create
                </Button>
            }
        />
    );
}
