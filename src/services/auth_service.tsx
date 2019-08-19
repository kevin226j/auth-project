import decode from 'jwt-decode';
import {apiService} from './api_service';

export class AuthService {
    public domain: string;

    constructor(domain?: string) {
        this.domain = domain || 'http://localhost:3000/api/users';
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    /**
     * Method logins user from server.
     * @param username
     * @param password
     */
    public login = (email: string, password: string) => {
        // Api call to server to retrieve token.
        return apiService(`${this.domain}/login`, 'post', {email, password}).then((res: any) => {
            console.log(res);
            if ([400, 401, 403].indexOf(res.status) !== -1) {
                return Promise.reject(res.data);
            }
            this.setToken(res.token);
            return Promise.resolve(res.token);
        });
    };

    public loggedIn = (): boolean => {
        // Check user if logged in through token.
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    };

    public logout = (): any => {
        // Clear token and profile data from localStorage
        localStorage.removeItem('token');
    };

    public getProfile() {
        // Decode token for results
        return decode(this.getToken());
    }

    private getToken() {
        // Retrieve user token from localStorage.
        return localStorage.getItem('token');
    }

    private isTokenExpired = (token: any): boolean => {
        try {
            // Check if token is expired
            const decoded: any = decode(token);
            return decoded.exp < Date.now() ? true : false;
        } catch (error) {
            return false;
        }
    };

    private setToken(token: string) {
        // Saves token to localStorage.
        localStorage.setItem('token', token);
    }

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
