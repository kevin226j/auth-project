import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';
import {Request, Response, NextFunction} from 'express';
import {userModel as User} from './user_model';
import {IUser, IToken} from '../interfaces';
import {Handler} from '../exception/handler';

dotenv.config();

// tslint:disable: max-classes-per-file
// tslint:disable: no-unsafe-any

export interface IUserData {
    name: string;
    email: string;
    password: string;
}

/**
 * Controller used to register and login users.
 */
export class UserController {
    public _util = new UserUtil();
    public user: any = User;

    public registration = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: IUserData = req.body;

            const foundUser = await this.user.findOne({'local.email': userData.email}).exec();

            if (foundUser) {
                // If user is found, throw an exception.
                res.status(400).send(new Handler().errorResponse(`Email ${userData.email} already exists in system.`));
            } else {
                // Create new user based on User Schema
                const newUser = new User({
                    method: 'local',
                    local: {
                        name: userData.name,
                        email: userData.email,
                        password: userData.password,
                    },
                });

                // Generate salt.
                const salt = await bcrypt.genSalt(15);

                // Generate password with salt and hash.
                const hash = await bcrypt.hash(newUser.local.password, salt);

                // Re-assign password to hashed version of password
                newUser.local.password = hash;

                // Save created User
                await newUser.save();

                // Generate Token
                const token: IToken = this._util.signToken(newUser);

                // Set Cookie Header
                res.setHeader('Set-Cookie', [this.createCookie(token)]);

                res.status(200).json({token});
            }
        } catch (error) {
            throw new Handler().errorResponse(error.name, error.message);
        }
    };

    public login = (req: Request, res: Response, next: NextFunction) => {
        // Retrieve user data from auth local strategy.
        const userData: IUser = req.user;

        // Sign token
        const token: IToken = this._util.signToken(userData);

        // Set Cookie Header
        res.setHeader('Set-Cookie', [this.createCookie(token)]);

        // Send token
        res.status(200).json(token);
    };

    private createCookie(token: IToken) {
        return `Authorization=${token.token}; HttpOnly; Max-Age=${token.expiresIn}`;
    }
}

/**
 * This is the User utility class to sign tokens.
 */
class UserUtil {
    public signToken(user: any): IToken {
        return {
            token: jwt.sign(
                {
                    iss: process.env.JWT_ISS,
                    sub: user.id,
                    iat: new Date().getTime(),
                    exp: new Date().setTime(new Date().getTime() + 1 * 3600 * 1000), // 1 hour
                },
                process.env.JWT_SECRET
            ),
            expiresIn: 60 * 60, // 1 hour
        };
    }
}
