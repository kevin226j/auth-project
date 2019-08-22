import {Router} from 'express';
import {UserService} from './user_service';
import {UserController} from './user_controller';
import {userValidation} from './user_validation';
import {validateModel} from '../utils/validate-model';
import {Passport} from '../config/passport';

/**
 * User Route class.
 * endpoint : /users/
 */
export class UserRoutes {
    public router: Router;
    public userService: UserService = new UserService();
    public userController: UserController = new UserController();
    public passport: Passport = new Passport();

    constructor() {
        this.router = Router();
        this.passport.init();
        this.init();
    }

    /**
     * Method initializes routes using userController, passport, and userService as handlers.
     */
    public init() {
        // Flow begins first by authenticaing request body using joi validation model.
        this.router
            .route('/login')
            .post(validateModel(userValidation.model), this.userService.authLocal, this.userController.login);

        this.router.route('/register').post(validateModel(userValidation.model), this.userController.registration);

        // Test Route to check if passport JWT strategy authenticates.
        this.router.route('/test').get(this.userService.authJWT, (req: any, res: any, next: any) => {
            res.status(200).send({message: 'Made it through!'});
        });
    }
}
