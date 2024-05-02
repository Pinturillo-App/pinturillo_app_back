import { CategoryRepository } from '../repositories/category.repository';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, createCategorySchema, UpdateCategoryDto, updateCategorySchema } from '../dto/category';
import { CATEGORY_ALREADY_EXISTS, CATEGORY_ALREADY_USED_IN_ROOM, CATEGORY_ALREADY_USED_IN_WORD, CATEGORY_NOT_FOUND } from '../utilities/messages.utility';
import { mapJoiErrors } from '../middlewares/validation-error.middleware';
import { RoomRepository } from '../repositories/room.repository';
import { WordCategoryRepository } from '../repositories/word-category.repository';


export class CategoryService {
    private categoryRepository: CategoryRepository;
    private roomRepository: RoomRepository;
    private wordCategoryRepository: WordCategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
        this.roomRepository = new RoomRepository();
        this.wordCategoryRepository = new WordCategoryRepository();
    }

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.getAllCategories();
    }

    async findCategoryById(id: number): Promise<Category | undefined> {
        const responseById = await this.categoryRepository.findCategoryById(id);

        if (!responseById) throw new Error(CATEGORY_NOT_FOUND);

        return responseById;
    }

    async saveCategory(category: CreateCategoryDto): Promise<Category> {
        const responseByName = await this.categoryRepository.findCategoryByName(category.name);
        const data = createCategorySchema.validate(category);

        if (responseByName) throw new Error(CATEGORY_ALREADY_EXISTS);
        if (data.error) throw mapJoiErrors(data.error.details);

        return await this.categoryRepository.saveCategory(category);
    }

    async updateCategory(category: UpdateCategoryDto): Promise<Category> {
        const responseById = await this.categoryRepository.findCategoryById(category.id);
        const data = updateCategorySchema.validate(category);

        if (!responseById) throw new Error(CATEGORY_NOT_FOUND);
        if (data.error) throw mapJoiErrors(data.error.details);

        return await this.categoryRepository.updateCategory(category);
    }

    async deleteCategory(id: number): Promise<void> {
        const responseById = await this.categoryRepository.findCategoryById(id);
        const responseRoomByIdCategory = await this.roomRepository.findRoomByIdCategory(id);
        const responseWordByIdCategory = await this.wordCategoryRepository.findWordByIdCategory(id);

        if (!responseById) throw new Error(CATEGORY_NOT_FOUND);
        if( responseRoomByIdCategory.length > 0 ) throw new Error(CATEGORY_ALREADY_USED_IN_ROOM);
        if( responseWordByIdCategory.length > 0 ) throw new Error(CATEGORY_ALREADY_USED_IN_WORD);

        this.categoryRepository.deleteCategory(id);
    }
}