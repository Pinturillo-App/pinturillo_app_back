import express from 'express';
import { WordCategoryController } from './../controllers/word-category.controller';


export const wordCategoryRouter = express.Router();
const wordCategoryController = new WordCategoryController();