import express from 'express';
import { register, login, logout, getProfile, editProfile } from '../controller/user.controller.ts';
import isAuthenticated from '../middlewares/isAuthenticated.ts'
import upload from '../middlewares/multer.ts';


const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/:id/profile').get(isAuthenticated, getProfile);
router.route('/profile/edit').post(isAuthenticated, upload.single('profilePhoto'), editProfile);


export default router
