import express from "express";
import { AuthMiddleware } from "../http/middlewares/AuthMiddleware";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";
import { FileUploader } from "../http/middlewares/FileUploader";
import BookController from "../http/controllers/BookController";

const router = express.Router();

const bookController = new BookController();

router.get("/", ErrorHandler.catchErrors(bookController.get));
router.get("/:id", ErrorHandler.catchErrors(bookController.show));
router.post(
    "/",
    ErrorHandler.catchErrors(AuthMiddleware.authenticate),
    FileUploader.upload("image", "books", 2 * 1024 * 1024),
    ErrorHandler.catchErrors(bookController.create),
);
router.put(
    "/:id",
    ErrorHandler.catchErrors(AuthMiddleware.authenticate),
    FileUploader.upload("image", "books", 2 * 1024 * 1024),
    ErrorHandler.catchErrors(bookController.update),
);
router.delete("/:id",
    ErrorHandler.catchErrors(AuthMiddleware.authenticate),
    ErrorHandler.catchErrors(bookController.delete)
);

export default router;
