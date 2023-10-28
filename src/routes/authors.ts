import express from 'express';
import AuthorController from '../controllers/AuthorController';

const router = express.Router();

const authorController = new AuthorController();

router.get("/", authorController.getAuthors);


export default router;
