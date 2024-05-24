import { WebSocket } from 'ws';
import { RoomRepository } from '../repositories/room.repository';
import { USER_ALREADY_EXIST_IN_ROOM } from '../utilities/messages.utility';
import { compareClientData, compareClientName, validateRoomExistAndById, validateRoomExistById, validateUserNameAndAvatar } from '../utilities/sockets.utility';


export class SocketService {
    private rooms: object;
    private wordInRoom: object;
    private settings: object;
    private roundNumber : number = 2;
    private numUsers: number = 5;
    private roomRepository: RoomRepository;
    
    constructor() {
        this.rooms = {};
        this.wordInRoom = {};
        this.settings = {};
        this.roomRepository = new RoomRepository();
    }

    public joinRoom = async (idRoom: number, userName: string, userAvatar: string, userPoints: number, ws: WebSocket): Promise<void> => {
        let existUser = false;

        if (validateUserNameAndAvatar(userName, userAvatar, ws)) return;
        
        if (await validateRoomExistById(idRoom, this.roomRepository, ws)) {
            if (!this.rooms[idRoom]) {
                this.rooms[idRoom] = new Set();
            }
            
            this.rooms[idRoom].forEach(client => {

                if (compareClientName(userName, client.userName)) {
                    ws.send(JSON.stringify({ error: USER_ALREADY_EXIST_IN_ROOM }));
                    ws.close();

                    existUser = true;
                }
            })

            this.addUsersToRoom(existUser, userName, userAvatar, userPoints, idRoom, ws);
        }
    }

    public leaveRoom = (idRoom: number, ws: WebSocket, userName: string, userAvatar: string, userPoints: number): void => {

        if (validateRoomExistAndById(this.rooms, idRoom, this.roomRepository)) {       
            this.pushOutUser(userName, userAvatar, userPoints, idRoom);

            if (this.rooms[idRoom] && this.rooms[idRoom].size === 0) {
                this.deleteRoomInfo(idRoom)
            }
        }
    }

    public closeRoom = (idRoom: number): void => {
        this.rooms[idRoom].forEach(client => {
            this.sendMessageToUser(idRoom, `The game has been finished.`, client.ws)
            client.ws.close();
         });

        this.deleteRoomInfo(idRoom);
    }

    public startTurnInRoom = async (idRoom: number, ws: WebSocket): Promise<void> => {
        const room = await this.roomRepository.findRoomById(idRoom);

        if (this.rooms[idRoom] && room && this.settings[idRoom] && this.settings[idRoom].turnsPlayed < this.settings[idRoom].totalTurns) {
            const words = room.categories['words'];
            let wordUsed = true;

            while(wordUsed && this.settings[idRoom].playedWords.length <= words.length) {
                const randomIndex = Math.floor(Math.random() * words.length);
                const selectedWord = words[randomIndex].text;

                if (!this.settings[idRoom].playedWords.includes(selectedWord)) {
                    wordUsed = false;

                    this.settings[idRoom].playedWords.push(selectedWord);
                    this.settings[idRoom].turnsPlayed++;
                    this.settings[idRoom].usersWinnersPerTurn = [];

                    this.rooms[idRoom].forEach(client => {
                        if (client.ws === ws) {
                            this.settings[idRoom].playersTurnsCount[client.userName]++;

                            this.sendMessageToRoom(idRoom, `${ client.userName } has started their turn`, ws);
                        }
                    })

                    this.changeWordInGame(idRoom, selectedWord);
                    this.sendMessageToUser(idRoom, `You must draw: ${ selectedWord }.`, ws);
                }
            }
        } else if (this.settings[idRoom].turnsPlayed >= this.settings[idRoom].totalTurns) {
            this.sendMessageToRoom(idRoom, `The game has been finished.`, ws);
            this.closeRoom(idRoom);
        }
    }

    public finishTurn = (idRoom: number, ws: WebSocket, userName: string) => {
        if (this.settings[idRoom].usersWinnersPerTurn.length == this.rooms[idRoom].size - 1 ) {
            this.startTurnInRoom(idRoom, this.assignTurn(idRoom, ws));
        }
    }

