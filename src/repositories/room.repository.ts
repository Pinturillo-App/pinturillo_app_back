import { AppDataSource } from '../config/data-source.config';
import { CreateRoomDto, UpdateRoomDto } from '../dto/room';
import { Room } from '../entities';


export class RoomRepository{
    private repository = AppDataSource.getRepository(Room);

    async getAllRooms() {
        return this.repository.find();
    }

    async findRoomById(id: number) {
        return this.repository.findOneBy({ id });
    }      

    async createRoom(room: CreateRoomDto) {
        return this.repository.save(room);
    }

    async updateRoom(room: UpdateRoomDto) {
        const { id, ...updateData } = room;

        await this.repository.update({ id }, updateData);
        
        return this.findRoomById(id);
    }

    async deleteRoom(id: number) {
        return this.repository.delete(id);
    }
}