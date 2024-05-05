import { SocketController } from './../controllers/socket.controller';
import express from 'express-ws';
import { WebSocket } from 'ws';
import expressWs from 'express-ws';


const socketController = new SocketController();

export const setupSocketRoutes = (path: string, app: express.Application, expressWsInstance: expressWs) => {
    expressWsInstance.applyTo(app);

    app.ws(`${ path }/room/:id`, (ws, req) => {
        const idRoom = req.params.id;
        const userName = req.headers.username;

        handleSocketConnection(idRoom, userName, ws);
    });

    return app;
};

const handleSocketConnection = (idRoom: number, userName: string, ws: WebSocket) => {
    socketController.joinRoom(idRoom, userName, ws);
    socketController.sendMessageToRoom(idRoom, `${ userName } has joined`, ws);

    ws.on('message', async (msg) => {
        handleIncomingMessage(idRoom, userName, msg, ws);
    });

    ws.on('close', () => {
        socketController.leaveRoom(idRoom, ws);
    });
}

const handleIncomingMessage = (idRoom: number, userName: string, msg: string, ws: WebSocket) => {
    const jsonMessage: { type: string, data: any } = JSON.parse(msg);

    if (jsonMessage.type === 'SEND_MESSAGE') {
        socketController.sendMessageToRoom(idRoom, `${ userName } says: ${ jsonMessage.data }`, ws);
    } else if (jsonMessage.type === 'START_TURN') {
        socketController.sendMessageToRoom(idRoom, `${ userName } has started their turn`, ws);
    } else if (jsonMessage.type === 'FINISH_TURN') {
        socketController.sendMessageToRoom(idRoom, `${ userName } has finished their turn`, ws);
    }
}
