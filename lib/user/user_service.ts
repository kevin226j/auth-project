import * as passport from 'passport';
import {Request, Response, NextFunction} from 'express';
import {Handler} from '../exception/handler';

// tslint:disable: no-unsafe-any

/**
 * Manage Users through various authentication services/strategies.
 */
export class UserService {
    /**
     * Method used to authenticate users using passport JWT strategy.
     */
    public authJWT = (req: Request, res: Response, next: NextFunction) => {
        try {
            // Reminder, do not use authorization bearer scheme in http headers.
            if (req.headers.authorization.includes('bearer')) {
                return res.status(400).send(new Handler().errorResponse('Use JWT Authorization Scheme.'));
            } else {
                // Invloke authenitcation stratgy
                passport.authenticate('jwt', {session: false}, (error, user, info) => {
                    if (error || !user) {
                        res.status(400).send(new Handler().errorResponse(error, info));
                    } else {
                        next();
                    }
                })(req, res, next);
            }
        } catch (error) {
            throw new Handler().errorResponse(error.name, error.message);
        }
    };

    /**
     * Method used to authenticate users using passport Local Strategy.
     */
    public authLocal = (req: Request, res: Response, next: NextFunction) => {
        // Invloke authenitcation stratgy
        passport.authenticate('local', {session: false}, (error, user, info) => {
            req.logIn(user, () => {
                if (error) {
                    res.status(400).send(new Handler().errorResponse(error, info));
                } else {
                    !user ? res.status(401).send(new Handler().errorResponse('Unauthorized User.', info)) : next();
                }
            });
        })(req, res, next);
    };
}
