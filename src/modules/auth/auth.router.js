import { validation } from '../../middleware/validation.js';
import * as authController from './controller/auth.js'
import { Router } from "express";
import validators  from 'mongoose';
const router=Router();


router.post("/signup" ,validation(validators.signup) ,authController.signup)
router.get("/confirmEmail/:token", authController.confirmEmail)
router.get("/newConfirmEmail/:token", authController.newConfirmEmail)
router.post("/login",validation(validators.login),authController.login)
export default router