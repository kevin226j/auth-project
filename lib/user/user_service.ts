import * as passport from 'passport';
import {Request, Response, NextFunction} from 'express';
import {Handler} from '../exception/handler';

// tslint:disable: no-unsafe-any

/**
 * Manage Users through various authentication services/strategies.
 */
export class UserService {
    public authJWT = (req: Request, res: Response, next: NextFunction) => {
        try {
            // Reminder, do not use authorization bearer scheme in http headers.
            if (req.headers.authorization.includes('bearer')) {
                return res.status(400).send(new Handler().errorResponse('Use JWT Authorization Scheme.'));
            } else {
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

    public authLocal = (req: Request, res: Response, next: NextFunction) => {
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
