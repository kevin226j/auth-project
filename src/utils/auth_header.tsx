import {AuthService} from '../services/auth_service';

const authService = new AuthService();

/**
 * Function retieves token and sets as a header for http calls. Used to authorize.
 */
export const authHeader = () => {
    // Retrieve user token.
    const currentUser: any = authService.getToken();
    if (currentUser && currentUser) {
        // Set header Authorization
        return {Authorization: `JWT ${currentUser}`};
    } else {
        return {};
    }
};
