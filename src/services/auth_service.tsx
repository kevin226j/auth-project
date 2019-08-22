import decode from 'jwt-decode';
import {apiService} from './api_service';
import {responseHandler} from '../helpers/response_handler';

/**
 * Authentication Service that enables user authorization to web app.
 */
export class AuthService {
    public endpoint: string;

    constructor(endpoint?: string) {
        // Setting up authorization endpoint
        this.endpoint = endpoint || 'api/users';

        // Bind methods.
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    /**
     * Method logins user from server using API Service.
     * @param username - string
     * @param password - string
     */
    public login = (email: string, password: string) => {
        // Api call to server to retrieve token.
        return (
            apiService(`${this.endpoint}/login`, 'post', {email, password})
                // Invoke response handler to funnel response.
                .then(responseHandler)

                // Handle response.
                .then((res: any) => {
                    // If there is an client error, reject promise.
                    if ([400, 401, 403].indexOf(res.status) !== -1) {
                        return Promise.reject(res.data);
                    }

                    // Set token if no errors.
                    this.setToken(res.token);
                    return Promise.resolve(res.token);
                })
        );
    };

    /**
     * Method that checks if user is logged in from active token.
     */
    public loggedIn = (): boolean => {
        const token = this.getToken();

        // Make sure token is not expired and not undefined.
        return !!token && !this.isTokenExpired(token);
    };

    /**
     * Method that logs out user by removing token from localStorage.
     */
    public logout = (): any => {
        localStorage.removeItem('token');
    };

    /**
     *  Method that retrieves token and decodes for user info.
     */
    public getProfile() {
        // Decode token from npm decode.
        return decode(this.getToken());
    }

    /**
     * Method retrieves token from localStorage
     */
    public getToken() {
        return localStorage.getItem('token');
    }

    /**
     * Method checks to see if token is active or not based on expiration date.
     */
    private isTokenExpired = (token: any): boolean => {
        try {
            // Check if token is expired
            const decoded: any = decode(token);
            return decoded.exp < Date.now() ? true : false;
        } catch (error) {
            return false;
        }
    };

    /**
     * Method sets token to localStorage.
     * @param token - retrieved from response
     */
    public setToken(token: string) {
        // Saves token to localStorage.
        localStorage.setItem('token', token);
    }

    /**
     * Method checks status of the response.
     * @param response
     */
    public checkStatus(response: any) {
        // Raises an error in case of response status is not a success.
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.stack = response;
            throw error;
        }
    }
}
