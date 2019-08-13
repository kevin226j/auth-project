import * as passport from 'passport';
import {Request, Response, NextFunction} from 'express';

// tslint:disable: no-unsafe-any

/**
 * Manage Users through various authentication services/strategies.
 */
export class UserService {
    public authJWT = (req: Request, res: Response, next: NextFunction) => {
        // Reminder, do not use authorization bearer scheme in http headers.
        if (req.headers.authorization.includes('bearer')) {
            res.send({error: 'Use JWT Authorization Scheme'});
        }
        passport.authenticate('jwt', {session: false}, (error, user, info) => {
            if (error) {
                // Add logging information
                console.log(error, info);
            } else if (!user) {
                res.send({error, info});
            } else {
                next();
            }
        })(req, res, next);
    };

    public authLocal = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('local', {session: false}, (error, user, info) => {
            req.logIn(user, () => {
                if (error) {
                    // tslint:disable-next-line: no-void-expression
                    return next(error);
                }
                !user ? res.status(401).send({error: 'Unauthorized', info}) : next();
            });
        })(req, res, next);
    };
}
