/*
 * Validates whether a field has a value
 */
export const required = (value: string): boolean =>
    value === undefined || value === null || value === '' ? false : true;

/**
 * Validates whether a field is a valid email
 */
export const isEmail = (value: string): boolean =>
    value &&
    value.search(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
        ? false
        : true;

/**
 * Validates whether a field is within a certain amount of characters
 */
export const maxLength = (value: string, length: number): boolean => (value && value.length > length ? false : true);

/**
 * Validates whether a field is within a certain amount of characters
 */
export const minLength = (value: string, length: number): boolean => (value && value.length < length ? false : true);

/**
 * Validates whether password and confirm password matches
 */
export const matchPasswords = (password: string, confirmPassword: string): boolean =>
    password !== confirmPassword ? false : true;
