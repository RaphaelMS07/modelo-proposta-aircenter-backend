import { Request, Response, NextFunction } from 'express';
import airpressModel from '../models/propostaAirpress';
import aircenterModel from '../models/propostaAircenter';
import nr13Model from '../models/nr13'
import user, { User } from '../models/user';
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

interface Nr {
    id: string;
    nrId: number;
    user: User;
    nome: string;
    cnpj: string;
    endereco: string;
    reservatorioCheck: boolean;
    redeCheck: boolean;
    caldeiraCheck: boolean;
    modelo: string;
    anoFabricacao: string;
    numSerie: string;
    codProjeto: string;
    anoEdicao: string;
    pressaoTeste: string;
    PressaoTrabalho: string;
    exameVisual: string;
    ultrassomCheck: boolean;
    espessuraChapa: string;
    hidrostaticoPTH: string;
    imgFileEquipamento: string;
    imgFileBombaTeste: string;
    resultadoTeste: boolean;
    numCertNanometro: string;
    numCertValvulaSeguimento: string;
    numCertPressostato: string;
    numCertValulaPiloto: string;

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

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from the req
    let id: string = req.params.id;
    // get the post
    let result: User | null = await user.findById(id)
    let usuario: User | null = result;
    return res.status(200).send(usuario);
};

const updateUser = async (req: Request, res: Response) => {
    console.log("controller")
    try {
        const id: string | number = req.params.id;
        const content: Proposta = req.body;

        const updatedUser: Proposta | null = await user.findByIdAndUpdate(
            id,
            content,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'Proposta not found' });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating proposta Airpress:', error);
        return res.status(500).json({ message: 'Internal server error' });
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

const addNr13 = async (req: Request, res: Response) => {
    
    const nr13Salvo = await new nr13Model.nr13(req.body).save();

    return res.status(201).json(
        `nr13-${nr13Salvo._id}`
    )
    
}

const getAllPropostaAirpress = async (req: Request, res: Response, next: NextFunction) => {
    let result: Array<Proposta> = await airpressModel.propostaAirpress.find().populate('user');
    let propostas: Array<Proposta> = result;
    return res.status(200).send(propostas)
};

const PAGE_SIZE = 25;
const getPaginatedPropostaAirpress = async (req: Request, res: Response) => {
    let page = req.params.id;

    const pageNumber = parseInt(page as string) || 1 //default 1
    const skipDocuments = (pageNumber - 1) * PAGE_SIZE;

    try {
        const propostas = await airpressModel.propostaAirpress
            .find()
            .sort({ propostaId: -1 })
            .skip(skipDocuments)
            .limit(PAGE_SIZE)
            .populate('user')
            .exec();

        const totalDocuments = await airpressModel.propostaAirpress.countDocuments();

        return res.status(200).send({ propostas, totalDocuments })
    } catch (error) {
        return res.status(500).send(error)
    }
}

const getPaginatedPropostaAircenter = async (req: Request, res: Response) => {
    let page = req.params.id;
    const pageNumber = parseInt(page as string) || 1 //default 1
    const skipDocuments = (pageNumber - 1) * PAGE_SIZE;

    try {
        const propostas = await aircenterModel.propostaAircenter
            .find()
            .sort({ propostaId: -1 })
            .skip(skipDocuments)
            .limit(PAGE_SIZE)
            .populate('user')
            .exec();

        const totalDocuments = await aircenterModel.propostaAircenter.countDocuments();

        return res.status(200).send({ propostas, totalDocuments })
    } catch (error) {
        return res.status(500).send(error)
    }
}

const getAllPropostaAircenter = async (req: Request, res: Response, next: NextFunction) => {
    let result: Array<Proposta> = await aircenterModel.propostaAircenter.find().populate('user');
    let propostas: Array<Proposta> = result;
    return res.status(200).send(propostas)
};

const getAllPropostaForResponseTest = async (req: Request, res: Response) => {
    let result: Array<Proposta> = await aircenterModel.propostaAircenter.find().populate('user');
    return res.status
}

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

const getNr13ById = async (req: Request, res: Response) => {
    let id: string = req.params.id;
    let result: Nr | null = await nr13Model.nr13.findById(id).populate("user");
    let nr13: Nr | null = result;
    return res.status(200).send(nr13)
}

// updating a post
const updatePropostaAirpress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const content: Proposta = req.body;

        const updatedProposta: Proposta | null = await airpressModel.propostaAirpress.findByIdAndUpdate(
            id,
            content,
            { new: true }
        );

        if (!updatedProposta) {
            return res.status(404).json({ message: 'Proposta not found' });
        }

        return res.status(200).json(updatedProposta);
    } catch (error) {
        console.error('Error updating proposta Airpress:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const updatePropostaAircenter = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id: string = req.params.id;
        const content: Proposta = req.body;

        const updatedProposta: Proposta | null = await aircenterModel.propostaAircenter.findByIdAndUpdate(
            id,
            content,
            { new: true } // Add this option to return the updated document
        );

        if (!updatedProposta) {
            return res.status(404).json({ message: 'Proposta not found' });
        }

        return res.status(200).json(updatedProposta);
    } catch (error) {
        console.error('Error updating proposta Aircenter:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


// deleting a post
const deletePropostaAirpress = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    let response: Proposta | null = await airpressModel.propostaAirpress.findByIdAndDelete(id)
    // return response
    return res.status(200).json({
        message: 'Proposta airpress deletada com sucesso'
    });
};
const deletePropostaAircenter = async (req: Request, res: Response, next: NextFunction) => {
    // get the post id from req.params
    let id: string = req.params.id;
    // delete the post
    let response: Proposta | null = await aircenterModel.propostaAircenter.findByIdAndDelete(id)
    // return response
    return res.status(200).json({
        message: 'Proposta aircenter deletada com sucesso'
    });
};

//usado apenas 1 vez
const saveCounter = async (req: Request, res: Response, next: NextFunction) => {
    // new aircenterModel.aircenterCounter(req.body).save();
    // new airpressModel.airpressCounter(req.body).save();
    new nr13Model.nr13Counter(req.body).save();
    return res.status(200).json({
        messege: "Contador salvo com sucesso!"
    })
}

export default {
    createUser,
    login,
    getUserById,
    updateUser,
    getAllPropostaAirpress,
    getPaginatedPropostaAirpress,
    getPaginatedPropostaAircenter,
    getAllPropostaAircenter,
    getAllPropostaForResponseTest,
    getPropostaAirPressById,
    getPropostaAirCenterById,
    getNr13ById,
    updatePropostaAirpress,
    updatePropostaAircenter,
    deletePropostaAirpress,
    deletePropostaAircenter,
    addPropostaAirpress,
    addPropostaAircenter,
    addNr13,
    saveCounter
};