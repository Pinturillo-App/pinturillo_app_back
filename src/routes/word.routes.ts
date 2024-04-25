import express from 'express';
import { WordController } from './../controllers/word.controller';


export const wordRouter = express.Router();
const wordController = new WordController();

export default wordRouter;