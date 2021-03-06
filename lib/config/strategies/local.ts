import * as passportLocal from 'passport-local';
import {userModel as User} from '../../user/user_model';
import {Handler} from '../../exception/handler';

const localStrategy = passportLocal.Strategy;

// tslint:disable: no-unsafe-any

/**
 * Passport Local Strategy class for passport.ts
 */
export class Local {
    /**
     * Method inializes strategy.
     * @param _passport - include passport config.
     */
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
                                    done(undefined, user);
                                } else {
                                    done(undefined, false, {message: 'Invalid e-mail and/or password.'});
                                }
                            }
                        });
                    } catch (error) {
                        throw new Handler().errorResponse(error.name, error.message);
                    }
                }
            )
        );
    };
}
