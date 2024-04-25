import { AppDataSource } from "../config/data-source.config";
import { CreateWordDto } from "../dto/word/create-word.dto";
import { UpdateWordDto } from "../dto/word/update-word.dto";
import { Word } from "../entities/word.entity";

export class WordRepository{
    
    private repository = AppDataSource.getRepository(Word);

    async getAllWords() {
        return this.repository.find();
    }

    async getWordById(id: number) {
        return this.repository.findOneBy({ id });
    }      

    async createWord(word: CreateWordDto) {
        return this.repository.save(word);
    }

    async updateWord(word: UpdateWordDto) {
        return this.repository.update(word.id, word);
    }

    async deleteWord(id: number) {
        return this.repository.delete(id);
    }

}