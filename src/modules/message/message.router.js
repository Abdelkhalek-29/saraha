import { Router } from "express";
import { auth } from '../../middleware/authuntication.js';
import * as messageController from './controller/message.js'
const router=Router();

router.post("/",auth,messageController.sendMessage)

router.get('/',auth,messageController.userMessages)

export default router;