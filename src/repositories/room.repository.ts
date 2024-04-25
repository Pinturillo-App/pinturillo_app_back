import { AppDataSource } from '../config/data-source.config';
import { CreateRoomDto, UpdateRoomDto } from '../dto/room';
import { Room } from '../entities';


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