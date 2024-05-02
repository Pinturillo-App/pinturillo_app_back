import { CreateRoomDto, createRoomSchema, updateRoomSchema } from '../dto/room';
import { Room } from '../entities';
import { mapJoiErrors } from '../middlewares/validation-error.middleware';
import { RoomRepository } from '../repositories/room.repository';
import { ID_CATEGORY_NOT_FOUND, ROOM_NOT_FOUND } from '../utilities/messages.utility';
import { CategoryRepository } from '../repositories/category.repository';


export class RoomService{
    private roomRepository: RoomRepository;
    private categoryRepository: CategoryRepository;

    constructor(){
        this.roomRepository = new RoomRepository();
        this.categoryRepository = new CategoryRepository();
    }

    async getAllRooms(): Promise<Room[]>{
        return await this.roomRepository.getAllRooms();
    }

    async getWordsByRoom(id: number){
        const room = await this.roomRepository.findRoomById(id);

        if (!room) throw new Error(ROOM_NOT_FOUND);

        return room.categories['words'];
    }

    async findRoomById(id: number): Promise<Room | undefined> {
        const responseById = await this.roomRepository.findRoomById(id);

        if (!responseById) throw new Error(ROOM_NOT_FOUND);

        return responseById;
    }

    async saveRoom(room: CreateRoomDto): Promise<Room> {
        const responseByIdCategory = await this.categoryRepository.findCategoryById(room.idCategory);
        const data = createRoomSchema.validate(room);

        if (!responseByIdCategory) throw new Error(ID_CATEGORY_NOT_FOUND);
        if (data.error) throw mapJoiErrors(data.error.details);

        return await this.roomRepository.createRoom(room);
    }

    async updateRoom(room: Room): Promise<Room> {
        const responseById = await this.roomRepository.findRoomById(room.id);
        const data = updateRoomSchema.validate(room);

        if (!responseById) throw new Error(ROOM_NOT_FOUND);
        if (data.error) throw mapJoiErrors(data.error.details);

        return await this.roomRepository.updateRoom(room);
    }

    async deleteRoom(id: number): Promise<void> {
        const responseById = await this.roomRepository.findRoomById(id);

        if (!responseById) throw new Error(ROOM_NOT_FOUND);
        
        this.roomRepository.deleteRoom(id);
    }
}