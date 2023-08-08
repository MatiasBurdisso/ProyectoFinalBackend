import { Router } from "express";
import userDB from "../DAO/models/userModel.js";
import { renderSignup, signupUserRoute } from "../Controllers/singupRouteController.js";


const sessionsRouter = Router();
const user = new userDB();

sessionsRouter.get("/",renderSignup);

sessionsRouter.post('/signup', signupUserRoute);

export default sessionsRouter;