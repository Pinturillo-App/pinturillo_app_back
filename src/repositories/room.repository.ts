import { AppDataSource } from '../config/data-source.config';
import { CreateRoomDto, UpdateRoomDto } from '../dto/room';
import { Room } from '../entities';


export class RoomRepository{
    private repository = AppDataSource.getRepository(Room);

    getAllRooms = async () => {
        return this.repository.find();
    }

    findRoomById = async (id: number) => {
        return this.repository.findOneBy({ id });
    }      

    createRoom = async (room: CreateRoomDto) => {
        return this.repository.save(room);
    }

    updateRoom = async (room: UpdateRoomDto) => {
        const { id, ...updateData } = room;

        await this.repository.update({ id }, updateData);
        
        return this.findRoomById(id);
    }

    deleteRoom = async (id: number) => {
        return this.repository.delete(id);
    }

    findRoomByIdCategory = async (idCategory: number) => {
        return this.repository.find({ where: { idCategory }});
    }
}