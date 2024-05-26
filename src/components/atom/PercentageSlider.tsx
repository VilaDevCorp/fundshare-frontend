import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    Text,
    Box
} from '@chakra-ui/react';
import React from 'react';

interface PercentageSliderProps {
    value: number;
    onChange: (value: number) => void;
}

export function PercentageSlider(props: PercentageSliderProps) {
    return (
        <Slider value={props.value} onChange={props.onChange}>
            <SliderTrack>
                <SliderFilledTrack />
            </SliderTrack>
            <Box display={'flex'} flexDirection={'column'}>
                <SliderThumb>
                    <Text
                        as={'span'}
                        position={'absolute'}
                        fontSize={'md'}
                        color={'primary.500'}
                        top={5}
                        width={50}
                        fontWeight={'bold'}
                    >{`${props.value} %`}</Text>
                </SliderThumb>
            </Box>
        </Slider>
    );
}
