import {Document} from 'mongoose';

export enum EType {
    'local',
    'google',
    'facebook',
    'twitter',
}

interface ILocalLogin {
    name: string;
    email: string;
    password: string;
}

interface IGoogleLogin {
    id?: string;
    token: string;
    email: string;
    name: string;
}

interface IFacebookLogin {
    id?: string;
    token: string;
    email: string;
    name: string;
}

interface ITwitterLogin {
    id?: string;
    token: string;
    displayName: string;
    name: string;
}

export interface IUser extends Document {
    [x: string]: any;
    method: EType;
    local?: ILocalLogin;
    facebook?: IFacebookLogin;
    google?: IGoogleLogin;
    twitter?: ITwitterLogin;
}
