import { Router } from "express";
import userDB from "../DAO/models/userModel.js";
import passport from "passport";
import userModel from "../DAO/models/userModel.js";

const sessionsRouter = Router();
const user = new userDB();

export const userSignup = passport.authenticate('signup', {failureRedirect:'/failregister'}) //comma here?
 async (req, res)=>{
    const {first_name, last_name, email, password, age}=req.body;
    try{
    const newUser = new userModel({
        first_name,
        last_name,
        email,
        password: createHash(password),
        age,
        rol,
        cart
    })
    await newUser.save() 
    res.status(201).json({message:"Usuario creado", data:newUser})
}catch (error) {
res.status(500).json({error:error.message})
}
};


export const failRegister = async (req, res)=>{ 
    console.log('Ha habido un error. Por favor intente nuevamente')
    res.send({error:'Falla al Registrarse'})
};

export const loginUser = passport.authenticate('login', {failureRedirect: 'faillogin'}) //comma here?
 async (req, res)=>{ //async??


    // Si no se encuentra al  usuario...
    if(user.length === 0){
    return res.redirect("/signup");
}

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    res.redirect('/current');

     // Se borra la password.
    delete user.password;
    req.session.user = user[0];

    res.redirect('/current');
};

export const renderUser =  async (req,res)=>{
    if (await req.session?.user){
        const userData = await userModel.findOne({
            email: req.session.user.email
        });
        res.render("user")

    }
        
};

export const githubLogin = (passport.authenticate('github', {scope:['user:email']}), (req, res)=>{}) //between ( ) ??

export const githubCall = (passport.authenticate('github', {failureRedirect:'/login'}), (req, res)=>{
    req.session.user = req.user;

    res.redirect('/products');
});

export const logout = (req, res)=>{
    req.session.destroy(err=>{
        if(err) res.send({status:'error', message:'Error al cerrar la sesión: '+err});

        res.redirect('/login');
    });
};