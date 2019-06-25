import {App} from './app';

// Initialize port, default to 3000.
const port: number = process.env.PORT !== undefined ? parseInt(process.env.PORT, 10) : 3000;
const app: App = new App(port);

// Start app server.
app.start();
