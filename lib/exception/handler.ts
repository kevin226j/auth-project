import {NextFunction, Request, Response} from 'express';

// tslint:disable: no-unsafe-any

/**
 * Define error and exception handlers
 */
export class Handler {
    // Handles all not found routes
    public notFoundHandler = (_express: any): any => {
        _express.use('*', (req: Request, res: Response, next: NextFunction) => {
            const apiPrefix = 'api';
            if (req.originalUrl.includes(apiPrefix)) {
                res.status(404).json({
                    error: 'URL Not Found and/or Method Invalid.',
                });
            } else {
                res.status(404).send({
                    error: 'Page Not Found.',
                });
            }
        });
    };

    // Handles routes errors/exceptions
    public clientErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): any => {
        if (req.xhr) {
            return res.status(500).send('Something went wrong.');
        } else {
            next(err);
        }
    };

    public errorResponse = (message: string, err?: any) => {
        return {
            error: {
                message,
                stack: err,
            },
            timestamp: new Date(new Date().getTime()).toLocaleString('en-US', {timeZone: 'America/Los_Angeles'}),
        };
    };
}
