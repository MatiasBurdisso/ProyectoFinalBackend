import { Router } from "express";
import { getMessages, saveMessages } from "../Controllers/messageRouterController.js";
import { messageModel } from "../DAO/models/chatModel.js";

const router = Router();

router.get("/", getMessages);

router.get("/", saveMessages);
export default router;