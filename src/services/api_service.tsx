import * as axios from 'axios';

/**
 * API Service utilizing npm package Axios.
 * @param url takes endpoint url
 * @param action method of http request
 * @param data  payload
 */
export const apiService = (urlEndpoint: string, action: string, data: any, headers: any = null) => {
    // Domain URL set up.
    const domain = process.env.DOMAIN || 'http://localhost:3000';

    switch (action.toLowerCase()) {
        /**
         * Get Method
         */
        case 'get':
            return axios.default
                .get(`${domain}/${urlEndpoint}`, {withCredentials: false, headers})
                .then(
                    res => {
                        return res.data;
                    },
                    err => {
                        return Promise.reject(err.response);
                    }
                )
                .catch(err => {
                    return Promise.reject(err.response);
                });
        /**
         * Post Method
         */
        case 'post':
            return axios.default
                .post(`${domain}/${urlEndpoint}`, data, {withCredentials: false, headers})
                .then(
                    res => {
                        return res.data;
                    },
                    err => {
                        return Promise.reject(err.response);
                    }
                )
                .catch(err => {
                    return err;
                });
        /**
         * Put Method
         */
        case 'put':
            return axios.default
                .put(`${domain}/${urlEndpoint}`, data, {withCredentials: false, headers})
                .then(
                    res => {
                        return res.data;
                    },
                    err => {
                        return Promise.reject(err.response);
                    }
                )
                .catch(err => {
                    return Promise.reject(err.response);
                });
        /**
         * Delete Method
         */
        case 'delete':
            return axios.default
                .delete(`${domain}/${urlEndpoint}`, {withCredentials: false, headers})
                .then(
                    res => {
                        return res.data;
                    },
                    err => {
                        return Promise.reject(err.response);
                    }
                )
                .catch(err => {
                    return Promise.reject(err.response);
                });
    }
};
