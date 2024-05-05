import { SocketController } from './../controllers/socket.controller';
import express from 'express-ws';
import { WebSocket } from 'ws';
import expressWs from 'express-ws';
import { DATA_IS_EMPTY, UNKNOWN_MESSAGE_TYPE } from '../utilities/messages.utility';


const socketController = new SocketController();

export const setupSocketRoutes = (path: string, app: express.Application, expressWsInstance: expressWs) => {
    expressWsInstance.applyTo(app);

    app.ws(`${ path }/room/:id`, (ws, req) => {
        const idRoom = req.params.id;
        const userName = req.headers.username;
        const userAvatar = req.headers.avatar;

        handleSocketConnection(idRoom, userName, userAvatar, ws);
    });

    return app;
};

const handleSocketConnection = (idRoom: number, userName: string, userAvatar: string, ws: WebSocket) => {
    socketController.joinRoom(idRoom, userName, userAvatar, ws);
    socketController.sendMessageToRoom(idRoom, `${ userName } has joined`, ws);

    ws.on('message', async (msg: string) => {
        handleIncomingMessage(idRoom, userName, msg, ws);
    });

    ws.on('close', () => {
        socketController.leaveRoom(idRoom, ws);
    });
}

const handleIncomingMessage = (idRoom: number, userName: string, msg: string, ws: WebSocket) => {
    const jsonMessage: { type: string, data?: any } = JSON.parse(msg);

    switch (jsonMessage.type) {
        case 'SEND_MESSAGE':
            if (!jsonMessage.data) {
                // ws.send(JSON.stringify({ error: DATA_IS_EMPTY }));
                socketController.sendMessageToUser(idRoom, DATA_IS_EMPTY, ws);
                return;
            }
            socketController.sendMessageToRoom(idRoom, `${userName} says: ${jsonMessage.data}`, ws);
            break;
        case 'START_TURN':
            socketController.startTurnInRoom(idRoom, ws);
            socketController.sendMessageToRoom(idRoom, `${userName} has started their turn`, ws);
            break;
        case 'FINISH_TURN':
            socketController.sendMessageToRoom(idRoom, `${userName} has finished their turn`, ws);
            break;
        default:
            // ws.send(JSON.stringify({ error: UNKNOWN_MESSAGE_TYPE }));
            socketController.sendMessageToUser(idRoom, UNKNOWN_MESSAGE_TYPE, ws);
            return;
    }
}
