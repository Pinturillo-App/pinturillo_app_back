import { AppDataSource } from '../config/data-source.config';
import { CreateWordCategoryDto } from '../dto/word-category';


export class WordCategoryRepository{
    private repository = AppDataSource.getRepository(WordCategoryRepository);      

    // async saveWordCategory(wordCategory: CreateWordCategoryDto) {
    //     return this.repository.save(wordCategory);
    // }

    async deleteWordCategory(id: number) {
        return this.repository.delete(id);
    }
}