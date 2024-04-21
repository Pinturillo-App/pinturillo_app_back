import { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR_STATUS } from '../utilities/status.utility';


export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(`Error: ${ error.message }`);

    return res.status(INTERNAL_SERVER_ERROR_STATUS).json({ message: 'Internal server error' });
};