import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Author } from '../entities/Author';

export default class AuthorController {
    async getAuthors(req: Request, res: Response) {
        const authors = await AppDataSource.getRepository(Author).find();

        return res.status(200).json({
            success: true,
            data: authors
        });
     }
}
