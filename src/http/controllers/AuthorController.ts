import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { Author } from "../../database/entities/Author";
import { ResponseUtil } from "../../utils/Response";
import { Paginator } from "../../database/Paginator";
import { CreateAuthorDTO, UpdateAuthorDTO } from '../dtos/CreateAuthorDTO';
import { validate } from "class-validator";

export default class AuthorController {
  async getAuthors(req: Request, res: Response) {
    const builder = await AppDataSource.getRepository(Author)
      .createQueryBuilder()
      .orderBy("id", "DESC");
    const { records: authors, paginationInfo } = await Paginator.paginate(
      builder,
      req,
      res,
    );
    return ResponseUtil.sendSuccessfulResponse<Author[]>(
      res,
      "Fetch Authors Successful",
      authors,
      paginationInfo,
    );
  }

  async getAuthor(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const author = await AppDataSource.getRepository(Author).findOneByOrFail({
      id: Number(id),
    });

    return ResponseUtil.sendSuccessfulResponse<Author>(
      res,
      "Fetch Author Successful",
      author,
    );
  }

  async create(req: Request, res: Response): Promise<Response> {
    const authorData = req.body;
    authorData.image = req.file?.filename
    const dto = new CreateAuthorDTO();
    Object.assign(dto, authorData);

    const errors = await validate(dto);

    if (errors.length > 0) {
      return ResponseUtil.sendErrorResponse(res, "Invalid data", 422, errors);
    }

    const repo = AppDataSource.getRepository(Author);
    const author = repo.create(authorData);

    await repo.save(author);

    return ResponseUtil.sendSuccessfulResponse<Author[]>(
      res,
      "Author created",
      author,
      null,
      201,
    );
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;
    const authorData = req.body;

    const dto = new UpdateAuthorDTO();
    Object.assign(dto, authorData);
    dto.id = parseInt(id);

    const errors = await validate(dto);

    if (errors.length > 0) {
      return ResponseUtil.sendErrorResponse(res, "Invalid data", 422, errors);
    }

    const repo = AppDataSource.getRepository(Author);
    const author = await repo.findOneByOrFail({
      id: Number(id),
    });

    repo.merge(author, authorData);
    await repo.save(author);

    return ResponseUtil.sendSuccessfulResponse<Author>(
      res,
      "Author updated",
      author,
      null,
      201,
    );
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const repo = AppDataSource.getRepository(Author);
    const author = await repo.findOneByOrFail({
      id: Number(id),
    });
    await repo.remove(author);
    return ResponseUtil.sendSuccessfulResponse(res, "Successfully deleted the author", null);
  }
}
