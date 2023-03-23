import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import propostaAirpress from '../models/propostaAirpress';


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


const getAllPropostaAirpress = async (req: Request, res: Response, next: NextFunction) => {
    let result: Array<Proposta> = await propostaAirpress.find();

    let propostas: Array<Proposta> = result;
    return res.status(200).json({
        message: propostas
    });
};

// getting a single post
const getPropostaAirPressById = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req
    let id: string = req.params.id;
    // get the post
    let result: Proposta | null = await propostaAirpress.findById(id);
    let proposta: Proposta | null = result;
    return res.status(200).json({
        message: proposta
    });
};

// updating a post
const updatePropostaAirpress = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let content: string = req.body ?? null;

    // update the post
    let response: Proposta | null = await propostaAirpress.findByIdAndUpdate(id, {
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
    let response: Proposta | null = await propostaAirpress.findByIdAndDelete(id)
    // return response
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};

// adding a post
const addPropostaAirpress = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    // let title: string = req.body.title;    
    // add the post
    new propostaAirpress(req.body).save();
    // return response
    return res.status(200).json({
        message: "Salvo com sucesso"
    });
}

export default { getAllPropostaAirpress, getPropostaAirPressById, updatePropostaAirpress, deletePropostaAirpress, addPropostaAirpress };