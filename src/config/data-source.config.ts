import * as dotenv from 'dotenv';
import "reflect-metadata";
import { DataSource } from "typeorm";   

import { Category } from '../entities/category.entity';
import { Word } from '../entities/word.entity';
import { Room } from '../entities/room.entity';
import { WordCategory } from '../entities/word-category.entity';

dotenv.config();

const { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_TYPE, DATABASE_USER } = process.env;
const DEFAULT_PORT = "5432";
const DEFAULT_SYNCHRONIZE = false;

export const AppDataSource = new DataSource({
    type: DATABASE_TYPE as any,
    host: DATABASE_HOST,
    port: parseInt(DATABASE_PORT || DEFAULT_PORT),
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    synchronize: DEFAULT_SYNCHRONIZE,
    logging:  false,
    entities: [ Category, Word, Room, WordCategory ],
    migrations: [__dirname + "/migration/*.ts"],
    subscribers: [],
});