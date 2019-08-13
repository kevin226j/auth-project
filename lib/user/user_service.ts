import * as passport from 'passport';
import {Request, Response, NextFunction} from 'express';

/**
 * Manage Users through various authentication services/strategies.
 */
export class UserService {
    public passportJWT = passport.authenticate('jwt', {session: false});

    public passportLogin = (req: Request, res: Response, next: NextFunction) => {
        // tslint:disable: no-unsafe-any
        try {
            passport.authenticate('local', {session: false}, (error, user, info) => {
                req.logIn(user, () => {
                    if (error) {
                        // tslint:disable-next-line: no-void-expression
                        return next(error);
                    }
                    !user ? res.status(401).send({error: 'Unauthorized', info}) : next();
                });
            })(req, res, next);
        } catch (error) {
            res.send(error);
        }
    };
}
