import { AppDataSource } from "../config/data-source.config";
import { Category } from "../entities/category.entity";

export class CategoryRepository{

    private repository = AppDataSource.getRepository(Category);

    async getAllCategories() {
        return this.repository.find();
    }

    async getCategoryById(id: string) {
        return this.repository.findOneBy({ id });
    }

    async createCategory(category: Category) {
        return this.repository.save(category);
    }

    async updateCategory(category: Category) {
        return this.repository.update(category.id, category);
    }

    async deleteCategory(id: string) {
        return this.repository.delete(id);
    }

}