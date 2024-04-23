import { AppDataSource } from "../config/data-source.config";
import { WordCategory } from "../entities/word-category.entity";

export class WordCategoryRepository{
    
    private repository = AppDataSource.getRepository(WordCategoryRepository);      

    // async createWordCategory(wordCategory: WordCategory) {
    //     return this.repository.save(wordCategory);
    // }

    async deleteWordCategory(id: string) {
        return this.repository.delete(id);
    }

}