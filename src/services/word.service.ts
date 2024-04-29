import { CreateWordDto, UpdateWordDto, createWordSchema, updateWordSchema } from '../dto/word';
import { Word } from '../entities';
import { mapJoiErrors } from '../middlewares/validation-error.middleware';
import { WordRepository } from '../repositories/word.repository';
import { WORD_ALREADY_EXISTS, WORD_NOT_FOUND } from '../utilities/messages.utility';


export class WordService {
    private wordRepository: WordRepository;
    
    constructor() {
        this.wordRepository = new WordRepository();
    }

    async getAllWords(): Promise<Word[]> {
        return await this.wordRepository.getAllWords();
    }

    async findWordById(id: number): Promise<Word | undefined> {
        const responseById = await this.wordRepository.findWordById(id);

        if (!responseById) throw new Error(WORD_NOT_FOUND);

        return responseById;
    }

    async saveWord(word: CreateWordDto): Promise<Word> {
        const responseByName = await this.wordRepository.findWordByText(word.text);
        const data = createWordSchema.validate(word, { abortEarly: false });

        if (data.error) throw mapJoiErrors(data.error.details);
        if (responseByName) throw new Error(WORD_ALREADY_EXISTS);

        return await this.wordRepository.saveWord(word);
    }

    async updateWord(word: UpdateWordDto): Promise<Word> {
        const responseById = await this.wordRepository.findWordById(word.id);
        const data = updateWordSchema.validate(word, { abortEarly: false });

        if (data.error) throw mapJoiErrors(data.error.details);
        if (!responseById) throw new Error(WORD_NOT_FOUND);

        return await this.wordRepository.updateWord(word);
    }

    async deleteWord(id: number): Promise<void> {
        const responseById = await this.wordRepository.findWordById(id);

        if (!responseById) throw new Error(WORD_NOT_FOUND);

        this.wordRepository.deleteWord(id);
    }
}