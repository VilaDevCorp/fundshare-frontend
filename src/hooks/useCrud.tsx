import { checkResponseException } from '../utils/utilFunctions';

interface CrudOperations<T> {
    create: (form: unknown) => Promise<T>;
    update: (id: string, form: unknown) => Promise<T>;
    get: (id: string) => Promise<T>;
    search: (filter: SearchFilter[]) => void;
    remove: (id: string) => void;
}

type SearchFilter = { [key: string]: string | boolean | string[] };

export function useCrud<T>(entity: string): CrudOperations<T> {
    const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;

    const create = async (form: unknown): Promise<T> => {
        const url = `${apiUrl}/${entity}`;
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(form),
            headers: new Headers({
                'content-type': 'application/json'
            })
        };
        const res = await fetch(url, options);
        const resObject = await res.json();
        checkResponseException(res, resObject);
        return resObject;
    };
    const update = async (id: string, form: unknown): Promise<T> => {
        const url = `${apiUrl}/${entity}/${id}`;
        const options: RequestInit = {
            method: 'PATCH',
            body: JSON.stringify(form),
            headers: new Headers({
                'content-type': 'application/json'
            })
        };
        const res = await fetch(url, options);
        const resObject = await res.json();
        return resObject;
    };

    const get = async (id: string): Promise<T> => {
        const url = `${apiUrl}/${entity}/${id}`;
        const options: RequestInit = {
            method: 'GET',
            headers: new Headers({
                'content-type': 'application/json'
            })
        };
        const res = await fetch(url, options);
        const resObject = await res.json();
        return resObject;
    };

    const search = async (filters: SearchFilter[]) => {
        const url = `${apiUrl}/${entity}`;
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify(filters),
            headers: new Headers({
                'content-type': 'application/json'
            })
        };
        const res = await fetch(url, options);
        const resObject = await res.json();
        return resObject;
    };
    const remove = async (id: string): Promise<void> => {
        const url = `${apiUrl}/${entity}/${id}`;
        const options: RequestInit = {
            method: 'DELETE'
        };
        const res = await fetch(url, options);
        const resObject = await res.json();
        checkResponseException(res, resObject);
    };

    const value: CrudOperations<T> = {
        create,
        update,
        get,
        search,
        remove
    };

    return value;
}
