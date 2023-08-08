import { Router } from "express";
import userModel from "../DAO/models/userModel.js";
import { isValidPassword } from "../utils.js";

const router = Router();

const  admin = { 
    username: "adminCoder@coder.com",
    password: "adminCod3r123"
}

export const renderLogin = async (req, res) => {
    res.render("login");
}

export const postLogin = async (req, res) => {
    const {username, password}=req.body;

    try{
        const response = await userModel.findOne({
            email: username,
        });
        if (response) {
            if (isValidPassword(password, response.password)) {
                req.session.user = response;
                res.status(200).json({ message: "logged in", data: response });
            } else {
                res.status(401).json({
                message: "error",
                data: "Error de credenciales.",
                });
            }
            } else {
            res.status(404).json({
                message: "error",
                data: "Algo ha pasado, consulta al administrador",
            });
            }
    }catch (error){
        res.status(500).json({error:error.message})
    }
}


export default router;

//En los controladores los router de const y export estan de más, no?? 