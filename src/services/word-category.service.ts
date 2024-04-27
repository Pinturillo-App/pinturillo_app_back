import { WordCategoryRepository } from '../repositories/word-category.repository';

export class WordCategoryService {
    private wordCategoryRepository: WordCategoryRepository;

    constructor() {
        this.wordCategoryRepository = new WordCategoryRepository();
    }

    async
}