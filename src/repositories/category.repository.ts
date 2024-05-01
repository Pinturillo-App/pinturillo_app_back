import { AppDataSource } from '../config/data-source.config';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category';
import { Category } from '../entities';


export class CategoryRepository{
    private repository = AppDataSource.getRepository(Category);

    async getAllCategories() {
        return this.repository.find();
    }

    async findCategoryById(id: number) {
        return this.repository.findOneBy({ id });
    }

    async findCategoryByName(name: string) {
        return this.repository.findOneBy({ name });
    }

    async saveCategory(category: CreateCategoryDto) {
        return this.repository.save(category);
    }

    async updateCategory(category: UpdateCategoryDto) {
        const { id, ...updateData } = category;

        await this.repository.update({ id }, updateData);
        
        return this.findCategoryById(id);
    }

    async deleteCategory(id: number) {
        return this.repository.delete(id);
    }
}