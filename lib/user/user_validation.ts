import * as joi from 'joi';

/**
 * Validation method for User using npm JOI.
 */
export const userValidation = {
    model: joi.object().keys({
        name: joi.string(),
        email: joi
            .string()
            .email()
            .required(),
        password: joi.string().required(),
    }),
};
