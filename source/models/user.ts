

import mongoose from "mongoose";

export interface User {
    nome: string,
    telefone1: string,
    telefone2: string,
    email: string,
    senha: string
}

const userSchema = new mongoose.Schema<User>({
    nome: {type: String},
    telefone1: {type: String},
    telefone2: {type: String},
    email: {type: String},
    senha: {type: String}

})
 

const user = mongoose.model("user", userSchema);

export default {user};