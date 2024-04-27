import { AppDataSource } from '../config/data-source.config';
import { CreateWordCategoryDto, UpdateWordCategoryDto } from '../dto/word-category';
import { WordCategory } from '../entities';


export class WordCategoryRepository {
    private repository = AppDataSource.getRepository(WordCategory);   

    async getAllWordCategories() {
        return this.repository.find();
    }
    
    async findWordCategoryById(id: number) {
        return this.repository.findOneBy({ id });
    }

    async saveWordCategory(wordCategory: CreateWordCategoryDto) {
        return this.repository.save(wordCategory);
    }

    async updateWordCategory(wordCategory: UpdateWordCategoryDto) {
        return this.repository.update(wordCategory.id, wordCategory);
    }

    async deleteWordCategory(id: number) {
        return this.repository.delete(id);
    }
}