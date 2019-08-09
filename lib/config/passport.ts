import * as passport from 'passport';
import * as passportLocal from 'passport-local';
import * as passportJWT from 'passport-jwt';
import * as dotenv from 'dotenv';

import {userModel as User} from '../user/user_model';
import {Request, Response, NextFunction} from 'express';

dotenv.config();

// tslint:disable: no-void-expression
// tslint:disable: no-unsafe-any

const localStrategy = passportLocal.Strategy;
const jwtStrategy = passportJWT.Strategy;

passport.serializeUser<any, any>((user, done) => {
    done(undefined, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

// JSON Web Token Strategy
passport.use(
    new jwtStrategy(
        {
            jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'Hello World',
        },
        async (payload: any, done) => {
            try {
                // Check expiration date
                if (payload.exp < Date.now()) {
                    return done(undefined, false, {message: 'token expired'});
                }

                // Find the user specified in token
                const user = User.findById(payload.sub);

                // If user doesn't exist, handle it.
                if (!user) {
                    return done(undefined, false, {message: 'User does not exist with given token'});
                }

                // Otherwise return the user
                return done(undefined, user);
            } catch (error) {
                return done(error, false, {message: 'error'});
            }
        }
    )
);

// Local Strategy
passport.use(
    new localStrategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {
            try {
                // Find user given email
                const user = await User.findOne({'local.email': email}).exec();

                // If user doesn't exist, handle it
                if (!user) {
                    return done(undefined, false, {message: 'error'});
                }

                // Check if password is correct, if not handle it.
                const isMatched = await user.isValidPassword(password);

                if (!isMatched) {
                    return done(undefined, false, {message: 'error'});
                }

                // Otherwise return user
                return done(undefined, user);
            } catch (error) {
                return done(error, {message: 'error'});
            }
        }
    )
);

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
