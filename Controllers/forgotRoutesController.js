
import userModel from "../DAO/models/userModel.js";
import { isValidPassword, createHash } from "../utils.js";

export const renderForgot =  (req, res) => {
    res.render("forgot");
}

export const postForgot = async (req, res) => {
    const { username, password, repeatPassword } = req.body;
    let newPassword = createHash(password);

    if (!username || !password) {
    res.status(400).json({
        message: "error",
        data: "Faltan campos",
    });
    return;
    }
    if (!isValidPassword(repeatPassword, newPassword)) {
    res.status(400).json({
        message: "error",
        data: "Las contraseñas no coinciden",
    });
    return;
    }

    try {
    const response = await userModel.findOne({
        email: username,
    });

    if (!response) {
        res.status(404).json({
        message: "error",
        data: "El usuario no existe",
        });
        return;
    } else {
        const respuesta = await userModel.findOneAndUpdate(
        { email: username },
        { password: repeatPassword }
        );
        if (respuesta) {
        res.status(200).json({
            message: "logged in",
            data: "Contraseña actualizada",
        });
        return;
        }
    }
    } catch (error) {
    res.status(500).json({ error: error.message });
    return;
    }
}