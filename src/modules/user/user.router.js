import { auth } from '../../middleware/authuntication.js';
import { fileUpload, fileValidation } from '../../utils/multer.cloud.js';
import * as userController from './controller/user.js'
import { Router } from "express";
const router=Router()

router.get('/', auth , userController.getUsers)


router.patch('/profile/image' ,auth,
fileUpload(fileValidation.image).single("image"),

userController.profileImage
)

router.patch('/profile/cover/image' ,
auth,
fileUpload(fileValidation.image).array("image" , 5 ),
userController.profileImage
)

export default router