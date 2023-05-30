import mongoose, { ConnectOptions } from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

mongoose.connect(process.env.CONNECTION as string);


let db = mongoose.connection;

export default db;