import { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { ResponseUtil } from "../../utils/Response";
import { Paginator } from "../../database/Paginator";
import { validateOrReject } from "class-validator";
import { Book } from "../../database/entities/Book";
import { CreateBookDTO, UpdateBookDTO } from "../dtos/BookDTO";

export default class BookController {
    async get(req: Request, res: Response) {
        const builder = AppDataSource.getRepository(Book)
            .createQueryBuilder()
            .orderBy("id", "DESC");
        const { records: books, paginationInfo } = await Paginator.paginate(
            builder,
            req,
            res,
        );
        return ResponseUtil.sendSuccessfulResponse<Book[]>(
            res,
            "Fetched Books Successfully",
            books,
            paginationInfo,
        );
    }

    async show(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const book = await AppDataSource.getRepository(Book).findOneByOrFail({
            id: Number(id),
        });

        return ResponseUtil.sendSuccessfulResponse<Book>(
            res,
            "Fetched Book Successfully",
            book,
        );
    }

    async create(req: Request, res: Response): Promise<Response> {
        const bookData = req.body;
        bookData.image = req.file?.filename
        bookData.authorId = parseInt(bookData.authorId);
        bookData.price = parseInt(bookData.price);
        const dto = new CreateBookDTO();
        Object.assign(dto, bookData);

        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(Book);
        const book = repo.create(bookData);

        await repo.save(book);

        return ResponseUtil.sendSuccessfulResponse<Book[]>(
            res,
            "Book created",
            book,
            null,
            201,
        );
    }

    async update(req: Request, res: Response): Promise<Response> {
        const id = req.params.id;
        const bookData = req.body;

        const dto = new UpdateBookDTO();
        Object.assign(dto, bookData);
        dto.id = parseInt(id);

        await validateOrReject(dto);

        const repo = AppDataSource.getRepository(Book);
        const book = await repo.findOneByOrFail({
            id: Number(id),
        });

        repo.merge(book, bookData);
        await repo.save(book);

        return ResponseUtil.sendSuccessfulResponse<Book>(
            res,
            "Book updated",
            book,
            null,
            201,
        );
    }

    async delete(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const repo = AppDataSource.getRepository(Book);
        const book = await repo.findOneByOrFail({
            id: Number(id),
        });
        await repo.remove(book);
        return ResponseUtil.sendSuccessfulResponse(res, "Successfully deleted book", null);
    }
}
