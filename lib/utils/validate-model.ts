import * as joi from 'joi';
import {Handler} from '../exception/handler';

// tslint:disable: no-unsafe-any

/**
 * Validate request body from http client.
 * @param schema - joi schema object
 */
export const validateModel = (schema: joi.ObjectSchema) => {
    return (req: any, res: any, next: any) => {
        // validate using specified validation schema and request body.
        const result = joi.validate(req.body, schema);

        if (result.error) {
            return res.status(400).send(new Handler().errorResponse(result.error.message, result.error.details));
        } else {
            if (!req.body.value) {
                req.value = {};
            }
            req.value.body = result.value;
            next();
        }
    };
};
