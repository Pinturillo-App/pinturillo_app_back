import { SocketService } from './../services/socket.service';
import { WebSocket } from 'ws';


export class SocketController {
    private socketService: SocketService;

    constructor() {
        this.socketService = new SocketService();
    }

    public joinRoom = (idRoom: number, userName: string, userAvatar: string, userPoints: number, ws: WebSocket) => {
        try {
            this.socketService.joinRoom(idRoom, userName, userAvatar, userPoints,  ws);
        } catch(error) {
            console.log(error);
        }
    }

    public leaveRoom = (idRoom: number, ws: WebSocket, userName: string, userAvatar: string, userPoints: number) => {
        try {
            this.socketService.leaveRoom(idRoom, ws, userName, userAvatar, userPoints);
        } catch(error) {
            console.log(error);
        }
    }

    public startTurnInRoom = (idRoom: number, ws: WebSocket) => {
        try {
            this.socketService.startTurnInRoom(idRoom,  ws);
        } catch(error) {
            console.log(error);
        }
    }

    public sendMessageToUser = (idRoom: number, message: string, ws: WebSocket) => {
        try {
            this.socketService.sendMessageToUser(idRoom, message, ws);
        } catch(error) {
            console.log(error);
        }
    }

    public sendMessageToRoom = (idRoom: number, message: string, ws: WebSocket) => {
        try {
            this.socketService.sendMessageToRoom(idRoom, message, ws);
        } catch(error) {
            console.log(error);
        }
    }

    public tryToGuessWord = (idRoom: number, word: string, ws: WebSocket, userName: string, userAvatar: string, userPoints: number, pointsToSum: number) => {
        try {
            this.socketService.tryToGuessWord(idRoom, word, ws, userName, userAvatar, userPoints, pointsToSum);
        } catch(error) {
            console.log(error);
        }
    }

    public finishTurn = (idRoom: number, ws: WebSocket, userName: string, timeFinish: boolean) => {
        try {
            this.socketService.finishTurn(idRoom, ws, userName, timeFinish);
        } catch(error) {
            console.log(error);
        }
    }

    public closeRoom = (idRoom: number) => {
        try {
            this.socketService.closeRoom(idRoom);
        } catch(error) {
            console.log(error);
        }
    }

    public drawLine = (idRoom: number, ws: WebSocket, mouseMovement: any) => {
        try {
            this.socketService.drawLine(idRoom, ws, mouseMovement);
        } catch(error) {
            console.log(error);
        }
    }

    public drawHistory = (idRoom: number, ws: WebSocket) => {
        try {
            this.socketService.drawHistory(idRoom, ws);
        } catch(error) {
            console.log(error);
        }
    }

    public eraseBoard = (idRoom: number) => {
        try {
            this.socketService.eraseBoard(idRoom);
        } catch(error) {
            console.log(error);
        }
    }

    public sendRoomUsers = (idRoom: number, ws: WebSocket) => {
        try {
            this.socketService.sendRoomUsers(idRoom, ws);
        } catch(error) {
            console.log(error);
        }
    }
}
