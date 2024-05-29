import { Heading, Text } from '@chakra-ui/react';
import React from 'react';

type TypographyType = 'title' | 'subtitle' | 'body';

interface TypographyProps {
    children: React.ReactNode;
    type: TypographyType;
}

const getTypographyElement = (props: TypographyProps) => {
    switch (props.type) {
        case 'title':
            return (
                <Heading as="h1" size="xl" fontWeight={'light'}>
                    {props.children}
                </Heading>
            );
        case 'subtitle':
            return (
                <Heading as="h2" size="lg">
                    {props.children}
                </Heading>
            );
        default:
            return <Text fontSize={'md'}>{props.children}</Text>;
    }
};

export function Typography(props: TypographyProps) {
    return getTypographyElement(props);
}
