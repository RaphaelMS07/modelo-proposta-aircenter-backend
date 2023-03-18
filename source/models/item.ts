import mongoose from "mongoose";

interface Item {
    id: string;
    descricao: string;
    caracteristica: string;
    observacao: string;
    valorUnitario: number;
    valorCusto: number;
    fabricante: string;
}

const itemSchema = new mongoose.Schema<Item>({
    id: {type: String},
    descricao: {type: String},
    caracteristica: {type: String},
    observacao: {type: String},
    valorUnitario: {type: Number},
    valorCusto: {type : Number},
    fabricante: {type : String}
})

const item = mongoose.model("item", itemSchema);

export default item;