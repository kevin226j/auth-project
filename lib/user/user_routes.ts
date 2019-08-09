import {Router} from 'express';
import {UserService} from './user_service';
import {UserController} from './user_controller';
import {userValidation} from './user_validation';
import {validateModel} from '../utils/validate-model';

/**
 * User Route class.
 */
export class UserRoutes {
    public router: Router;
    public userService: UserService = new UserService();
    public userController: UserController = new UserController();

    constructor() {
        this.router = Router();
        this.init();
    }

    public init() {
        this.router.route('/login').post(this.userService.passportSignIn, this.userController.login);

        this.router.route('/register').post(validateModel(userValidation.authSchema), this.userController.registration);
    }
}
