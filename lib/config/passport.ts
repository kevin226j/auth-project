import * as passport from 'passport';
import * as dotenv from 'dotenv';
import {Request, Response, NextFunction} from 'express';

import {userModel as User} from '../user/user_model';
import {Local as LocalStrategy} from './strategies/local';
import {JWT as JWTStrategy} from './strategies/jwt';
import {Handler} from '../exception/handler';

dotenv.config();

// tslint:disable: no-void-expression
// tslint:disable: no-unsafe-any

/**
 * Passport configuration class.
 */
export class Passport {
    private readonly localStrategy: LocalStrategy = new LocalStrategy();
    private readonly jwtStrategy: JWTStrategy = new JWTStrategy();

    /**
     * Method initializes Passport when called.
     */
    public init = (): void => {
        // determine which data in user object should be stored in session.
        passport.serializeUser<any, any>((user, done) => {
            done(undefined, user._id);
        });

        // Retrieve id from key specified in serializeUser.
        passport.deserializeUser((id, done) => {
            User.findById(id, (err, user) => {
                done(err, user);
            });
        });

        this.loadStrategies();
    };

    /**
     * Load strategies onto Passport.
     */
    public loadStrategies = (): void => {
        try {
            // Add strategies here.
            this.localStrategy.init(passport);
            this.jwtStrategy.init(passport);
        } catch (error) {
            // Add Error logging here
            throw new Handler().errorResponse(error.name, error.message);
        }
    };

    /**
     * Method checks if user signing in is authenticated.
     * @req - request
     * @res - response
     * @next - next
     */
    public isAuthenticated = (req: Request, res: Response, next: NextFunction): any => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).send(new Handler().errorResponse('Invalid Username and/or Password'));
    };

    /**
     * Method checks if user signing in is authorized. Used for third-party api authentication.
     * @req - request
     * @res - response
     * @next - next
     */
    public isAuthorized = (req: Request, res: Response, next: NextFunction): any => {
        const provider = req.path.split('/').slice(-1)[0];
        const token = req.user.token;
        if (token) {
            next();
        } else {
            res.redirect(`/auth/${provider}`);
        }
    };
}
