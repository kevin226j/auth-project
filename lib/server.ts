import {App} from './app';
import {UserRoutes} from './user/user_routes';

// Initialize port, default to 3000.
const port: number = process.env.PORT !== undefined ? parseInt(process.env.PORT, 10) : 3000;
const app: App = new App(port);

// Initialize Route Handlers
const userRoutes = new UserRoutes();

// Add Controllers to Routes
app.addRoute('/api/users', userRoutes.router);

// Start app server.
app.start();