    public assignTurn = (idRoom: number, ws: WebSocket) => {
        let playersTurns = Object.keys(this.settings[idRoom].playersTurnsCount);
        let playerTurnAssigned;
        let wsSelected;

        playersTurns.sort((a,b) => this.settings[idRoom].playersTurnsCount[a] - this.settings[idRoom].playersTurnsCount[b] );
        playerTurnAssigned = playersTurns[0];
        
        this.rooms[idRoom].forEach(client => {
            if( client.userName === playerTurnAssigned ){
                wsSelected = client.ws;
            }
        })

        console.log(this.rooms)
        console.log(this.settings )
        console.log("-------------------") 
        return wsSelected;
    }

    public tryToGuessWord = async (idRoom: number, word: string, ws: WebSocket, userName: string, userAvatar: string, userPoints: number, pointsToSum: number ): Promise<void> => {

        
        if (this.rooms[idRoom] && this.roomRepository.findRoomById(idRoom)) {
            if (this.wordInRoom[idRoom].has(word)) {
                this.rooms[idRoom].forEach(client => {
                    if (client.userName === userName) {
                        client.userPoints += pointsToSum;

                        this.sendMessageToRoom(idRoom, `${ userName } has guessed the word.`, ws);
                        this.settings[idRoom].usersWinnersPerTurn.push(userName);
                        this.finishTurn(idRoom, ws, userName);
                    }
                });
            } else {
                this.sendMessageToRoom(idRoom, `${ userName } says: ${ word }.`, ws);
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

    private changeWordInGame = (idRoom: number, selectedWord: string) => {
        if (!this.wordInRoom[idRoom]) {
            this.wordInRoom[idRoom] = new Set();
            this.wordInRoom[idRoom].add(selectedWord);
        } else {
            this.wordInRoom[idRoom].clear();
            this.wordInRoom[idRoom].add(selectedWord);
        }
    }

    private deleteRoomInfo = (idRoom: number): void => {
        
        delete this.wordInRoom[idRoom];
        delete this.rooms[idRoom];
        delete this.settings[idRoom];
    }

    private addUsersToRoom = (existUser: boolean, userName: string, userAvatar: string, userPoints: number, idRoom: number, ws: WebSocket) => {
        if (!existUser && this.rooms[idRoom].size <= this.numUsers) {
            this.rooms[idRoom].add({ ws, userName, userAvatar, userPoints});
            this.sendMessageToRoom(idRoom, `${ userName } has joined the room.`, ws);
            this.settingsTurnsConfiguration( idRoom, userName)
        }
    }
    
    private settingsTurnsConfiguration = (idRoom: number, userName: string) => {
        if (this.rooms[idRoom].size === 2) {
            this.settings[idRoom] = {   
                totalTurns: 4, 
                turnsPlayed: 0,  
                playedWords: [],
                playersTurnsCount: {},
                usersWinnersPerTurn: []
            }

            this.rooms[idRoom].forEach(client => {
                this.settings[idRoom].playersTurnsCount[client.userName] = 0;
            });
    
            this.startTurnInRoom(idRoom, this.rooms[idRoom].values().next().value.ws);
        } if (this.rooms[idRoom].size > 2) {

            this.settings[idRoom].totalTurns = this.settings[idRoom].totalTurns + this.roundNumber;
            this.settings[idRoom].playersTurnsCount[userName] = 0;
        }
    }

    private pushOutUser = (userName: string, userAvatar: string, userPoints: number, idRoom: number) => {
        
        if( this.rooms[idRoom] === undefined || this.settings[idRoom] === undefined ) return;
        this.rooms[idRoom].forEach(client => {
        
            if (compareClientData(client, userName, userAvatar)) { 

                console.log("Papi que putas")
                this.rooms[idRoom].delete(client);
                delete this.settings[idRoom].playersTurnsCount[userName]
                this.settings[idRoom].totalTurns = this.settings[idRoom].totalTurns - this.roundNumber;
                this.sendMessageToRoom(idRoom, `${ userName } has left.`, client.ws);   
                client.ws.close();

                if( this.rooms[idRoom].size > 1 ) this.finishTurn(idRoom, client.ws, userName);
                else this.closeRoom(idRoom);
            }
        });
    }
}

