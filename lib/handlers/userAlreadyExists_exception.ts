import {HttpException} from './http_exception';

/**
 * When User already exists in the database.
 */
export class UserAlreadyExistsException extends HttpException {
    constructor(email: string) {
        super(400, `User with email : ${email} already exists.`);
    }
}
