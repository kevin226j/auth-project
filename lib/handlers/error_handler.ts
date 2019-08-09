import {Router} from 'express';
import {HttpException} from './http_exception';
// tslint:disable: no-unsafe-any

/**
 * Error Handler Class
 */
export class ErrorHandler {
    public router: Router;

    constructor() {
        this.router = Router();
        this.router.use(this.middlewareError);
    }

    public notFoundError() {
        return (req: any, res: any, next: any) => {
            res.status(404);

            // respond with json
            if (req.accepts('json')) {
                res.send({error: 'Not found'});
            }
        };
    }

    public middlewareError(error: HttpException, req: any, res: any, next: any) {
        const status = error.status === undefined ? 500 : error.status;
        const message = error.message === undefined ? 'Something went wrong.' : error.message;
        res.status(status).send({status, message});
    }
}
