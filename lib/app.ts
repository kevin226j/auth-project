import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as cors from 'cors';

/**
 * Main application class to run server.
 */
export class App {
    public port: number;
    protected app: express.Application;
    protected server: http.Server;
    private db: mongoose.Connection;
    private mode: string;
    private readonly routes: express.Router[] = [];

    /**
     * Constructor method invoked when class App gets instantiated.
     * @param port  takes in a specific port number for app server.
     */
    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.app.set('port', port); // tslint:disable-line: no-backbone-get-set-outside-model
        this.config();
        this.database();
    }

    /**
     * @returns Nothing. Method starts application.
     */
    public start(): void {
        // Serve client files from 'dist' folder.
        this.app.use(express.static(path.resolve(__dirname, '..', 'dist', 'public')));

        // Serve production files.
        this.app.get('*', (req: express.Request, res: express.Response) => {
            res.sendFile(path.resolve(__dirname, '..', 'dist', 'public', 'index.html'));
        });

        // tslint:disable-next-line: no-backbone-get-set-outside-model
        this.app.listen(this.app.get('port'), () => {
            // tslint:disable-next-line: no-console
            console.log(`Server running on port: ${this.port} - mode: ${this.mode}`);
        });
    }

    /**
     * @param routeURL Route url endpoint.
     * @param routeHandler Route handler class for endpoint.
     */
    public addRoute(routeURL: string, routeHandler: express.Router): void {
        // Check if routes have been added to the application server.
        if (this.routes.indexOf(routeHandler) === -1) {
            this.routes.push(routeHandler);
            this.app.use(routeURL, routeHandler);
        }
    }

    /**
     * @returns Nothing. Method sets up database configuration.
     */
    private database(): void {
        // tslint:disable-next-line: prefer-type-cast
        (mongoose as any).Promise = global.Promise;

        // Mongoose object connection with error handler.
        mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true}).catch((error: Error) => {
            // tslint:disable-next-line: no-console
            console.error(`DB connection error: ${error.message}`);
            process.exit();
        });

        // Establish database connection.
        this.db = mongoose.connection;

        // Once connection is opened, and successful log message.
        this.db.once('open', () => {
            // tslint:disable-next-line: no-console
            console.log('DB connected.');
        });
    }

    /**
     * @returns Nothing. Method sets up app configuration.
     */
    private config(): void {
        // Support for application/json
        this.app.use(bodyParser.json());

        // Support for application/x-www-form-urlencoded.
        this.app.use(bodyParser.urlencoded({extended: false}));

        // Support for CORS.
        this.app.use(cors());

        // Create app server.
        this.server = http.createServer(this.app);

        // Environment setting.
        this.mode = process.env.NODE_ENV === undefined ? 'development' : 'production';
        dotenv.config();
    }
}
