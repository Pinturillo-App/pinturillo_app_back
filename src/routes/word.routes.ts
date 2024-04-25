import express from 'express';
import { WordController } from './../controllers/word.controller';


export const wordRouter = express.Router();
const wordController = new WordController();

wordRouter.get('/getAllWords', wordController.getAllWords);
wordRouter.get('/getWordById/:id', wordController.findWordById);
wordRouter.post('/createWord', wordController.saveWord);
wordRouter.put('/updateWord', wordController.updateWord);
wordRouter.delete('/deleteWord/:id', wordController.deleteWord);