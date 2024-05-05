import { SocketService } from './../services/socket.service';
import { WebSocket } from 'ws';


export class SocketController {
    private socketService: SocketService;

    constructor() {
        this.socketService = new SocketService();
    }

    public joinRoom = (idRoom: number, userName: string, ws: WebSocket) => {
        this.socketService.joinRoom(idRoom, userName, ws);
    }

    public leaveRoom = (idRoom: number, ws: WebSocket) => {
        this.socketService.leaveRoom(idRoom, ws);
    }

    public sendMessageToRoom = (idRoom: number, message: string, ws: WebSocket) => {
        this.socketService.sendMessageToRoom(idRoom, message, ws);
    }
}