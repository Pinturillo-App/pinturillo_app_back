import { AppDataSource } from '../config/data-source.config';
import { CreateWordDto, UpdateWordDto } from '../dto/word';
import { Word } from '../entities';


export class WordRepository{
    private repository = AppDataSource.getRepository(Word);

    getAllWords = async () => {
        return this.repository.find();
    }

    findWordById = async (id: number) => {
        return this.repository.findOneBy({ id });
    }      

    findWordByText = async (text: string) => {
        return this.repository.findOneBy({ text });
    }

    saveWord = async (word: CreateWordDto) => {
        return this.repository.save(word);
    }

    updateWord = async (word: UpdateWordDto) => {
        const { id, ...updateData } = word;

        await this.repository.update({ id }, updateData);
        
        return this.findWordById(id);
    }

    deleteWord = async (id: number) => {
        return this.repository.delete(id);
    }
}