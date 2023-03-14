import mongoose from "mongoose";

mongoose.connect("mongodb+srv://grupo7:grupo777@cluster0.czeowxy.mongodb.net/modelo-proposta-aircenter");
// "mongodb+srv://grupo7:grupo777@cluster0.czeowxy.mongodb.net/drpper-node"

let db = mongoose.connection;

export default db;