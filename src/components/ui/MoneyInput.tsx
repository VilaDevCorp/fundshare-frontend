import {
    InputGroup,
    InputRightAddon,
    NumberInput,
    NumberInputField
} from '@chakra-ui/react';

interface MoneyInputProps {
    symbol: string;
    value: string;
    onChange: (value: string) => void;
}

export function MoneyInput(props: MoneyInputProps) {
    return (
        <InputGroup>
            <NumberInput
                min={0}
                precision={2}
                value={props.value}
                onChange={(value) => props.onChange(value)}
            >
                <NumberInputField />
            </NumberInput>
            <InputRightAddon>{props.symbol}</InputRightAddon>
        </InputGroup>
    );
}
