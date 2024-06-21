import { FormControl, FormLabel, Tooltip } from '@chakra-ui/react';
import React from 'react';
import { Icon } from '../atom/Icon';

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
                        color={'neutral.0'}
                        placement="bottom"
                    >
                        <span>
                            <Icon
                                color={'error.500'}
                                fontSize={'lg'}
                                type={'warning'}
                            />
                        </span>
                    </Tooltip>
                )}
            </FormLabel>
            {props.input}
        </FormControl>
    );
}
