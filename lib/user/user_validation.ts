import * as joi from 'joi';

export const userValidation = {
    authSchema: joi.object().keys({
        name: joi.string(),
        email: joi
            .string()
            .email()
            .required(),
        password: joi.string().required(),
    }),
};
