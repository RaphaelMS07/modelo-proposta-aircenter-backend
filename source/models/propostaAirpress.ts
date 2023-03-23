import mongoose from "mongoose";
interface Counter {
    seq: number
}



interface Proposta {
    id: string;
    cliente: string;
    cnpj: string;
    tel: string;
    endereco: string;
    ac: string;
    email: string;
    titulo: string;
    descricao: string;
    pagamento: string;
    prazo: string;
    total: string;
    propostaId: number,
    equipamentos: [
        {
            fabricante: string;
            modelo: string;
            caracteristicas: string;
        }
    ]
    itens: [
        {
            descricao: string;
            valorUnitario: number;
            valorTotal: number;
            qtd: number;

        }
    ]
}
const airpressCounterSchema = new mongoose.Schema<Counter>({
    seq: { type: Number }
})

var airpressCounter = mongoose.model('airpressCounter', airpressCounterSchema);

const propostaAirpressSchema = new mongoose.Schema<Proposta>({
    id: { type: String },
    cliente: { type: String, require: true },
    cnpj: { type: String, require: true },
    tel: { type: String, require: true },
    endereco: { type: String, require: true },
    ac: { type: String, require: true },
    email: { type: String, require: true },
    titulo: { type: String, require: true },
    descricao: { type: String },
    pagamento: { type: String, require: true },
    prazo: { type: String, require: true },
    total: { type: String, require: true },
    propostaId: { type: Number },
    equipamentos: [
        {
            fabricante: { type: String, require: true },
            modelo: { type: String, require: true },
            caracteristicas: { type: String, require: true }
        }
    ],
    itens: [
        {
            descricao: { type: String, require: true },
            valorUnitario: { type: Number, requere: true },
            valorTotal: { type: Number, require: true },
            qtd: { type: Number }
            // item: {type: mongoose.Schema.Types.ObjectId, ref: "item"},
        }
    ]
});

propostaAirpressSchema.pre<Proposta>('save', async function (next) {
    var doc = this;
    try {
        const counter = await airpressCounter.findByIdAndUpdate(
             "641c70e2622e8b36f4fa68bf",
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
const propostaAirpress = mongoose.model("propostaAirpress", propostaAirpressSchema);

export default {propostaAirpress, airpressCounter};