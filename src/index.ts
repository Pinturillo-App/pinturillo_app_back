import { Server } from './config/server.config';


try {
    const server = new Server();
    server.startServer();
} catch (error) {
    console.log(error);
}
