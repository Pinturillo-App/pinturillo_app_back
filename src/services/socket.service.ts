import { WebSocket } from 'ws';


export class SocketService {
    private rooms: object;

    constructor() {
        this.rooms = {};
    }

    joinRoom(idRoom: number, userName: string, ws: WebSocket): void {
        if (!this.rooms[idRoom]) {
            this.rooms[idRoom] = new Set();
        }

        this.rooms[idRoom].add({ ws, userName });
    }

    leaveRoom(idRoom: number, ws: WebSocket): void {
        if (this.rooms[idRoom]) {
            this.rooms[idRoom].delete(ws);

            if (this.rooms[idRoom].size === 0) {
                delete this.rooms[idRoom];
            }
        }
    }

    sendMessageToRoom(idRoom: number, message: string, ws: WebSocket): void {
        if (this.rooms[idRoom]) {
            this.rooms[idRoom].forEach(client => {
                if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                    client.ws.send(message);
                }
            });
        }
    }
}