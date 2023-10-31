import express from 'express';
import AuthorController from '../controllers/AuthorController';

const router = express.Router();

const authorController = new AuthorController();

router.get("/", authorController.getAuthors);
router.get("/:id", authorController.getAuthor);


export default router;
