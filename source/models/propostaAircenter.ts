import mongoose from "mongoose";
import { User } from "./user";
import dotenv from "dotenv";
dotenv.config()
interface Counter {
    seq: number
}
interface Proposta {
    id: string;
    user: User;
    cliente: string;
    cnpj: string;
    cpf: string;
    tel: string;
    endereco: string;
    ac: string;
    email: string;
    titulo: string;
    descricao: string;
    pagamento: string;
    prazo: string;
    total: string;
    desconto: number;
    propostaId: number,
    data: string,
    equipamentos: [
        {
            fabricante: string;
            modelo: string;
            caracteristicas: string;
        }
    ]
    produtos: [
        {
            descricao: string;
            valorUnitario: number;
            valorTotal: number;
            qtd: number;

        }
    ]
    servicos: [
        {
            descricao: string;
            valorUnitario: number;
            valorTotal: number;
            qtd: number;
        }
    ]
}

const aircenterCounterSchema = new mongoose.Schema<Counter>({
    seq: { type: Number }
})
var aircenterCounter = mongoose.model('aircenterCounter', aircenterCounterSchema);

const propostaAircenterSchema = new mongoose.Schema<Proposta>({
    id: { type: String },
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user", require: true},
    cliente: { type: String, require: true },
    cnpj: { type: String},
    cpf: { type: String},
    tel: { type: String, require: true },
    endereco: { type: String, require: true },
    ac: { type: String, require: true },
    email: { type: String, require: true },
    titulo: { type: String, require: true },
    descricao: { type: String },
    pagamento: { type: String, require: true },
    prazo: { type: String, require: true },
    total: { type: String, require: true },
    desconto: {type: Number},
    propostaId: { type: Number },
    data: {type: String, default : new Date().getTime().toString()},
    equipamentos: [
        { 
            fabricante: { type: String, require: true },
            modelo: { type: String, require: true },
            caracteristicas: { type: String, require: true }
        }
    ],
    produtos: [
        {
            descricao: { type: String, require: true },
            valorUnitario: { type: Number, requere: true },
            valorTotal: { type: Number, require: true },
            qtd: { type: Number }
            // item: {type: mongoose.Schema.Types.ObjectId, ref: "item"},
        }
    ],
    servicos: [
        {
            descricao: { type: String, require: true },
            valorUnitario: { type: Number, requere: true },
            valorTotal: { type: Number, require: true },
            qtd: { type: Number }
        }
    ]

});

propostaAircenterSchema.pre<Proposta>('save', async function (next) {
    var doc = this;
    try {
        const counter = await aircenterCounter.findByIdAndUpdate(
             process.env.IDCOUNTERCENTER,
            { $inc: { seq: 1 } },
            { new: true }
        ) 
        console.log(counter);
        if (counter) {
            doc.propostaId = counter.seq;
        }
        next();
    } catch (error: any) {
        next(error); 
    }

})
const propostaAircenter = mongoose.model("propostaAircenter", propostaAircenterSchema);

export default {propostaAircenter, aircenterCounter};

