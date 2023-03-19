import mongoose from "mongoose";
interface Counter {
    id: string,
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
    paId: number,
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
            qtd: number;
            valorUnitario: number;
            valorTotal: number;
        }
    ]
}
const airpressCounterSchema = new mongoose.Schema<Counter>({
    id : {type: String},
    seq : {type: Number}
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
        paId: {type: Number},
        equipamentos: [
            {
                fabricante: { type: String, require: true },
                modelo: { type: String, require: true },
                caracteristicas: { type: String, require: true }
            }],
        itens: [
            {
                // descricao: { type: String, require: true },
                // qtd: { type: Number, require: true },
                // valorUnitario: { type: Number, requere: true },
                // valorTotal: { type: Number, require: true }
                item: {type: mongoose.Schema.Types.ObjectId, ref: "item"}
            }
        ]
    });

propostaAirpressSchema.pre('save', function(next){
    var doc = this;
    airpressCounter.findByIdAndUpdate({id : "entityId"}, {$inc: {seq: 1}}, function(error : Error, counter: Counter) {
        if(error){
            return next(error)
        } doc.paId = counter.seq;
        next();
    })
})
const propostaAirpress = mongoose.model("propostaAirpress", propostaAirpressSchema);

export default propostaAirpress;