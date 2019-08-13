import * as passport from 'passport';
import * as dotenv from 'dotenv';

import {Request, Response, NextFunction} from 'express';

import {userModel as User} from '../user/user_model';
import {Local as LocalStrategy, JWT as JWTStrategy} from './strategies';

dotenv.config();

// tslint:disable: no-void-expression
// tslint:disable: no-unsafe-any

/**
 * Passport configuration class
 */
export class Passport {
    private readonly localStrategy: LocalStrategy = new LocalStrategy();
    private readonly jwtStrategy: JWTStrategy = new JWTStrategy();

    public init = (): void => {
        passport.serializeUser<any, any>((user, done) => {
            done(undefined, user._id);
        });

        passport.deserializeUser((id, done) => {
            User.findById(id, (err, user) => {
                done(err, user);
            });
        });

        this.loadStrategies();
    };

    public loadStrategies = (): void => {
        try {
            // Add strategies here.
            this.localStrategy.init(passport);
            this.jwtStrategy.init(passport);
        } catch (error) {
            // add log here.
            throw new Error(error);
        }
    };

    public isAuthenticated = (req: Request, res: Response, next: NextFunction): any => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.status(401).send({error: 'Invalid Username and/or Password'});
    };

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

// const localStrategy = passportLocal.Strategy;
// const jwtStrategy = passportJWT.Strategy;

// // JSON Web Token Strategy
// passport.use(
//     new jwtStrategy(
//         {
//             jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
//             secretOrKey: 'Hello World',
//         },
//         async (payload: any, done) => {
//             try {
//                 // Check expiration date
//                 if (payload.exp < Date.now()) {
//                     return done(undefined, false, {message: 'token expired'});
//                 }

//                 // Find the user specified in token
//                 const user = User.findById(payload.sub);

//                 // If user doesn't exist, handle it.
//                 if (!user) {
//                     return done(undefined, false, {message: 'User does not exist with given token'});
//                 }

//                 // Otherwise return the user
//                 return done(undefined, user);
//             } catch (error) {
//                 return done(error, false, {message: 'error'});
//             }
//         }
//     )
// );

// // Local Strategy
// passport.use(
//     new localStrategy(
//         {
//             usernameField: 'email',
//         },
//         async (email, password, done) => {
//             try {
//                 // Find user given email
//                 const user = await User.findOne({'local.email': email}).exec();

//                 // If user doesn't exist, handle it
//                 if (!user) {
//                     return done(undefined, false, {message: 'error'});
//                 }

//                 // Check if password is correct, if not handle it.
//                 const isMatched = await user.isValidPassword(password);

//                 if (!isMatched) {
//                     return done(undefined, false, {message: 'error'});
//                 }

//                 // Otherwise return user
//                 return done(undefined, user);
//             } catch (error) {
//                 return done(error, {message: 'error'});
//             }
//         }
//     )
// );

// /**
//  * Passport configuration class
//  */
// export class Passport {
//     public init(): void {
//         // JSON Web Token Strategy
//         passport.use(
//             new jwtStrategy(
//                 {
//                     jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
//                     secretOrKey: 'Hello World',
//                 },
//                 async (payload: any, done) => {
//                     try {
//                         // Check expiration date
//                         if (payload.exp < Date.now()) {
//                             return done(undefined, false, {message: 'token expired'});
//                         }

//                         // Find the user specified in token
//                         const user = User.findById(payload.sub);

//                         // If user doesn't exist, handle it.
//                         if (!user) {
//                             return done(undefined, false, {message: 'User does not exist with given token'});
//                         }

//                         // Otherwise return the user
//                         return done(undefined, user);
//                     } catch (error) {
//                         return done(error, false, {message: 'error'});
//                     }
//                 }
//             )
//         );

//         // Local Strategy
//         passport.use(
//             new localStrategy(
//                 {
//                     usernameField: 'email',
//                 },
//                 async (email, password, done) => {
//                     try {
//                         // Find user given email
//                         const user = await User.findOne({'local.email': email}).exec();

//                         // If user doesn't exist, handle it
//                         if (!user) {
//                             return done(undefined, false, {message: 'error'});
//                         }

//                         // Check if password is correct, if not handle it.
//                         const isMatched = await user.isValidPassword(password);

//                         if (!isMatched) {
//                             return done(undefined, false, {message: 'error'});
//                         }

//                         // Otherwise return user
//                         return done(undefined, user);
//                     } catch (error) {
//                         return done(error, {message: 'error'});
//                     }
//                 }
//             )
//         );
//     }
// }

// tslint:disable: no-unsafe-any
// tslint:disable: no-void-expression
