import { Server } from './config/server.config';


const server = new Server();

try {
    server.startServer();
} catch (error) {
    console.log(error);
}