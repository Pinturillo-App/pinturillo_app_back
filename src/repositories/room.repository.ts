import { AppDataSource } from "../config/data-source.config";
import { CreateRoomDto } from "../dto/room/create-room.dto";
import { UpdateRoomDto } from "../dto/room/update-room.dto";
import { Room } from "../entities/room.entity";

export class RoomRepository{
    
    private repository = AppDataSource.getRepository(Room);

    async getAllRooms() {
        return this.repository.find();
    }

    async getRoomById(id: number) {
        return this.repository.findOneBy({ id });
    }      

    async createRoom(room: CreateRoomDto) {
        return this.repository.save(room);
    }

    async updateRoom(room: UpdateRoomDto) {
        return this.repository.update(room.id, room);
    }

    async deleteRoom(id: number) {
        return this.repository.delete(id);
    }

}