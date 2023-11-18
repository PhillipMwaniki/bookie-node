import express from "express";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";
import { FileUploader } from "../http/middlewares/FileUploader";
import BookController from "../http/controllers/BookController";

const router = express.Router();

const bookController = new BookController();

router.get("/", ErrorHandler.catchErrors(bookController.get));
router.get("/:id", ErrorHandler.catchErrors(bookController.show));
router.post(
    "/",
    FileUploader.upload("image", "books", 2 * 1024 * 1024),
    ErrorHandler.catchErrors(bookController.create),
);
router.put(
    "/:id",
    FileUploader.upload("image", "books", 2 * 1024 * 1024),
    ErrorHandler.catchErrors(bookController.update),
);
router.delete("/:id", ErrorHandler.catchErrors(bookController.delete));

export default router;
