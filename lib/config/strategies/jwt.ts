import * as passportJWT from 'passport-jwt';
import * as dotenv from 'dotenv';
import {userModel as User} from '../../user/user_model';

dotenv.config();
const jwtStrategy = passportJWT.Strategy;

// tslint:disable: no-unsafe-any

/**
 * Passport JWT Strategy
 */
export class JWT {
    public init = (_passport: any) => {
        _passport.use(
            new jwtStrategy(
                {
                    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme('JWT'),
                    secretOrKey: process.env.JWT_SECRET,
                },
                async (payload: any, done) => {
                    try {
                        // Check for expiration date
                        if (payload.exp < Date.now()) {
                            done(undefined, false, {message: 'token expired'});
                        }

                        // Find the user specified in token
                        const user = await User.findById(payload.sub).exec();

                        // If user doesn't exist, handle it.
                        if (!user) {
                            done(undefined, false, {message: 'User does not exist with given token'});
                        }

                        // Otherwise return the user
                        done(undefined, user);
                    } catch (error) {
                        done(error);
                    }
                }
            )
        );
    };
}
