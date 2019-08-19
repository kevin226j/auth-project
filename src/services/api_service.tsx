import * as axios from 'axios';

/**
 * @param url takes endpoint url
 * @param action method of http request
 * @param data  payload
 */
export const apiService = (url: string, action: string, data: any) => {
    switch (action.toLowerCase()) {
        case 'get':
            return axios.default
                .get(url, {withCredentials: false})
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
        case 'post':
            return axios.default
                .post(url, data, {withCredentials: false})
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
        case 'put':
            return axios.default
                .put(url, data, {withCredentials: false})
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

        case 'delete':
            return axios.default
                .delete(url, {withCredentials: false})
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
