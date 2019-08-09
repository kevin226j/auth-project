import * as joi from 'joi';
import * as express from 'express';
import {HttpException} from '../handlers/http_exception';
import {ErrorHandler} from '../handlers/error_handler';

// Validate request body.
// tslint:disable: no-unsafe-any
export const validateModel = (schema: joi.ObjectSchema) => {
    return (req: any, res: any, next: any) => {
        const result = joi.validate(req.body, schema);

        if (result.error) {
            //return new HttpException(400, result.error.message);
            return res.status(400).send({error: result.error.message});
        } else {
            if (!req.body.value) {
                req.value = {};
            }
            req.value.body = result.value;
            next();
        }
    };
};
