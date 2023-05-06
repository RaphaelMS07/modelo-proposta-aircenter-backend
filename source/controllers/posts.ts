import { Request, Response, NextFunction } from 'express';
import airpressModel from '../models/propostaAirpress';
import aircenterModel from '../models/propostaAircenter';
import user from '../models/user';
import passport from 'passport';
import { getToken } from '../Security/auth';


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
    data: string;
    equipamentos: [
        {
            fabricante: string;
            modelo: string;
            caracteristicas: string;
        }
    ]
    servicos: [
        {
            descricao: string;
            qtd: number;
            valorUnitario: number;
            valorTotal: number;
        }
    ]
    produtos: [
        {
            descricao: string;
            qtd: number;
            valorUnitario: number;
            valorTotal: number;
        }
    ]
}

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    let noPasswordUser = {
        nome: req.body.nome,
        username: req.body.username,
        telefone1: req.body.telefone1,
        telefone2: req.body.telefone2,
        email: req.body.email,
        email2: req.body.email2,
        funcao: req.body.funcao
    }
    user.register(
        new user(noPasswordUser),
        req.body.password,
        (err: any, user: any) => {
            if (err) {
                res
                    .status(500)
                    .setHeader("Content-Type", "application/json")
                    .send({ message: `${err.message} - falha ao criar usuario` })
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.statusCode = 201;
                    res.setHeader("content-type", "application/json");
                    res.json({ success: true, status: "Registration Successful" });
                })
            }
        }
    )
}

const login = (req: Request, res: Response, next: NextFunction) => {

    passport.authenticate("local", { session: false }),
        (req: any, res: any) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
                success: true,
                token: getToken({
                    _id: req.body._id,
                    id: req.body.id,
                    username: req.body.username,
                    email: req.body.email,
                    nome: req.body.nome,
                    funcao: req.body.funcao,
                    telefone1: req.body.telefone1,
                    telefone2: req.body.telefone2
                }),
                status: "You are successfully logged in",
            });
        }


}


//Sobre propostas
const addPropostaAirpress = async (req: Request, res: Response, next: NextFunction) => {

    const propostaSalva = await new airpressModel.propostaAirpress(req.body).save();
    // return response
    return res.status(201).json(
        `airpress-${propostaSalva._id}`
    );
}

const addPropostaAircenter = async (req: Request, res: Response, next: NextFunction) => {

    const propostaSalva = await new aircenterModel.propostaAircenter(req.body).save();
    // return response
    return res.status(201).json(
        `aircenter-${propostaSalva._id}`
    );
} 

const getAllPropostaAirpress = async (req: Request, res: Response, next: NextFunction) => {
    let result: Array<Proposta> = await airpressModel.propostaAirpress.find();
    let propostas: Array<Proposta> = result;
    return res.status(200).send(propostas)
};

const getAllPropostaAircenter = async (req: Request, res: Response, next: NextFunction) => {
    let result: Array<Proposta> = await aircenterModel.propostaAircenter.find();
    let propostas: Array<Proposta> = result;
    return res.status(200).send(propostas)
};

// getting a single post
const getPropostaAirPressById = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req
    let id: string = req.params.id;
    // get the post
    let result: Proposta | null = await airpressModel.propostaAirpress.findById(id).populate("user");
    let proposta: Proposta | null = result;
    return res.status(200).send(proposta);
};

const getPropostaAirCenterById = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req
    let id: string = req.params.id;
    // get the post
    let result: Proposta | null = await aircenterModel.propostaAircenter.findById(id).populate("user");
    let proposta: Proposta | null = result;
    return res.status(200).send(proposta);
};

// updating a post
const updatePropostaAirpress = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let content: string = req.body ?? null;
    // update the post
    let response: Proposta | null = await airpressModel.propostaAirpress.findByIdAndUpdate(id, {
        ...(content && { content })
    });
    // return response
    return res.status(200).json({
        message: response
    });
};

const updatePropostaAircenter = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let content: string = req.body ?? null;
    // update the post
    let response: Proposta | null = await aircenterModel.propostaAircenter.findByIdAndUpdate(id, {
        ...(content && { content })
    });
    // return response
    return res.status(200).json({
        message: response
    });
};


// deleting a post
const deletePropostaAirpress = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    let response: Proposta | null = await airpressModel.propostaAirpress.findByIdAndDelete(id)
    // return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

const deletePropostaAircenter = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    let response: Proposta | null = await aircenterModel.propostaAircenter.findByIdAndDelete(id)
    // return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

//usado apenas 1 vez
const saveCounter = async (req: Request, res: Response, next: NextFunction) => {
    new airpressModel.airpressCounter(req.body).save();
    return res.status(200).json({
        messege: "Contador salvo com sucesso!"
    })
}

export default {
    createUser,
    login,
    getAllPropostaAirpress,
    getAllPropostaAircenter,
    getPropostaAirPressById,
    getPropostaAirCenterById,
    updatePropostaAirpress,
    updatePropostaAircenter,
    deletePropostaAirpress,
    deletePropostaAircenter,
    addPropostaAirpress,
    addPropostaAircenter,
    saveCounter 
};