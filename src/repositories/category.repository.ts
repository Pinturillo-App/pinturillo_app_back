import { AppDataSource } from "../config/data-source.config";
import { CreateCategoryDto } from "../dto/category/create-category.dto";
import { UpdateCategoryDto } from "../dto/category/update-category.dto";
import { Category } from "../entities/category.entity";

export class CategoryRepository{

    private repository = AppDataSource.getRepository(Category);

    async getAllCategories() {
        return this.repository.find();
    }

    async getCategoryById(id: number) {
        return this.repository.findOneBy({ id });
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