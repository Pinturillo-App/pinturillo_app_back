import { SocketService } from './../services/socket.service';
import { WebSocket } from 'ws';


export class SocketController {
    private socketService: SocketService;

    constructor() {
        this.socketService = new SocketService();
    }

    joinRoom(idRoom: number, userName: string, ws: WebSocket) {
        this.socketService.joinRoom(idRoom, userName, ws);
    }

    leaveRoom(idRoom: number, ws: WebSocket) {
        this.socketService.leaveRoom(idRoom, ws);
    }

    sendMessageToRoom(idRoom: number, message: string, ws: WebSocket) {
        this.socketService.sendMessageToRoom(idRoom, message, ws);
    }
}