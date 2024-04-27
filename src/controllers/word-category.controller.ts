import { Request, Response } from 'express';
import { WordCategoryService } from '../services/word-category.service';
import { BAD_REQUEST_STATUS } from '../utilities/status.utility';


export class WordCategoryController {
    private wordCategoryService: WordCategoryService;

    constructor() {
        this.wordCategoryService = new WordCategoryService();
    }

    public saveWordCategory = async (req: Request, res: Response) => {
        const wordCategory = req.body;

        try {
            await this.wordCategoryService.saveWordCategory(wordCategory);

            return res.status(201).json(wordCategory);
        } catch (error) {
            if (!error.message) return res.status(BAD_REQUEST_STATUS).json(error);
            else return res.status(BAD_REQUEST_STATUS).json({ error: error.message });
        }
    }

    public deleteWordCategory = async (req, res) => {
        const id = req.params.id;

        try {
            await this.wordCategoryService.deleteWordCategory(id);

            return res.status(200).json({ message: `Word category with id: ${ id } deleted successfully` });
        } catch (error) {
            return res.status(BAD_REQUEST_STATUS).json({ error: error.message });
        }
    }
}