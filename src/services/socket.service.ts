import { WebSocket } from 'ws';
import { RoomRepository } from '../repositories/room.repository';
import { USERNAME_AVATAR_NOT_PROVIDED, USER_ALREADY_EXIST_IN_ROOM } from '../utilities/messages.utility';
import e from 'express';


export class SocketService {
    private rooms: object;
    private wordInRoom: object;
    private roomRepository: RoomRepository;

    constructor() {
        this.rooms = {};
        this.wordInRoom = {};
        this.roomRepository = new RoomRepository();
    }

    public joinRoom = (idRoom: number, userName: string, userAvatar: string, userPoints: number, ws: WebSocket): void => {
        let existUser = false;
        if (!userName || !userAvatar) {
            ws.send(JSON.stringify({ error: USERNAME_AVATAR_NOT_PROVIDED }));
            ws.close();
            return;
        } if (this.roomRepository.findRoomById(idRoom)) {
            if(!this.rooms[idRoom]) this.rooms[idRoom] = new Set();
            this.rooms[idRoom].forEach(client => {
                if(client.userName === userName) {
                    ws.send(JSON.stringify({ error: USER_ALREADY_EXIST_IN_ROOM }));
                    ws.close();
                    existUser = true;
                }
            })

            if(!existUser){
                this.rooms[idRoom].add({ ws, userName, userAvatar, userPoints});
                console.log(this.rooms)
                this.sendMessageToRoom(idRoom, `${ userName } has joined the room`, ws);
            }
        }
    }

    public leaveRoom = (idRoom: number, ws: WebSocket, userName: string, userAvatar: string, userPoints: number ): void => {
        if (this.rooms[idRoom] && this.roomRepository.findRoomById(idRoom)) {
            this.rooms[idRoom].forEach(client => { 
                if( client.userName === userName && client.userAvatar === userAvatar && client.userPoints === userPoints) {
                    client.ws.close();
                    this.rooms[idRoom].delete(client);
                }
            });

            if (this.rooms[idRoom].size === 0){
                this.deleteRoomInfo(idRoom)
            }
        }
    }

    public closeRoom = (idRoom: number): void => {
        this.rooms[idRoom].forEach(client => {
            client.ws.close();
        });
        this.deleteRoomInfo(idRoom);
    }

    public startTurnInRoom = async (idRoom: number, ws: WebSocket): Promise<void> => {
        const room = await this.roomRepository.findRoomById(idRoom);
        if (this.rooms[idRoom] && room) {
            const words = room.categories['words'];
            const randomIndex = Math.floor(Math.random() * words.length);
            const selectedWord = words[randomIndex].text;

            this.changeWordInGame(idRoom, selectedWord);
            this.sendMessageToUser(idRoom, `You must draw: ${ selectedWord }`, ws);
        }
    }

    public tryToGuessWord = async (idRoom: number, word: string, ws: WebSocket,  userName: string, userAvatar: string, userPoints: number, pointsToSum: number ): Promise<void> => {
        if (this.rooms[idRoom] && this.roomRepository.findRoomById(idRoom)) {
            if (this.wordInRoom[idRoom].has(word)) {
                this.rooms[idRoom].forEach(client => {
                    if (client.userName === userName) {
                        client.userPoints += pointsToSum;
                        this.sendMessageToRoom(idRoom, `${ userName } has guessed the word`, ws);
                    }
                });
            }
            else{
                this.sendMessageToRoom(idRoom, `${ userName } says: ${ word }`, ws);
            }
        }
    }

    public sendMessageToUser = (idRoom: number, message: string, ws: WebSocket): void => {
        if (this.rooms[idRoom] && this.roomRepository.findRoomById(idRoom)) {
            this.rooms[idRoom].forEach(client => {
                if (client.ws === ws) {
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

    private changeWordInGame = (idRoom: number, selectedWord: string)=> {
        if(!this.wordInRoom[idRoom]) {
            this.wordInRoom[idRoom] = new Set();
            this.wordInRoom[idRoom].add(selectedWord);
        } else{
            this.wordInRoom[idRoom].clear();
            this.wordInRoom[idRoom].add(selectedWord);
        }
    }

    private deleteRoomInfo = (idRoom: number): void => {
        delete this.wordInRoom[idRoom];
        delete this.rooms[idRoom];
    }
}