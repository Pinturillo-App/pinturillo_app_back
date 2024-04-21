import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { errorHandler } from './../middlewares/error.middleware';
import * as swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swagger';
import { AppDataSource } from './data-source.config';


dotenv.config();


export class Server {
    private app: express.Application;
    private port: number;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || '3000', 10);

        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeDataSource();
    }

    private initializeMiddleware(): void {
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());
        this.app.use(errorHandler);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }

    private initializeRoutes(): void {
    }

    private async initializeDataSource(): Promise<void> {
        try {
            await AppDataSource.initialize();
            this.startServer();
            console.log('Data Source has been initialized!');
        } catch (error) {
            console.log(error);
        }
    }

    private startServer(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${ this.port }`);
        });
    }
}


new Server();
