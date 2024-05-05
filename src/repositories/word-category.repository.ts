import { AppDataSource } from '../config/data-source.config';
import { CreateWordCategoryDto, UpdateWordCategoryDto } from '../dto/word-category';
import { WordCategory } from '../entities';


export class WordCategoryRepository {
    private repository = AppDataSource.getRepository(WordCategory);   

    getAllWordCategories = async () => {
        return this.repository.find();
    }
    
    findWordCategoryById = async (id: number) => {
        return this.repository.findOneBy({ id });
    }

    saveWordCategory = async (wordCategory: CreateWordCategoryDto) => {
        return this.repository.save(wordCategory);
    }

    updateWordCategory = async (wordCategory: UpdateWordCategoryDto) => {
        const { id, ...updateData } = wordCategory;

        await this.repository.update({ id }, updateData);
        
        return this.findWordCategoryById(id);
    }

    deleteWordCategory = async (id: number) => {
        return this.repository.delete(id);
    }

    findCategoryByIdWord = async (idWord: number) => {
        return this.repository.find({ where: { idWord }});
    }

    findWordByIdCategory = async (idCategory: number) => {
        return this.repository.find({ where: { idCategory }});
    }
}