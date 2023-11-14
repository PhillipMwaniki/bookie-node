import express from "express";
import AuthorController from "../http/controllers/AuthorController";
import { ErrorHandler } from "../http/middlewares/ErrorHandler";
import { FileUploader } from "../http/middlewares/FileUploader";

const router = express.Router();

const authorController = new AuthorController();

router.get("/", ErrorHandler.catchErrors(authorController.getAuthors));
router.get("/:id", ErrorHandler.catchErrors(authorController.getAuthor));
router.post(
  "/",
  FileUploader.upload("image", "authors", 2 * 1024 * 1024),
  ErrorHandler.catchErrors(authorController.create),
);
router.put(
  "/:id",
  FileUploader.upload("image", "authors", 2 * 1024 * 1024),
  ErrorHandler.catchErrors(authorController.update),
);
router.delete("/:id", ErrorHandler.catchErrors(authorController.delete));

export default router;
