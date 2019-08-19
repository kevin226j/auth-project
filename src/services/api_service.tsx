import * as axios from 'axios';

/**
 * @param url takes endpoint url
 * @param action method of http request
 * @param data  payload
 */
export const apiService = (urlEndpoint: string, action: string, data: any, headers: any = null) => {
    const domain = process.env.DOMAIN || 'http://localhost:3000';

    switch (action.toLowerCase()) {
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
