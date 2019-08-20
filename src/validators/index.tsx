import _ from 'lodash';

const minLength = (min: number) => (value: {length: number}) =>
    value && value.length < min ? `Length should be more than ${min}` : undefined;

export const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const websiteRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export const required = (value: any) => (value ? undefined : 'Required');

export const moreThan = (limit: number, message = `Should be more than ${limit}`) => (n: number) =>
    n > limit ? undefined : message;

export const lessThan = (limit: number, message = `Should be less than ${limit}`) => (n: number) =>
    n < limit ? undefined : message;

export const integer = n => (n.toString().includes('.') ? 'Shoule be integer' : undefined);

export const lengthMoreThan = (limit: number, message = `Length should be more than ${limit}`) => (str: {
    length: number;
}) => (!str || str.length < limit ? message : undefined);

export const lengthLessThan = (limit: number, message = `Length should be less than ${limit}`) => (str: {
    length: number;
}) => (!str || str.length > limit ? message : undefined);

export const minLength6 = minLength(6);

export const minLength4 = minLength(4);

export const email = (value: string) => (!value || !emailRegex.test(value) ? 'Invalid email address' : undefined);

export const website = (value: string) => (value && !websiteRegex.test(value) ? 'Invalid website' : undefined);
