import express from 'express';
import AuthorController from '../controllers/AuthorController';
import { ErrorHandler } from '../../utils/ErrorHandler';

const router = express.Router();

const authorController = new AuthorController();

router.get("/", ErrorHandler.handleErrors(authorController.getAuthors));
router.get("/:id", ErrorHandler.handleErrors(authorController.getAuthor));


export default router;
