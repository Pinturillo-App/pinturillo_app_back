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

    async getRoomById(id: number): Promise<Room | undefined>{
        const responseById = await this.roomRepository.getRoomById(id);

        if (!responseById) throw new Error(ROOM_NOT_FOUND);

        return responseById;
    }

    async saveRoom(room: CreateRoomDto ): Promise<Room | undefined>{
        const responseByIdCategory = await this.categoryRepository.findCategoryById(room.idCategory);
        const data = createRoomSchema.validate(room, { abortEarly: false });

        if (!responseByIdCategory) throw new Error(ID_CATEGORY_NOT_FOUND);
        if (data.error) throw mapJoiErrors(data.error.details);

        return await this.roomRepository.createRoom(room);
    }

    async updateRoom(room: Room): Promise<void>{
        const responseById = await this.roomRepository.getRoomById(room.id);
        const data = updateRoomSchema.validate(room, { abortEarly: false });

        if (!responseById) throw new Error(ROOM_NOT_FOUND);
        if (data.error) throw mapJoiErrors(data.error.details);

        await this.roomRepository.updateRoom(room);
    }

    async deleteRoom(id: number): Promise<void>{
        const responseById = await this.roomRepository.getRoomById(id);

        if (!responseById) throw new Error(ROOM_NOT_FOUND);
        
        this.roomRepository.deleteRoom(id);
    }
}