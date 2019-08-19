import {AuthService} from '../services/auth_service';

const authService = new AuthService();

export const authHeader = () => {
    const currentUser: any = authService.getToken();
    if (currentUser && currentUser) {
        return {Authorization: `JWT ${currentUser}`};
    } else {
        return {};
    }
};
