/**
 * API Response Handler
 * @param response - Response Object
 */
export const responseHandler = (response: any) => {
    const status = response.status;

    // If there is a client side error or server error return rejected promise.
    if (status >= 400 && status <= 511) {
        const error = response.data;
        const message = error.message;
        return Promise.reject({error, message});
    }

    return response;
};
