import { CategoryRepository } from '../repositories/category.repository';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto, createCategorySchema, UpdateCategoryDto, updateCategorySchema } from '../dto/category';
import { CATEGORY_ALREADY_EXISTS, CATEGORY_NOT_FOUND } from '../utilities/messages.utility';
import { mapJoiErrors } from '../middlewares/validation-error.middleware';


export class CategoryService {
    private categoryRepository: CategoryRepository;
    
    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.getAllCategories();
    }

    async findCategoryById(id: number): Promise<Category | undefined> {
        const responseById = await this.categoryRepository.findCategoryById(id);

        if (!responseById) throw new Error(CATEGORY_NOT_FOUND);

        return responseById;
    }

    async saveCategory(category: CreateCategoryDto): Promise<Category | undefined> {
        const responseByName = await this.categoryRepository.findCategoryByName(category.name);
        const data = createCategorySchema.validate(category, { abortEarly: false });

        if (responseByName) throw new Error(CATEGORY_ALREADY_EXISTS);
        if (data.error) throw mapJoiErrors(data.error.details);

        return await this.categoryRepository.saveCategory(category);
    }

    async updateCategory(category: UpdateCategoryDto): Promise<void> {
        const responseById = await this.categoryRepository.findCategoryById(category.id);
        const data = updateCategorySchema.validate(category, { abortEarly: false });

        if (!responseById) throw new Error(CATEGORY_NOT_FOUND);
        if (data.error) throw mapJoiErrors(data.error.details);

        await this.categoryRepository.updateCategory(category);
    }

    async deleteCategory(id: number): Promise<void> {
        const responseById = await this.categoryRepository.findCategoryById(id);

        if (!responseById) throw new Error(CATEGORY_NOT_FOUND);

        this.categoryRepository.deleteCategory(id);
    }
}