import { Router } from "express";
import { postForgot, renderForgot } from "../Controllers/forgotRoutesController.js";


const router = Router();

router.get("/",renderForgot);

router.post("/", postForgot);

export default router;