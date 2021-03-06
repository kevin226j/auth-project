import * as bcrypt from 'bcryptjs';
import {Schema, Model, model} from 'mongoose';
import {IUser} from '../interfaces';
import {Handler} from '../exception/handler';

// tslint:disable: no-unsafe-any

/**
 * Mongoose User Schema. Validation will be used by JOI npm
 */
const userSchema: Schema = new Schema(
    {
        method: {
            type: String,
            enum: ['local', 'google', 'facebook', 'twitter'],
            required: true,
        },
        local: {
            name: {
                type: String,
            },
            email: {
                type: String,
                lowercase: true,
            },
            password: {
                type: String,
            },
        },
        google: {
            id: {
                type: String,
            },
            token: {
                type: String,
            },
            email: {
                type: String,
            },
            name: {
                type: String,
            },
        },
        facebook: {
            id: {
                type: String,
            },
            token: {
                type: String,
            },
            email: {
                type: String,
            },
            name: {
                type: String,
            },
        },
        twitter: {
            id: {
                type: String,
            },
            token: {
                type: String,
            },
            displayName: {
                type: String,
            },
            name: {
                type: String,
            },
        },
    },
    {
        timestamps: true,
    }
);

/**
 * Add method to User Schema to check if passwords match, return true if passwords match.
 */
userSchema.methods.isValidPassword = async function(enteredPassword: string) {
    try {
        // Verify if entered password matches the user's stored password.
        return await bcrypt.compare(enteredPassword, this.local.password);
    } catch (error) {
        throw new Handler().errorResponse(error.name, error.message);
    }
};

export const userModel: Model<IUser> = model<IUser>('user', userSchema);
