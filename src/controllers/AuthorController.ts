import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Author } from '../entities/Author';
import { ResponseUtil } from '../../utils/Response';

export default class AuthorController {
   async getAuthors(req: Request, res: Response) {
      const authors = await AppDataSource.getRepository(Author).find();

      return ResponseUtil.sendSuccessfulResponse<Author[]>(res, "Fetch Authors Successful", authors)
   }

   async getAuthor(req: Request, res: Response) {
      const { id } = req.params;
      const author = await AppDataSource
         .getRepository(Author)
         .findOneByOrFail({ id: Number(id) });

      return ResponseUtil.sendSuccessfulResponse<Author>(res, "Fetch Author Successful", author)
   }
}
