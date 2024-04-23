import { AppDataSource } from "../config/data-source.config";
import { Room } from "../entities/room.entity";

export class RoomRepository{
    
    private repository = AppDataSource.getRepository(Room);

    async getAllRooms() {
        return this.repository.find();
    }

    async getRoomById(id: string) {
        return this.repository.findOneBy({ id });
    }      

    async createRoom(room: Room) {
        return this.repository.save(room);
    }

    async updateRoom(room: Room) {
        return this.repository.update(room.id, room);
    }

    async deleteRoom(id: string) {
        return this.repository.delete(id);
    }

}