import * as passportJWT from 'passport-jwt';
import * as dotenv from 'dotenv';
import {userModel as User} from '../../user/user_model';
import {Handler} from '../../exception/handler';

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
                        // Find the user specified in token
                        const user = await User.findById(payload.sub).exec();

                        // Check for token expiration date
                        if (payload.exp < Date.now()) {
                            // If token is expired return error.
                            done('Token Expired.', false);
                        } else if (!user) {
                            // If user doesn't exist, handle it.
                            done('User does not exist with given token', false);
                        } else {
                            // Otherwise return the user
                            done(undefined, user);
                        }
                    } catch (error) {
                        throw new Handler().errorResponse(error.name, error.message);
                    }
                }
            )
        );
    };
}
