import { Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import { Author } from '../entities/Author';
import { ResponseUtil } from '../../utils/Response';
import { Paginator } from '../database/Paginator';

export default class AuthorController {
   async getAuthors(req: Request, res: Response) {
      const builder = await AppDataSource.getRepository(Author).createQueryBuilder().orderBy("id", "DESC");
      const { records: authors, paginationInfo } = await Paginator.paginate(builder, req, res);
      return ResponseUtil.sendSuccessfulResponse<Author[]>(res, "Fetch Authors Successful", authors, paginationInfo);
   }

   async getAuthor(req: Request, res: Response) {
      const { id } = req.params;
      const author = await AppDataSource
         .getRepository(Author)
         .findOneByOrFail({ id: Number(id) });

      return ResponseUtil.sendSuccessfulResponse<Author>(res, "Fetch Author Successful", author)
   }
}
