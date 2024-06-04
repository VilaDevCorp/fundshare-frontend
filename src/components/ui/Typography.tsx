import { Heading, HeadingProps, Text } from '@chakra-ui/react';
import React from 'react';

type TypographyType = 'title' | 'subtitle' | 'body' | 'detail';

interface TypographyProps extends HeadingProps {
    children: React.ReactNode;
    type: TypographyType;
}

const getTypographyElement = (props: TypographyProps) => {
    const { type, children, ...chakraHeadingProps } = props;
    switch (type) {
        case 'title':
            return (
                <Heading
                    as="h1"
                    size="xl"
                    fontWeight={'light'}
                    {...chakraHeadingProps}
                >
                    {children}
                </Heading>
            );
        case 'subtitle':
            return (
                <Heading
                    as="h2"
                    size="lg"
                    fontWeight={'bold'}
                    {...chakraHeadingProps}
                >
                    {children}
                </Heading>
            );
        case 'detail':
            return (
                <Text fontSize={'sm'} {...chakraHeadingProps}>
                    {children}
                </Text>
            );
        default:
            return <Text fontSize={'md'}>{children}</Text>;
    }
};

export function Typography(props: TypographyProps) {
    return getTypographyElement(props);
}
