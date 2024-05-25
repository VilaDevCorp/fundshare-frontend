import { FormControl, FormLabel, Icon, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { BiMessageAltError } from 'react-icons/bi';

interface FormFieldProps {
    label: string;
    input: React.ReactNode;
    labelIcon?: React.ReactNode;
    error?: string;
}

export function FormField(props: FormFieldProps) {
    return (
        <FormControl isInvalid={!!props.error}>
            <FormLabel
                display={'flex'}
                height={'25px'}
                fontSize={'sm'}
                alignItems={'center'}
                gap={2}
            >
                {props.labelIcon}
                {props.label}
                {props.error && (
                    <Tooltip
                        label={props.error}
                        bg={'error.700'}
                        color={'text.0'}
                        placement="bottom"
                    >
                        <span>
                            <Icon
                                color={'error.500'}
                                fontSize={'lg'}
                                as={BiMessageAltError}
                            />
                        </span>
                    </Tooltip>
                )}
            </FormLabel>
            {props.input}
        </FormControl>
    );
}
