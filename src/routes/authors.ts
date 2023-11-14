import express from "express";
import AuthorController from "../controllers/AuthorController";
import { ErrorHandler } from "../utils/ErrorHandler";
import { FileUploader } from "../middlewares/FileUploader";

const router = express.Router();

const authorController = new AuthorController();

router.get("/", ErrorHandler.handleErrors(authorController.getAuthors));
router.get("/:id", ErrorHandler.handleErrors(authorController.getAuthor));
router.post(
  "/",
  FileUploader.upload("image", "authors", 2 * 1024 * 1024),
  ErrorHandler.handleErrors(authorController.create),
);
router.put(
  "/:id",
  FileUploader.upload("image", "authors", 2 * 1024 * 1024),
  ErrorHandler.handleErrors(authorController.update),
);
router.delete("/:id", ErrorHandler.handleErrors(authorController.delete));

export default router;
