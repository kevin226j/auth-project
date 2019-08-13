import * as passportLocal from 'passport-local';
import {userModel as User} from '../../user/user_model';

const localStrategy = passportLocal.Strategy;

// tslint:disable: no-unsafe-any

/**
 * Passport Local Strategy
 */
export class Local {
    public init = (_passport: any) => {
        _passport.use(
            new localStrategy(
                {
                    usernameField: 'email',
                },
                async (email, password, done) => {
                    try {
                        // Find user given email
                        User.findOne({'local.email': email}, async (err, user) => {
                            // If there is an error, handle it.
                            if (err) {
                                done(err);
                            }

                            // If user doesn't exist
                            if (user === null) {
                                done(undefined, false, {message: `Email ${email} not found.`});
                            }
                            // If user exists, but does not have associated password. User is using provider to login
                            else if (user && user.password === null) {
                                done(undefined, false, {
                                    message: `Email ${email} not registered with a password. Check provider.`,
                                });
                            } else {
                                // Check if password is correct, if not handle it.
                                const isValid = await user.isValidPassword(password);

                                // Return user if
                                if (isValid) {
                                    console.log('user info: ' + user);
                                    done(undefined, user);
                                } else {
                                    done(undefined, false, {message: 'Invalid e-mail and/or password.'});
                                }
                            }
                        });
                    } catch (error) {
                        done(error);
                    }
                }
            )
        );
    };
}
