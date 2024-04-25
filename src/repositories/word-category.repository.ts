import { AppDataSource } from "../config/data-source.config";
import { CreateWordCategoryDto } from "../dto/word-category/create-word-category.dto";

export class WordCategoryRepository{
    
    private repository = AppDataSource.getRepository(WordCategoryRepository);      

    // async createWordCategory(wordCategory: CreateWordCategoryDto) {
    //     return this.repository.save(wordCategory);
    // }

    async deleteWordCategory(id: number) {
        return this.repository.delete(id);
    }

}