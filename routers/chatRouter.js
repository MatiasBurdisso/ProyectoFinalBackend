import { Router } from "express";
import { renderChat } from "../Controllers/chatRouteController.js";

const router = Router();

router.get("/", renderChat );

export default router;