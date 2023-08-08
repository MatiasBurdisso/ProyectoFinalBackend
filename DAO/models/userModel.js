import mongoose from "mongoose";

const userCollection = "usuarios";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type:String,
        unique:true,
    },
    age: Number,
    password: String,
    rol: {
        type: String,
        default: 'Usuario'
    },

    cart:{
        type: String,
        default: ""
    }

});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;