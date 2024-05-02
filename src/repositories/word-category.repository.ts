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
        const { id, ...updateData } = wordCategory;

        await this.repository.update({ id }, updateData);
        
        return this.findWordCategoryById(id);
    }

    async deleteWordCategory(id: number) {
        return this.repository.delete(id);
    }

    async findCategoryByIdWord( idWord: number ) {
        return this.repository.find({ where: { idWord }});
    }

    async findWordByIdCategory( idCategory: number ) {
        return this.repository.find({ where: { idCategory }});
    }
}