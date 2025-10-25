import express, { type RequestHandler } from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.ts';
import upload from '../middlewares/multer.ts';
import { addComment, addNewPost, bookmarkPost, deletePost, dislikePost, getAllPost, getCommentsOfPost, getUserPost, likePost } from '../controller/post.controller.ts';


const router = express.Router();


router.route('/addpost').post(isAuthenticated, upload.single('image'), addNewPost as RequestHandler)
router.route('/all').get(isAuthenticated, getAllPost as RequestHandler);
router.route("/userpost/all").get(isAuthenticated, getUserPost as RequestHandler);
router.route("/:id/like").get(isAuthenticated, likePost as RequestHandler);
router.route("/:id/dislike").get(isAuthenticated, dislikePost as RequestHandler);
router.route("/:id/comment").post(isAuthenticated, addComment as RequestHandler); 
router.route("/:id/comment/all").post(isAuthenticated, getCommentsOfPost as RequestHandler);
router.route("/delete/:id").delete(isAuthenticated, deletePost as RequestHandler);
router.route("/:id/bookmark").get(isAuthenticated, bookmarkPost as RequestHandler);



export default router;
