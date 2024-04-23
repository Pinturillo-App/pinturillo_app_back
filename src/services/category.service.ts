import { CategoryRepository } from "../repositories/category.repository";
import { Category } from "../entities/category.entity";
import { v4 as uuidv4 } from 'uuid';

export class CategoryService {

    private categoryRepository: CategoryRepository;

    constructor() {
        this.categoryRepository = new CategoryRepository();
    }

    async getAllCategories(): Promise<Category[]> {
        return this.categoryRepository.getAllCategories();
    }

    async getCategoryById(id: string): Promise<Category | undefined> {
        return this.categoryRepository.getCategoryById(id);
    }

    async createCategory(name: string): Promise<void> {
        const category = new Category();
        category.id = uuidv4();
        category.name = name;
        this.categoryRepository.createCategory(category);
    }

    async updateCategory(id: string, name: string): Promise<void> {
        const category = await this.categoryRepository.getCategoryById(id);
        if (!category) {
            throw new Error("Category not found");
        }
        category.name = name;
        this.categoryRepository.updateCategory(category);
    }

    async deleteCategory(id: string): Promise<void> {
        const category = await this.categoryRepository.getCategoryById(id);
        if (!category) {
            throw new Error("Category not found");
        }
        this.categoryRepository.deleteCategory(id);
    }

}