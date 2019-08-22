import {Document} from 'mongoose';

/**
 * enum for method of Login
 */
export enum EType {
    'local',
    'google',
    'facebook',
    'twitter',
}

/**
 * Interface for Local Login
 */
interface ILocalLogin {
    name: string;
    email: string;
    password: string;
}

/**
 * Interface for Google Login
 */
interface IGoogleLogin {
    id?: string;
    token: string;
    email: string;
    name: string;
}

/**
 * Interface for Facebook Login
 */
interface IFacebookLogin {
    id?: string;
    token: string;
    email: string;
    name: string;
}

/**
 * Interface for Twitter Login
 */
interface ITwitterLogin {
    id?: string;
    token: string;
    displayName: string;
    name: string;
}

/**
 * Interface for User
 */
export interface IUser extends Document {
    [x: string]: any;
    method: EType;
    local?: ILocalLogin;
    facebook?: IFacebookLogin;
    google?: IGoogleLogin;
    twitter?: ITwitterLogin;
}
