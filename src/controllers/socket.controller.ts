import { SocketService } from './../services/socket.service';
import { WebSocket } from 'ws';


export class SocketController {
    private socketService: SocketService;

    constructor() {
        this.socketService = new SocketService();
    }

    public joinRoom = (idRoom: number, userName: string, userAvatar: string, userPoints: number, ws: WebSocket) => {
        this.socketService.joinRoom(idRoom, userName, userAvatar, userPoints,  ws);
    }

    public leaveRoom = (idRoom: number, ws: WebSocket, userName: string, userAvatar: string, userPoints: number) => {
        this.socketService.leaveRoom(idRoom, ws, userName, userAvatar, userPoints );
    }

    public startTurnInRoom = (idRoom: number, ws: WebSocket) => {
        this.socketService.startTurnInRoom(idRoom,  ws);
    }

    public sendMessageToUser = (idRoom: number, message: string, ws: WebSocket) => {
        this.socketService.sendMessageToUser(idRoom, message, ws);
    }

    public sendMessageToRoom = (idRoom: number, message: string, ws: WebSocket) => {
        this.socketService.sendMessageToRoom(idRoom, message, ws);
    }

    public tryToGuessWord = (idRoom: number, word: string, ws: WebSocket, userName: string, userAvatar: string, userPoints: number, pointsToSum: number ) => {
        this.socketService.tryToGuessWord(idRoom, word, ws, userName, userAvatar, userPoints, pointsToSum );
    }

    public closeRoom = (idRoom: number) => {
        this.socketService.closeRoom(idRoom);
    }
}