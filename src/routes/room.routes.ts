import express from 'express';
import { RoomController } from '../controllers/room.controller';


export const roomRouter = express.Router();
const roomController = new RoomController();