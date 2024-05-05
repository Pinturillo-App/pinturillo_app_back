import { WebSocket } from 'ws';
import { RoomRepository } from '../repositories/room.repository';


export class SocketService {
    private rooms: object;
    private roomRepository: RoomRepository;

    constructor() {
        this.rooms = {};
        this.roomRepository = new RoomRepository();
    }

    public joinRoom = (idRoom: number, userName: string, ws: WebSocket): void => {
        if (!this.rooms[idRoom] && this.roomRepository.findRoomById(idRoom)) {
            this.rooms[idRoom] = new Set();
        }

        this.rooms[idRoom].add({ ws, userName });
    }

    public leaveRoom = (idRoom: number, ws: WebSocket): void => {
        if (this.rooms[idRoom] && this.roomRepository.findRoomById(idRoom)) {
            this.rooms[idRoom].delete(ws);

            if (this.rooms[idRoom].size === 0) {
                delete this.rooms[idRoom];
            }
        }
    }

    public sendMessageToRoom = (idRoom: number, message: string, ws: WebSocket): void => {
        if (this.rooms[idRoom] && this.roomRepository.findRoomById(idRoom)) {
            this.rooms[idRoom].forEach(client => {
                if (client.ws !== ws && client.ws.readyState === ws.OPEN) {
                    client.ws.send(message);
                }
            });
        }
    }
}