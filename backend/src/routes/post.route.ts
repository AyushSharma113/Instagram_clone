import express, { type RequestHandler } from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.ts';
import upload from '../middlewares/multer.ts';
import { addNewPost } from '../controller/post.controller.ts';


const router = express.Router();


router.route('/addpost').post(isAuthenticated, upload.single('image'), addNewPost as RequestHandler)

export default router;
