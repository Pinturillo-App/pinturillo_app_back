import express from 'express';
import { WordCategoryController } from './../controllers/word-category.controller';


export const wordCategoryRouter = express.Router();
const wordCategoryController = new WordCategoryController();

wordCategoryRouter.post('/create', wordCategoryController.saveWordCategory);
wordCategoryRouter.delete('/delete/:id', wordCategoryController.deleteWordCategory);