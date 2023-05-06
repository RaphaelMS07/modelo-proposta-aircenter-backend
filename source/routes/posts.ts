import express from 'express';
import controller from '../controllers/posts';
import passport from 'passport';
import { getToken } from '../Security/auth';
const router = express.Router();

router
    .post('/save-user', controller.createUser)
    .post('/login', passport.authenticate("local", { session: false }),
        (req: any, res: any) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({
                success: true,
                token: getToken({
                    _id: req.user._id,
                    username: req.user.username,
                    nome: req.user.nome,
                    telefone1: req.user.telefone1,
                    email: req.user.email,
                    funcao: req.user.funcao,

                }),
                status: "You are successfully logged in",
            });
        })
    .get('/propostas-airpress',
        passport.authenticate("jwt", { session: false }),
        controller.getAllPropostaAirpress)
    .get('/propostas-airpress/:id', controller.getPropostaAirPressById)
    .get('/propostas-aircenter/:id', controller.getPropostaAirCenterById)
    .put('/propostas-airpress-update/:id', controller.updatePropostaAirpress)
    .put('/propostas-aircenter-update/:id', controller.updatePropostaAircenter)
    .delete('/propostas-airpress-delete/:id', controller.deletePropostaAirpress)
    .delete('/propostas-aircenter-delete/:id', controller.deletePropostaAircenter)
    .post('/propostas-airpress-save', controller.addPropostaAirpress)
    .post('/propostas-aircenter-save', controller.addPropostaAircenter)
    // .post('/save-counter', controller.saveCounter)

export = router; 