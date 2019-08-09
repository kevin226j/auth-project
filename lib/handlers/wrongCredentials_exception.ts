import {HttpException} from './http_exception';

/**
 * When Users log in with wrong credentials.
 */
class WrongCredentialsException extends HttpException {
    constructor() {
        super(400, `Invalid User Credentials.`);
    }
}
