import { CategoryRepository } from "../repositories/category.repository";
import { Category } from "../entities/category.entity";
import { CreateCategoryDto, categoryCreateSchema } from "../dto/category/create-category.dto";
import { UpdateCategoryDto, categoryUpdateSchema } from "../dto/category/update-category.dto";


export class CategoryService {

    private categoryRepository: CategoryRepository;
    
    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.getAllCategories();
    }

    async getCategoryById(id: number): Promise<Category | undefined> {
        const response = await this.categoryRepository.getCategoryById(id);
        if (!response) throw new Error("Category not found");
        return await this.categoryRepository.getCategoryById(id);
    }

    async createCategory(category: CreateCategoryDto): Promise<Category | undefined> {
        const data = categoryCreateSchema.validate( category );
        if (data.error) throw new Error(data.error.details[0].message);
        return await this.categoryRepository.createCategory(category);
    }

    async updateCategory(category: UpdateCategoryDto): Promise<void> {
        const response = await this.categoryRepository.getCategoryById(category.id);
        const data = categoryUpdateSchema.validate( category );

        if (!response) throw new Error("Category not found");
        if (data.error) throw new Error(data.error.details[0].message);

        await this.categoryRepository.updateCategory(category);
    }

    async deleteCategory(id: number): Promise<void> {
        const category = await this.categoryRepository.getCategoryById(id);
        if (!category) throw new Error("Category not found");
        this.categoryRepository.deleteCategory(id);
    }

}