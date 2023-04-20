import mongoose from "mongoose";
import passportLocalMongoose  from "passport-local-mongoose"
export interface User {
    id: string,
    nome: string,
    telefone1: string,
    telefone2: string,
    username: string,
    password: string
}

const userSchema = new mongoose.Schema<User>({
    id: { type: String },
    nome: {type: String},
    telefone1: {type: String},
    telefone2: {type: String},
    username: {type: String},
    password: {type: String}
})
 
userSchema.plugin(passportLocalMongoose)
const user = mongoose.model("user", userSchema);

export default user;