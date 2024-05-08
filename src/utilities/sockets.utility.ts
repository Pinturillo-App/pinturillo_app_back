import { Room } from "../entities";
import { RoomRepository } from "../repositories/room.repository";
import { WebSocket } from 'ws';
import { USERNAME_AVATAR_NOT_PROVIDED } from './messages.utility';


export const validateUserNameAndAvatar = ( userName: string, userAvatar: string ,ws: WebSocket ): boolean =>{
    if ( !userName || !userAvatar ) {

        ws.send(JSON.stringify({ error: USERNAME_AVATAR_NOT_PROVIDED }));
        ws.close();
        return true;
    } 
    return false;
}

export const validateRoomExistById = async ( idRoom: number, roomRepository: RoomRepository, ws: WebSocket ): Promise<boolean> =>{
    if ( await roomRepository.findRoomById(idRoom)) {
        return true
    }
    
    ws.send(JSON.stringify({ error: 'Room not found' }));
    ws.close();
    return false
}

export const validateRoomExistAndById = async ( rooms: Object, idRoom: number, roomRepository: RoomRepository) =>{
    if ( rooms[idRoom] && await roomRepository.findRoomById(idRoom)) {
        return true
    }
    return false
}


export const compareClientName = ( userName: string, clientName: string ): boolean =>{
    return userName === clientName;
}


export const compareClientData = ( client: any, userName: string, userAvatar: string, userPoints: number ): boolean =>{
    return client.userName === userName && client.userAvatar === userAvatar && client.userPoints === userPoints;
}