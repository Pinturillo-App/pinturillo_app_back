import { SocketService } from './../services/socket.service';
import { WebSocket } from 'ws';


export class SocketController {
    private socketService: SocketService;

    constructor() {
        this.socketService = new SocketService();
    }

    public joinRoom = (idRoom: number, userName: string, userAvatar: string, ws: WebSocket) => {
        this.socketService.joinRoom(idRoom, userName, userAvatar, ws);
    }

    public leaveRoom = (idRoom: number, ws: WebSocket) => {
        this.socketService.leaveRoom(idRoom, ws);
    }

    public startTurnInRoom = (idRoom: number, ws: WebSocket) => {
        this.socketService.startTurnInRoom(idRoom, ws);
    }

    public sendMessageToUser = (idRoom: number, message: string, ws: WebSocket) => {
        this.socketService.sendMessageToUser(idRoom, message, ws);
    }

    public sendMessageToRoom = (idRoom: number, message: string, ws: WebSocket) => {
        this.socketService.sendMessageToRoom(idRoom, message, ws);
    }
}