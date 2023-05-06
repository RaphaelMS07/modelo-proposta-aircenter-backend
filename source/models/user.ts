import mongoose from "mongoose";
import passportLocalMongoose  from "passport-local-mongoose"
export interface User {
    id: string,
    nome: string,
    funcao: string,
    username: string,
    email: string,
    email2: string,
    telefone1: string,
    telefone2: string,
    password: string
}

const userSchema = new mongoose.Schema<User>({
    id: { type: String },
    nome: {type: String},
    funcao: {type: String},
    username: {type: String},
    email: {type: String},
    email2: {type: String},
    telefone1: {type: String},
    telefone2: {type: String},
    password: {type: String}
})
 
userSchema.plugin(passportLocalMongoose)
const user = mongoose.model("user", userSchema);

export default user;