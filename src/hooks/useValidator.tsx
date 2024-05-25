import { useEffect, useState } from 'react';

export function emailValidator(input: string): string {
    const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(input) ? '' : 'The email is not valid';
}
export function phoneValidator(input: string): string {
    const regex = /^[0-9]{9}$/;
    return regex.test(input) ? '' : 'The phone is not valid';
}
export function notEmptyValidator(input: string): string {
    return input && input.length >= 1 ? '' : 'The field cannot be empty';
}
export function haveNumbersValidator(input: string): string {
    return /(?=.*\d).*/.test(input) ? '' : 'The field should contain a number';
}
export function minLength8Validator(input: string): string {
    return input.length >= 8 ? '' : 'The field cannot be less than 8 char';
}
export function authCodeValidator(value: string): string {
    return /^[0-9]{6}$/.test(value) ? '' : 'The code is not valid';
}

export function upperLowerCaseValidator(input: string): string {
    return /(?=.*[A-Z])(?=.*[a-z]).*/.test(input)
        ? ''
        : 'The field should contain upper and lower case';
}

export function upperThanZeroValidator(input: string): string {
    return parseFloat(input) > 0 ? '' : 'The value should be greater than 0';
}

export const useValidator = (
    input: string,
    validators: { (input: string): string }[],
    //This ref is used to activate the dirty state when the input is blurred
    inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
): [boolean, boolean, string, { (): boolean }] => {
    const [dirty, setDirty] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (inputRef && inputRef.current) {
            inputRef.current.onblur = () => {
                console.log("SETTING DIRTY")
                setDirty(true);
            };
        }
    }, []);

    useEffect(() => {
        //If the inputRef is not set, the dirty state is activated when the user starts typing
        if (!inputRef && !dirty && input) {
            setDirty(true);
        }
        for (const validator of validators) {
            const e = validator(input);
            if (e) {
                setError(true);
                setMessage(e);
                return;
            }
        }
        setError(false);
        setMessage('');
    }, [input]);

    const validate = () => {
        for (const validator of validators) {
            const e = validator(input);
            if (e) {
                setDirty(true);
                setError(true);
                setMessage(e);
                return false;
            }
        }
        return true;
    };
    return [dirty, error, message, validate];
};
