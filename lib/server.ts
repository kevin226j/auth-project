import {App} from './app';
import {UserRoutes} from './user/user_routes';
import {Router} from 'express';

import {ErrorHandler} from './handlers/error_handler';

// Initialize port, default to 3000.
const port: number = process.env.PORT !== undefined ? parseInt(process.env.PORT, 10) : 3000;
const app: App = new App(port);

// Initialize Route Handlers
const userRoutes = new UserRoutes();

// Add Controllers to Routes
app.addRoute('/users', userRoutes.router);

// 404
const errorHandler = new ErrorHandler();
app.addRoute('*', errorHandler.router);

// Start app server.
app.start();
