import { AppDataSource } from "../config/data-source.config";
import { Word } from "../entities/word.entity";

export class WordRepository{
    
    private repository = AppDataSource.getRepository(Word);

    async getAllWords() {
        return this.repository.find();
    }

    async getWordById(id: string) {
        return this.repository.findOneBy({ id });
    }      

    async createWord(word: Word) {
        return this.repository.save(word);
    }

    async updateWord(word: Word) {
        return this.repository.update(word.id, word);
    }

    async deleteWord(id: string) {
        return this.repository.delete(id);
    }

}