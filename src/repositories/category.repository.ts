import { AppDataSource } from '../config/data-source.config';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category';
import { Category } from '../entities';


export class CategoryRepository{
    private repository = AppDataSource.getRepository(Category);

    async getAllCategories() {
        return this.repository.find();
    }

    async getCategoryById(id: number) {
        return this.repository.findOneBy({ id });
    }

    async getCategoryByName(name: string) {
        return this.repository.findOneBy({ name });
    }

    async createCategory(category: CreateCategoryDto) {
        return this.repository.save(category);
    }

    async updateCategory(category: UpdateCategoryDto) {
        return this.repository.update(category.id, category);
    }

    async deleteCategory(id: number) {
        return this.repository.delete(id);
    }
}