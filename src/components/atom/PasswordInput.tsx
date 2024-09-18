import { IconButton, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { forwardRef, useState } from 'react';
import { Icon } from './Icon';

interface PasswordInputProps {
    password: string;
    setPassword: React.Dispatch<React.SetStateAction<string>>;
    dataCy?: string;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(props, ref) {

    const { password, setPassword, dataCy = "password_input" } = props;
    const [showPassword, setShowPassword] = useState(false)

    return (
        <InputGroup>
            <Input
                data-cy={dataCy}
                ref={ref}
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />
            <InputRightElement>
                <IconButton tabIndex={-1} variant={'ghost'} style={{ boxShadow: 'none' }} aria-label='show-password'
                    icon={<Icon type={showPassword ? 'hide' : 'show'} />} onClick={() => setShowPassword(oldVal => !oldVal)} />
            </InputRightElement>
        </InputGroup>
    )
});