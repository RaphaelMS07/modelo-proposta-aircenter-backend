import mongoose from "mongoose";
import { User } from "./user";
import dotenv from "dotenv";

dotenv.config()

interface Counter {
    seq: number
}

interface nr {
    id: string;
    nrId: number;
    user: User;
    empresa: string;
    cnpj: string;
    endereco: string;
    tipo: string;
    modelo: string;
    anoFabricacao: string;
    numSerie: string;
    codProjeto: string;
    anoEdicao: string;
    pressaoTeste: string;
    PressaoTrabalho: string;
    exameVisual: boolean;
    ultrassom: boolean;
    espessuraChapa: string;
    hidrostaticoPTH: string;
    fotoEquipamento: string;
    fotoBombaEmTeste: string;
    resultadoTeste: boolean;
    numCertNanometro: string;
    numCertValvulaSeguimento: string;
    numCertPressostato: string;
    numCertValulaPiloto: string;
}

const nr13CounterSchema = new mongoose.Schema<Counter>({
    seq: { type: Number }
})

var nr13Counter = mongoose.model('nr13Counter', nr13CounterSchema)

const nr13Schema = new mongoose.Schema<nr>({
    id: { type: String },
    nrId: {type: Number},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: false },
    empresa: { type: String },
    cnpj: { type: String },
    endereco: { type: String },
    tipo: { type: String },
    modelo: { type: String },
    anoFabricacao: { type: String },
    numSerie: { type: String },
    codProjeto: { type: String },
    anoEdicao: { type: String },
    pressaoTeste: { type: String },
    PressaoTrabalho: { type: String },
    exameVisual: { type: Boolean },
    ultrassom: { type: Boolean },
    espessuraChapa: { type: String },
    hidrostaticoPTH: { type: String },
    fotoEquipamento: { type: String },
    fotoBombaEmTeste: { type: String },
    resultadoTeste: { type: Boolean },
    numCertNanometro: { type: String },
    numCertValvulaSeguimento: { type: String },
    numCertPressostato: { type: String },
    numCertValulaPiloto: { type: String },
})

nr13Schema.pre<nr>('save', async function (next) {
    var doc = this;
    try {
        const counter = await nr13Counter.findByIdAndUpdate(
            process.env.IDCOUNTERNR13,
            {$inc: {seq: 1}},
            {new: true}
        )
        console.log(counter);
        if(counter) {
            doc.nrId = counter.seq;
        }
        next();
    } catch (error: any) {
        next(error);
    }
})

const nr13 = mongoose.model("nr13", nr13Schema)

export default{nr13, nr13Counter}