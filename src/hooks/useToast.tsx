import { useContext } from 'react';
import { ToastContext } from '../providers/ToastProvider';

export function useToast() {
    const ctx = useContext(ToastContext);
    if (ctx === null) {
        throw new Error(
            'useToast() can only be used on the descendants of ToastProvider'
        );
    } else {
        return ctx;
    }
}
