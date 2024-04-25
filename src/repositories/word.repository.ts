import { AppDataSource } from '../config/data-source.config';
import { CreateWordDto, UpdateWordDto } from '../dto/word';
import { Word } from '../entities';


export class WordRepository{
    private repository = AppDataSource.getRepository(Word);

    async getAllWords() {
        return this.repository.find();
    }

    async findWordById(id: number) {
        return this.repository.findOneBy({ id });
    }      

    async findWordByText(text: string) {
        return this.repository.findOneBy({ text });
    }

    async saveWord(word: CreateWordDto) {
        return this.repository.save(word);
    }

    async updateWord(word: UpdateWordDto) {
        return this.repository.update(word.id, word);
    }

    async deleteWord(id: number) {
        return this.repository.delete(id);
    }
}