import { WebSocket } from 'ws';
import { RoomRepository } from '../repositories/room.repository';
import { USER_NOT_PROVIDED } from '../utilities/messages.utility';


export class SocketService {
    private rooms: object;
    private roomRepository: RoomRepository;

    constructor() {
        this.rooms = {};
        this.roomRepository = new RoomRepository();
    }

    public joinRoom = (idRoom: number, userName: string, userAvatar: string, ws: WebSocket): void => {
        if(!userName || !userAvatar ) {
            ws.send(JSON.stringify({ error: USER_NOT_PROVIDED }));
            ws.close();
            return;
        }
        
        if (!this.rooms[idRoom] && this.roomRepository.findRoomById(idRoom)) {
            this.rooms[idRoom] = new Set();
        }

        this.rooms[idRoom].add({ ws, userName,  userAvatar});
    }

    public leaveRoom = (idRoom: number, ws: WebSocket): void => {
        if (this.rooms[idRoom] && this.roomRepository.findRoomById(idRoom)) {
            this.rooms[idRoom].delete(ws);

            if (this.rooms[idRoom].size === 0) {
                delete this.rooms[idRoom];
            }
        }
    }

    public startTurnInRoom = async (idRoom: number, ws: WebSocket): Promise<void> => {
        const room = await this.roomRepository.findRoomById(idRoom);

        if (this.rooms[idRoom] && room) {
            const words = room.categories['words'];
            const randomIndex = Math.floor(Math.random() * words.length);
            const selectedWord = words[randomIndex].text;

            // ws.send(JSON.stringify({ type: 'WORD_TO_DRAW', data: selectedWord }));
            this.sendMessageToUser(idRoom, `You must draw: ${selectedWord}`, ws);
        }
    }

    public sendMessageToUser = (idRoom: number, message: string, ws: WebSocket): void => {
        if (this.rooms[idRoom] && this.roomRepository.findRoomById(idRoom)) {
            this.rooms[idRoom].forEach(client => {
                if (client.ws == ws) {
                    client.ws.send(message);
                }
            });
        }
    }

    public sendMessageToRoom = (idRoom: number, message: string, ws: WebSocket): void => {
        if (this.rooms[idRoom] && this.roomRepository.findRoomById(idRoom)) {
            this.rooms[idRoom].forEach(client => {
                if (client.ws.readyState === ws.OPEN) {
                    client.ws.send(message);
                }
            });
        }
    }
}